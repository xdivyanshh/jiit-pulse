import pandas as pd
import re
import json
import os

# --- LOAD CONFIGURATION ---
try:
    with open('schedule_config.json', 'r') as f:
        config = json.load(f)
        
    BATCHES_TO_EXTRACT = config['batches_to_extract']
    TIME_SLOTS = {int(k): v for k, v in config['time_slots'].items()}
    SUBJECT_MAP = config['subject_map']
    FACULTY_MAP = config['faculty_map']
    
    print("✅ Loaded configuration from schedule_config.json")
except FileNotFoundError:
    print("❌ Error: schedule_config.json not found!")
    exit()

DAYS_MAP = {
    "MON": "Monday", "TUE": "Tuesday", "WED": "Wednesday",
    "THU": "Thursday", "FRI": "Friday", "SAT": "Saturday"
}

def find_schedule_file():
    files = os.listdir('.')
    for f in files:
        if ("B Tech" in f or "Sem" in f) and f.endswith(('.xlsx', '.xls')): return f
    for f in files:
        if f.endswith(('.xlsx', '.xls')): return f
    for f in files:
        if f.endswith('.csv'): return f
    return None

def apply_manual_overrides(all_batches_data):
    """
    Applies logic fixes: 2-hour labs, dynamic lunch, and specific batch moves.
    """
    
    # --- 1. GLOBAL FIX: MERGE LABS INTO 1h 50m BLOCKS ---
    for batch_code, schedule in all_batches_data.items():
        for day, classes in schedule.items():
            classes.sort(key=lambda x: x['time'])
            merged_classes = []
            skip_next = False
            
            for i in range(len(classes)):
                if skip_next:
                    skip_next = False
                    continue
                
                cls = classes[i]
                if cls['type'] == 'Lab':
                    start = cls['time'].split(' - ')[0] 
                    new_time = None
                    
                    if start == "09:00 AM": new_time = "09:00 AM - 10:50 AM"
                    elif start == "11:00 AM": new_time = "11:00 AM - 12:50 PM"
                    elif start == "01:00 PM": new_time = "01:00 PM - 02:50 PM"
                    elif start == "03:00 PM": new_time = "03:00 PM - 04:50 PM"
                    
                    if new_time:
                        cls['time'] = new_time
                        if i + 1 < len(classes):
                            next_cls = classes[i+1]
                            if next_cls['type'] == 'Lab' and next_cls['subject'] == cls['subject']:
                                skip_next = True
                
                merged_classes.append(cls)
            schedule[day] = merged_classes

    # --- 2. BATCH SPECIFIC OVERRIDES ---
    
    # [FIX] B11: Remove Alka Singhal classes on Friday (False Positive)
    if 'B11' in all_batches_data and 'Friday' in all_batches_data['B11']:
        all_batches_data['B11']['Friday'] = [
            cls for cls in all_batches_data['B11']['Friday'] 
            if "ALKA" not in cls['professor'].upper()
        ]

    # [FIX] B11: Remove Unknown classes on Saturday
    if 'B11' in all_batches_data and 'Saturday' in all_batches_data['B11']:
        all_batches_data['B11']['Saturday'] = [
            cls for cls in all_batches_data['B11']['Saturday'] 
            if cls['subject'] != "Unknown"
        ]

    # B2: Move Saturday classes
    if 'B2' in all_batches_data:
        schedule = all_batches_data['B2']
        if 'Saturday' in schedule and len(schedule['Saturday']) > 0:
            items_to_move = list(schedule['Saturday'])
            schedule['Saturday'] = [] 
            
            for cls in items_to_move:
                subj = cls.get('subject', '')
                fName = cls.get('fullName', '')
                
                # Workshop -> Wed 9-10 TS-12
                if "Workshop" in subj or "Workshop" in fName:
                    cls.update({'time': "09:00 AM - 09:50 AM", 'location': "TS-12", 'type': "Tutorial"})
                    if 'Wednesday' not in schedule: schedule['Wednesday'] = []
                    schedule['Wednesday'].append(cls)
                
                # UHV -> Thu 3-4 TR302
                elif "UHV" in subj or "Universal" in fName:
                    cls.update({'time': "03:00 PM - 03:50 PM", 'location': "TR302", 'type': "Tutorial"})
                    if 'Thursday' not in schedule: schedule['Thursday'] = []
                    schedule['Thursday'].append(cls)

    # --- 3. DYNAMIC LUNCH LOGIC ---
    for batch_code, schedule in all_batches_data.items():
        for day, classes in schedule.items():
            if len(classes) == 0: continue
            classes.sort(key=lambda x: x['time'])
            
            busy_at_12 = any("12:00 PM" in c['time'].split(' - ')[0] or ("11:00 AM" in c['time'] and "12:" in c['time'].split(' - ')[1]) for c in classes)
            busy_at_1 = any("01:00 PM" in c['time'].split(' - ')[0] for c in classes)

            lunch = {
                "id": f"l{day[:2]}", "subject": "Lunch Break", "fullName": "Lunch Break",
                "type": "Break", "professor": "", "location": "Cafeteria/Mess" # Fixed location
            }

            if not busy_at_12:
                lunch["time"] = "12:00 PM - 01:00 PM"
                classes.append(lunch)
            elif not busy_at_1:
                lunch["time"] = "01:00 PM - 02:00 PM"
                classes.append(lunch)
            
            classes.sort(key=lambda x: x['time'])

    return all_batches_data

def parse_all():
    print(f"🔍 Looking for schedule file...")
    file_name = find_schedule_file()
    if not file_name:
        print("❌ Error: No Excel or CSV file found.")
        return
    print(f"📂 Found file: {file_name}")
    
    df = None
    try:
        if file_name.endswith(('.xlsx', '.xls')):
            df = pd.read_excel(file_name, header=None)
        else:
            for enc in ['utf-8', 'cp1252', 'latin1']:
                try: df = pd.read_csv(file_name, header=None, encoding=enc, engine='python'); break
                except: continue
        if df is None: raise Exception("Could not read file content.")
    except Exception as e:
        print(f"❌ Error reading file: {e}")
        return

    all_batches_data = {}

    for batch_code in BATCHES_TO_EXTRACT:
        print(f"   Processing {batch_code}...", end="\r")
        schedule = {day: [] for day in DAYS_MAP.values()}
        current_day = None
        # Use simple regex: find batch code not surrounded by digits
        batch_regex = re.compile(rf"(?<!\d){batch_code}(?!\d)")

        for idx, row in df.iterrows():
            if idx < 2: continue 
            day_val = str(row[0]).strip().upper()
            if day_val in DAYS_MAP: current_day = DAYS_MAP[day_val]
            if not current_day: continue

            for col_idx in range(1, 9):
                if col_idx >= len(row): continue
                cell = str(row[col_idx]).strip()
                if cell == "nan" or not cell or "LUNCH" in cell.upper() or cell.lower() == "nan": continue

                if batch_regex.search(cell):
                    subj_match = re.search(r"\((.*?)\)", cell)
                    subject_code = subj_match.group(1).strip() if subj_match else "Unknown"
                    
                    full_name = subject_code
                    subject_short = subject_code
                    
                    # FILTER OUT UNKNOWN SUBJECTS
                    if subject_code == "Unknown":
                        continue

                    for code, name in SUBJECT_MAP.items():
                        if code in subject_code:
                            full_name = name
                            # Shorten names
                            if "Mathematics" in name: subject_short = "Mathematics-2"
                            elif "Physics" in name: subject_short = "Physics-2"
                            elif "Software" in name: subject_short = "SDF-2"
                            elif "Universal" in name: subject_short = "UHV"
                            elif "Workshop" in name: subject_short = "Workshop"
                            elif "Computers Programming" in name: subject_short = "CPL"
                            elif "Fundamentals of Computers" in name: subject_short = "FCP"
                            elif "Basic Electronics" in name: subject_short = "Electronics"
                            elif "Biophysical" in name: subject_short = "Biophysical"
                            break

                    class_type = "Lecture"
                    if cell.startswith("T"): class_type = "Tutorial"
                    if "Lab" in full_name or "Workshop" in full_name: class_type = "Lab"

                    rest = cell.split(')')[-1].lstrip('-').strip()
                    location = rest.split('/', 1)[0].strip() if '/' in rest else rest
                    professor = "Faculty"
                    if '/' in rest:
                        prof_abbr = rest.split('/', 1)[1].strip()
                        if '/' in prof_abbr:
                            professor = " & ".join([FACULTY_MAP.get(p.strip(), p.strip()) for p in prof_abbr.split('/')])
                        else:
                            professor = FACULTY_MAP.get(prof_abbr, prof_abbr)

                    if "LL" in location.upper():
                        subject_short = "LSPC Lab"
                        full_name = "Life Skills & Professional Communication Lab"
                        class_type = "Lab"
                    if "PL" in location.upper():
                        subject_short = "Physics Lab"
                        full_name = "Physics Lab"
                        class_type = "Lab"

                    entry = {
                        "id": f"{batch_code.lower()}{current_day[:2].lower()}{col_idx}",
                        "time": TIME_SLOTS[col_idx],
                        "subject": subject_short,
                        "fullName": full_name,
                        "type": class_type,
                        "professor": professor,
                        "location": location
                    }
                    if not any(x['time'] == entry['time'] for x in schedule[current_day]):
                        schedule[current_day].append(entry)
        all_batches_data[batch_code] = schedule

    all_batches_data = apply_manual_overrides(all_batches_data)

    # 1. SAVE SCHEDULE
    output_path = os.path.join('src', 'data', 'schedule.js')
    if not os.path.exists(os.path.dirname(output_path)): output_path = 'schedule.js'
    print(f"\n💾 Saving schedule to: {output_path}")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write("export const scheduleData = " + json.dumps(all_batches_data, indent=2) + ";")

    # 2. SAVE FACULTY LIST
    faculty_path = os.path.join('src', 'data', 'faculty.js')
    if not os.path.exists(os.path.dirname(faculty_path)): faculty_path = 'faculty.js'
    print(f"💾 Saving faculty list to: {faculty_path}")
    
    sorted_faculty = dict(sorted(FACULTY_MAP.items(), key=lambda item: item[1]))
    with open(faculty_path, "w", encoding="utf-8") as f:
        f.write("export const facultyData = " + json.dumps(sorted_faculty, indent=2) + ";")

    print("✅ Done! Data updated for Schedule AND Faculty.")

if __name__ == "__main__":
    parse_all()