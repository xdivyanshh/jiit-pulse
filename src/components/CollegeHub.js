import React, { useState, useEffect, useRef } from 'react';
import { MapPin, User, Coffee, ChevronDown, Moon, CloudSun, Sun, X } from 'lucide-react';

// --- REMOVED STATIC IMPORTS ---
// import { scheduleData as allBatches62 } from '../data/schedule'; 
// We keep Mess Menu static for now as we are only fetching Schedule from DB
import { messMenu as messMenu62 } from '../data/mess';
import { messMenu as messMenu128 } from '../data/mess128';
import { allFacultyData } from '../data/faculty';

// Component Imports
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import FacultyDirectory from './FacultyDirectory';
import MessMenu from './MessMenu';
import ClubsHubs from './ClubsHubs';
import AcademicCalendar from './AcademicCalendar';
import Placements from './Placements';
import AttendanceContainer from './AttendanceContainer';
import Login from './Login';
import { Toaster } from './sonner';

// Import JIITWebkiosk
import { WebPortal } from 'jsjiit';

// NEW: Import the database helper
// import { fetchDatabase } from '../lib/db';
import classesData from '../data/classes.json';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function CollegeHub({ campus, onBack }) {
  // --- NEW STATE FOR DATABASE ---
  const [fullDb, setFullDb] = useState(classesData); // Stores the raw data from GitHub
  const [isLoading, setIsLoading] = useState(false);

  const [currentDay, setCurrentDay] = useState("Monday");
  const [currentTime, setCurrentTime] = useState(null);
  const [activeTab, setActiveTab] = useState("schedule");
  const [mounted, setMounted] = useState(false);

  // --- WEBKIOSK CLIENT ---
  const [w] = useState(new WebPortal());
  const [isWebkioskLoggedIn, setIsWebkioskLoggedIn] = useState(false);
  const [attendanceData, setAttendanceData] = useState(null);
  
  // --- FETCH DATA FROM GITHUB ---

  // --- FILTER DATA BASED ON CAMPUS ---
  // This replaces the old "allBatches62" vs "dynamicBatches" logic
  const allBatches = React.useMemo(() => {
    if (!fullDb) return {};

    // Support both { classes: {...} } and direct {...} structure
    const rawClasses = fullDb.classes || fullDb;

    // 1. Identify which courses belong to this campus
    // '62' gets B.Tech 62 and BCA 62. '128' gets B.Tech 128.
    const targetCourses = campus === '62' 
      ? ['btech-62', 'bca-62'] 
      : ['btech-128'];

    // 2. Filter the huge class list to only show batches for this campus
    const filtered = {};
    Object.keys(rawClasses).forEach(key => {
      // Skip special keys like 'electives'
      if (key === 'electives') return;

      // Check if the key starts with any of the target courses (e.g. "btech-128_...")
      const belongsToCampus = targetCourses.some(course => key.startsWith(course));
      
      if (belongsToCampus) {
        filtered[key] = rawClasses[key];
      }
    });

    return filtered;
  }, [fullDb, campus]);

  const messMenuData = campus === '62' ? messMenu62 : messMenu128;
  const facultyDataForCampus = allFacultyData[campus] || {};

  // Helper: Sort batches (Moved up to be accessible by effects)
  const sortBatches = (a, b) => {
    // Extract the last part of the key (e.g. "e1" from "btech-128_sem2_phase1_e1")
    const getId = (str) => str.split('_').pop();
    const idA = getId(a);
    const idB = getId(b);
    
    const splitA = idA.match(/([a-zA-Z]+)(\d+)/);
    const splitB = idB.match(/([a-zA-Z]+)(\d+)/);
    
    if (splitA && splitB) {
      if (splitA[1].toLowerCase() !== splitB[1].toLowerCase()) return splitA[1].localeCompare(splitB[1]);
      return parseInt(splitA[2]) - parseInt(splitB[2]);
    }
    return idA.localeCompare(idB);
  };

  // --- COURSE & SEMESTER LOGIC ---
  const structure = React.useMemo(() => {
    const struct = {};
    Object.keys(allBatches).forEach(key => {
      const parts = key.split('_');
      if (parts.length >= 2) {
        const courseCode = parts[0].split('-')[0].toUpperCase();
        const courseLabel = courseCode === 'BTECH' ? 'B.Tech' : courseCode;
        const semLabel = parts[1].replace('sem', 'Sem ');

        if (!struct[courseLabel]) {
          struct[courseLabel] = new Set();
        }
        struct[courseLabel].add(semLabel);
      }
    });
    
    const sortedStruct = {};
    Object.keys(struct).sort().forEach(course => {
      sortedStruct[course] = Array.from(struct[course]).sort();
    });
    return sortedStruct;
  }, [allBatches]);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");

  // --- PERSISTENCE: LOAD PREFERENCES ---
  useEffect(() => {
    try {
      const savedCourse = localStorage.getItem(`jiit_${campus}_course`);
      const savedSemester = localStorage.getItem(`jiit_${campus}_semester`);
      const savedBatch = localStorage.getItem(`jiit_${campus}_batch`);

      if (savedCourse) setSelectedCourse(savedCourse);
      if (savedSemester) setSelectedSemester(savedSemester);
      if (savedBatch) setSelectedBatch(savedBatch);
    } catch (error) {
      console.error("Error loading preferences:", error);
    }
  }, [campus]);

  // --- PERSISTENCE: SAVE PREFERENCES ---
  useEffect(() => {
    if (selectedCourse) localStorage.setItem(`jiit_${campus}_course`, selectedCourse);
  }, [selectedCourse, campus]);

  useEffect(() => {
    if (selectedSemester) localStorage.setItem(`jiit_${campus}_semester`, selectedSemester);
  }, [selectedSemester, campus]);

  useEffect(() => {
    if (selectedBatch) localStorage.setItem(`jiit_${campus}_batch`, selectedBatch);
  }, [selectedBatch, campus]);

  // Auto-select Course
  useEffect(() => {
    const courses = Object.keys(structure);
    if (courses.length > 0 && !courses.includes(selectedCourse)) {
      setSelectedCourse(courses[0]);
    }
  }, [structure]);

  // Auto-select Semester
  useEffect(() => {
    if (selectedCourse && structure[selectedCourse]) {
      const sems = structure[selectedCourse];
      if (!sems.includes(selectedSemester)) {
        setSelectedSemester(sems[0]);
      }
    }
  }, [selectedCourse, structure, selectedSemester]);

  const filteredBatches = React.useMemo(() => {
    if (!selectedCourse || !selectedSemester) return [];
    
    return Object.keys(allBatches).filter(key => {
      const parts = key.split('_');
      if (parts.length < 2) return false;
      
      const courseCode = parts[0].split('-')[0].toUpperCase();
      const courseLabel = courseCode === 'BTECH' ? 'B.Tech' : courseCode;
      const semLabel = parts[1].replace('sem', 'Sem ');

      return courseLabel === selectedCourse && semLabel === selectedSemester;
    });
  }, [allBatches, selectedCourse, selectedSemester]);

  // Auto-select first batch when filtered list changes
  useEffect(() => {
    if (filteredBatches.length > 0) {
      if (!filteredBatches.includes(selectedBatch)) {
        const sorted = [...filteredBatches].sort(sortBatches);
        setSelectedBatch(sorted[0]);
      }
    }
  }, [filteredBatches]);

  const currentBatchSchedule = React.useMemo(() => 
    allBatches ? (allBatches[selectedBatch] || {}) : {}
  , [allBatches, selectedBatch]);

  // FIX: Handle the nested 'classes' property in your JSON structure
  const actualSchedule = React.useMemo(() => 
    currentBatchSchedule.classes || currentBatchSchedule
  , [currentBatchSchedule]);

  const rawDayClasses = actualSchedule[currentDay] || [];

  // Normalize classes to ensure 'time' property exists (compatibility with new JSON format)
  const currentDayClasses = React.useMemo(() => {
    // Helper to parse time string "10:00 AM" to minutes
    const parseTime = (tStr) => {
        if (!tStr) return 0;
        const [time, modifier] = tStr.split(' ');
        if (!time) return 0;
        let [h, m] = time.split(':').map(Number);
        if (h === 12) h = 0;
        if (modifier === 'PM') h += 12;
        return h * 60 + m;
    };

    let classes = rawDayClasses.map((cls, idx) => ({
      ...cls,
      id: cls.id || `cls-${idx}`,
      time: cls.time || (cls.start && cls.end ? `${cls.start} - ${cls.end}` : "00:00 AM - 00:00 AM"),
      location: cls.venue || cls.location || "TBA",
      professor: cls.teacher || cls.professor
    }));

    // FIX: Remove "Minor Elective" or generic "Electives" from 1-2 PM slot
    // User reported these are incorrect placeholders overlapping with Lunch.
    classes = classes.filter(cls => {
        const [s, e] = cls.time.split(" - ");
        const start = parseTime(s);
        const end = parseTime(e);
        
        // Check if class overlaps with 1:00 PM - 2:00 PM (780 - 840)
        if (start < 840 && end > 780) {
             const subj = (cls.subject || "").toLowerCase();
             if (subj.includes("minor") || subj.includes("elective") || subj.includes("open")) {
                return false;
             }
        }
        return true;
    });

    // Sort classes by start time
    classes.sort((a, b) => {
        const startA = parseTime(a.time.split(" - ")[0]);
        const startB = parseTime(b.time.split(" - ")[0]);
        return startA - startB;
    });

    if (classes.length > 0) {
      // Check for lunch gaps (12:00 PM - 2:00 PM)
      // 12:00 PM = 720 min, 1:00 PM = 780 min, 2:00 PM = 840 min
      
      const isOccupied = (startMin, endMin) => {
        return classes.some(cls => {
            const [s, e] = cls.time.split(" - ");
            const clsStart = parseTime(s);
            const clsEnd = parseTime(e);
            // Check overlap: (StartA < EndB) and (EndA > StartB)
            return clsStart < endMin && clsEnd > startMin;
        });
      };

      const busy12to1 = isOccupied(720, 780);
      const busy1to2 = isOccupied(780, 840);

      let lunchTime = null;

      if (!busy12to1 && !busy1to2) {
          lunchTime = "12:00 PM - 02:00 PM";
      } else if (!busy12to1) {
          lunchTime = "12:00 PM - 01:00 PM";
      } else if (!busy1to2) {
          lunchTime = "01:00 PM - 02:00 PM";
      }

      if (lunchTime) {
        classes.push({
          id: "lunch-break",
          subject: "Lunch Break",
          time: lunchTime,
          type: "Break",
          location: "Cafeteria/Mess",
          professor: null
        });
        
        // Re-sort to place lunch correctly
        classes.sort((a, b) => {
            const startA = parseTime(a.time.split(" - ")[0]);
            const startB = parseTime(b.time.split(" - ")[0]);
            return startA - startB;
        });
      }
    }
    return classes;
  }, [rawDayClasses]);

  // Time & Day Logic
  useEffect(() => {
    setMounted(true);
    const now = new Date();
    setCurrentTime(now);

    const todayIndex = now.getDay();
    const todayName = days[todayIndex];
    
    // Only auto-switch day if we haven't manually selected one yet (optional)
    // Or keep your logic: if today has classes, show today.
    // FIX: Use actualSchedule to handle nested 'classes' structure
    if (actualSchedule[todayName] && actualSchedule[todayName].length > 0) {
      setCurrentDay(todayName);
    } else if (todayName === "Sunday") {
      setCurrentDay("Monday");
    }

    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, [selectedBatch, campus, fullDb, actualSchedule]); // Added actualSchedule dependency

  // --- LONG PRESS LOGIC (HOLD TO EXPAND) ---
  const [expandedSlot, setExpandedSlot] = useState(null);
  const longPressTimerRef = useRef(null);

  const handlePressStart = (slotData) => {
    longPressTimerRef.current = setTimeout(() => {
      setExpandedSlot(slotData);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(50); // Haptic feedback
      }
    }, 500); // 500ms hold time
  };

  const handlePressEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  // --- MEAL WIDGET LOGIC ---
  const getMealStatus = () => {
    if (!mounted || !currentTime) return null;
    const hour = currentTime.getHours();
    const currentDayName = days[currentTime.getDay()];
    const menu = messMenuData ? messMenuData[currentDayName] : null;
    
    if (!menu) return null;

    if (hour >= 6 && hour < 10) return { label: "Breakfast Now", items: menu.Breakfast, icon: Coffee, color: "text-amber-400", bg: "bg-amber-500/10" };
    if (hour >= 11 && hour < 15) return { label: "Lunch Menu", items: menu.Lunch, icon: Sun, color: "text-orange-400", bg: "bg-orange-500/10" };
    if (hour >= 16 && hour < 19 && menu.Snacks) return { label: "Snacks Time", items: menu.Snacks, icon: CloudSun, color: "text-rose-400", bg: "bg-rose-500/10" };
    if (hour >= 19 && hour < 22) return { label: "Dinner Menu", items: menu.Dinner, icon: Moon, color: "text-indigo-400", bg: "bg-indigo-500/10" };
    return null;
  };

  const currentMeal = getMealStatus();

  // --- STATUS LOGIC ---
  const getStatus = () => {
    if (isLoading) return { status: "Syncing Data...", color: "text-blue-400" };
    if (!mounted || !currentTime) return { status: "Loading...", color: "text-zinc-500" };
    
    const now = currentTime;
    const todayName = days[now.getDay()];
    
    if (todayName !== currentDay) return { status: "Viewing Schedule", color: "text-zinc-500" };
    if (!currentDayClasses || currentDayClasses.length === 0) return { status: "No Classes Today", color: "text-emerald-400" };
    
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    // Helper to parse time string "10:00 AM" to minutes
    const parseTime = (tStr) => {
        if (!tStr) return 0;
        const [time, modifier] = tStr.split(' ');
        let [h, m] = time.split(':').map(Number);
        if (h === 12) h = 0;
        if (modifier === 'PM') h += 12;
        return h * 60 + m;
    };

    // Sort classes by start time
    const sortedClasses = [...currentDayClasses].sort((a, b) => {
        const startA = parseTime(a.time.split(" - ")[0]);
        const startB = parseTime(b.time.split(" - ")[0]);
        return startA - startB;
    });

    const activeClass = sortedClasses.find(cls => {
        const [startStr, endStr] = cls.time.split(" - ");
        const start = parseTime(startStr);
        const end = parseTime(endStr);
        return currentMinutes >= start && currentMinutes < end;
    });

    if (activeClass) {
        return { status: `Now: ${activeClass.subject}`, color: "text-rose-400", activeId: activeClass.id }; // Assuming classes have IDs or use index
    }

    // Check for next upcoming class
    const nextClass = sortedClasses.find(cls => {
        const [startStr] = cls.time.split(" - ");
        const start = parseTime(startStr);
        return start > currentMinutes;
    });

    if (nextClass) {
        const [startStr] = nextClass.time.split(" - ");
        const start = parseTime(startStr);
        const diff = start - currentMinutes;
        
        if (diff < 60) {
             return { status: `Next: ${nextClass.subject} (in ${diff}m)`, color: "text-amber-400" };
        }
        return { status: `Next: ${nextClass.subject}`, color: "text-amber-400" };
    }

    return { status: "Classes Over", color: "text-emerald-400" }; 
  };
  const statusInfo = getStatus();

  return (
    <div className={`min-h-screen bg-black text-zinc-200 font-sans ${campus === '128' ? 'selection:bg-rose-500/30' : 'selection:bg-indigo-500/30'} relative overflow-hidden`}>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
      <Toaster />

      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 ${campus === '128' ? 'bg-rose-600' : 'bg-indigo-600'}`}></div>
        <div className={`absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 ${campus === '128' ? 'bg-purple-600' : 'bg-blue-600'}`}></div>
      </div>

      {/* Navbar with Back Button */}
      <Navbar onBack={onBack} campus={campus} />

      <main className="max-w-md mx-auto p-4 pb-24 space-y-8">
        
        {activeTab === 'schedule' && (
          <>
            {/* Status Card */}
            <div className="bg-zinc-900/50 rounded-3xl p-6 border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className={`absolute top-0 right-0 w-64 h-64 ${campus === '128' ? 'bg-rose-500/10' : 'bg-indigo-500/10'} rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none`}></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Live Status</h2>
                    <div className={`text-2xl font-bold tracking-tight ${statusInfo.color} drop-shadow-sm`}>{statusInfo.status}</div>
                  </div>
                  <div className="bg-black/40 px-3 py-1.5 rounded-full text-xs font-mono text-zinc-300 border border-white/5 backdrop-blur-sm">
                    {mounted && currentTime ? currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--:--"}
                  </div>
                </div>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                   <div className={`bg-gradient-to-r ${campus === '128' ? 'from-rose-600 to-purple-600' : 'from-indigo-600 to-blue-600'} h-full w-2/3 rounded-full opacity-80 animate-pulse`}></div>
                </div>
              </div>
            </div>

            {/* Meal Widget */}
            {currentMeal && (
              <div className={`rounded-2xl p-4 border border-white/5 flex gap-4 items-center ${currentMeal.bg}`}>
                <div className={`p-3 rounded-xl bg-black/20 shrink-0`}>
                  <currentMeal.icon className={`w-5 h-5 ${currentMeal.color}`} />
                </div>
                <div className="min-w-0">
                  <h3 className={`font-bold text-sm mb-0.5 ${currentMeal.color}`}>{currentMeal.label}</h3>
                  <p className="text-zinc-300 text-xs whitespace-normal opacity-80">
                    {Array.isArray(currentMeal.items) ? currentMeal.items.join(', ') : currentMeal.items}
                  </p>
                </div>
              </div>
            )}

            {/* Selectors & List */}
            <div>
              <div className="flex items-center justify-between px-1 mb-3">
                 <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Select Day</h3>
                 <span className="text-[10px] text-zinc-600 font-mono">{currentDay}</span>
              </div>
              <div className="flex overflow-x-auto gap-3 pb-2 -mx-4 px-4 snap-x no-scrollbar">
                {Object.keys(currentBatchSchedule).length > 0 ? days.map((day) => {
                  const isActive = currentDay === day;
                  return (
                    <button key={day} onClick={() => setCurrentDay(day)} className={`relative snap-center shrink-0 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${isActive ? (campus === '128' ? 'bg-gradient-to-br from-rose-600 to-rose-900 text-white shadow-lg shadow-rose-900/20 ring-1 ring-white/10' : 'bg-gradient-to-br from-indigo-600 to-indigo-900 text-white shadow-lg shadow-indigo-900/20 ring-1 ring-white/10') : 'bg-transparent text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300'}`}>
                      {day.slice(0, 3)}
                      {isActive && <span className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 ${campus === '128' ? 'bg-rose-500' : 'bg-indigo-500'} rounded-full shadow-[0_0_8px_rgba(244,63,94,0.8)]`}></span>}
                    </button>
                  );
                }) : <div className="text-zinc-600 text-sm px-4">No schedule data available</div>}
              </div>
            </div>

            {/* Course Selector */}
            {Object.keys(structure).length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar px-1">
                {Object.keys(structure).map(course => (
                  <button
                    key={course}
                    onClick={() => setSelectedCourse(course)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                      selectedCourse === course
                        ? (campus === '128' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20')
                        : 'bg-zinc-900 text-zinc-500 border border-white/5 hover:bg-zinc-800 hover:text-zinc-300'
                    }`}
                  >
                    {course}
                  </button>
                ))}
              </div>
            )}

            {/* Semester Selector */}
            {selectedCourse && structure[selectedCourse] && (
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar px-1">
                {structure[selectedCourse].map(sem => (
                  <button
                    key={sem}
                    onClick={() => setSelectedSemester(sem)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                      selectedSemester === sem
                        ? (campus === '128' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50' : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/50')
                        : 'bg-zinc-900 text-zinc-500 border border-white/5 hover:bg-zinc-800 hover:text-zinc-300'
                    }`}
                  >
                    {sem}
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">Calendar</h3>
                <div className="relative group">
                    <select 
                      value={selectedBatch}
                      onChange={(e) => setSelectedBatch(e.target.value)}
                      className="bg-zinc-900 text-zinc-400 text-[10px] font-bold pl-3 pr-8 py-1.5 rounded-full border border-white/5 uppercase tracking-wider outline-none appearance-none cursor-pointer hover:bg-zinc-800 hover:text-white transition-all"
                    >
                      {isLoading ? (
                         <option>Loading Batches...</option>
                      ) : (
                         filteredBatches.length > 0 ? (
                            filteredBatches.sort(sortBatches).map((batch) => {
                              // Display only the last part of the ID (e.g. "E1")
                              const displayName = batch.split('_').pop().toUpperCase();
                              return <option key={batch} value={batch}>Batch {displayName}</option>;
                            })
                         ) : <option>No Batches Found</option>
                      )}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500 pointer-events-none group-hover:text-white transition-colors" />
                </div>
              </div>

              {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
                    <p className="text-sm font-medium animate-pulse">Syncing with Cloud...</p>
                  </div>
              ) : !currentDayClasses || currentDayClasses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-zinc-600 bg-zinc-900/20 rounded-3xl border border-dashed border-zinc-800/50">
                  <p className="text-sm font-medium">No classes scheduled</p>
                </div>
              ) : (
                (() => {
                  // Group classes by time to handle electives/overlaps
                  const grouped = currentDayClasses.reduce((acc, cls) => {
                    const key = cls.time;
                    if (!acc[key]) acc[key] = [];
                    acc[key].push(cls);
                    return acc;
                  }, {});

                  // Sort time slots
                  const sortedTimes = Object.keys(grouped).sort((a, b) => {
                    const timeToMin = (t) => {
                      if (!t) return 0;
                      const parts = t.split(" - ");
                      if (parts.length === 0) return 0;
                      const timePart = parts[0].split(' ');
                      if (timePart.length < 2) return 0;
                      const [time, modifier] = timePart;
                      let [hours, minutes] = time.split(':');
                      if (hours === '12') hours = '00';
                      if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
                      return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
                    };
                    return timeToMin(a) - timeToMin(b);
                  });

                  return sortedTimes.map((time, index) => {
                    const classes = grouped[time];
                    const isMulti = classes.length > 1;
                    const first = classes[0]; // Representative class
                    
                    // Check if this group contains the active class
                    const isActive = classes.some(c => c.id === statusInfo.activeId);

                    // Determine display info
                    let subject = first.subject;
                    let typeLabel = first.type;
                    let location = first.location;
                    let professor = first.professor;
                    let textColor = "text-zinc-400";

                    if (isMulti) {
                       // Check if one of them is Lunch
                       const hasLunch = classes.some(c => c.type === 'Break');
                       
                       if (hasLunch) {
                           subject = "Lunch Break / Electives";
                           typeLabel = "Break / Elective";
                           textColor = "text-amber-400";
                           location = "Cafeteria / Classrooms";
                           professor = null;
                       } else {
                           // It's an elective slot or collision
                           const categories = [...new Set(classes.map(c => c.category).filter(Boolean))];
                           const commonCategory = categories.length > 0 ? categories.join(" / ") : "Electives";
                           
                           subject = `${commonCategory} (Select 1)`;
                           typeLabel = "Elective";
                           textColor = "text-purple-400";
                           location = "Multiple Venues";
                           professor = "Multiple Faculty";
                       }
                    } else {
                       // Single class formatting
                       if (first.type === "L" || first.type === "Lecture") {
                         typeLabel = "Lecture";
                         textColor = "text-blue-400";
                       } else if (first.type === "T" || first.type === "Tutorial") {
                         typeLabel = "Tutorial";
                         textColor = "text-emerald-400";
                       } else if (first.type === "P" || first.type === "Lab" || first.type === "Practical") {
                         typeLabel = "Lab";
                         textColor = "text-rose-400";
                       } else if (first.type === "Break") {
                         typeLabel = "Break";
                         textColor = "text-amber-400";
                       }
                    }

                    const [startTime, endTime] = time.split(" - ");

                    return (
                      <div 
                        key={index} 
                        className={`relative overflow-hidden rounded-2xl border transition-all duration-300 group select-none active:scale-[0.98] ${isActive ? (campus === '128' ? 'bg-zinc-900/80 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.1)]' : 'bg-zinc-900/80 border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.1)]') : 'bg-zinc-900/30 border-white/5 hover:bg-zinc-900 hover:border-white/10'}`}
                        onMouseDown={() => handlePressStart(classes)}
                        onMouseUp={handlePressEnd}
                        onMouseLeave={handlePressEnd}
                        onTouchStart={() => handlePressStart(classes)}
                        onTouchEnd={handlePressEnd}
                        onTouchMove={handlePressEnd} // Cancel on scroll
                      >
                        <div className="flex">
                          <div className="w-24 p-3 flex flex-col items-center justify-center border-r border-white/5 bg-black/20 shrink-0">
                            <span className="text-xs font-bold text-white whitespace-nowrap">{startTime}</span>
                            <span className="text-[10px] text-zinc-600 my-0.5">↓</span>
                            <span className="text-xs font-medium text-zinc-500 whitespace-nowrap">{endTime}</span>
                          </div>
                          <div className="flex-1 p-4 pl-5">
                            <div className="flex justify-between items-start mb-1">
                               <span className={`text-[10px] font-bold uppercase tracking-wider ${textColor}`}>{typeLabel}</span>
                               {isActive && <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${campus === '128' ? 'bg-rose-500' : 'bg-indigo-500'}`}></div>}
                            </div>
                            <h4 className={`text-base font-bold leading-tight mb-1 transition-colors ${isActive ? 'text-white' : 'text-zinc-200'}`}>{subject}</h4>
                            
                            {isMulti ? (
                                <div className="mt-3 space-y-1.5">
                                    {classes.slice(0, 3).map((c, i) => (
                                        <div key={i} className="text-[11px] text-zinc-500 flex items-center gap-2">
                                            <div className={`w-1 h-1 rounded-full ${campus === '128' ? 'bg-rose-500/50' : 'bg-indigo-500/50'}`}></div>
                                            <span className="truncate">{c.subject}</span>
                                        </div>
                                    ))}
                                    {classes.length > 3 && (
                                        <div className="text-[10px] text-zinc-600 pl-3 font-medium">+{classes.length - 3} more options</div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-4 mt-3 text-xs text-zinc-500">
                                  <div className="flex items-center gap-1.5">
                                    {typeLabel === "Break" ? <Coffee className="w-3 h-3 text-amber-500" /> : <MapPin className="w-3 h-3 text-zinc-600" />}
                                    <span>{location}</span>
                                  </div>
                                  {professor && (
                                    <div className="flex items-center gap-1.5">
                                      <User className="w-3 h-3 text-zinc-600" />
                                      <span>{professor}</span>
                                    </div>
                                  )}
                                </div>
                            )}
                          </div>
                        </div>
                        {isActive && <div className={`absolute left-0 top-0 bottom-0 w-1 ${campus === '128' ? 'bg-rose-500' : 'bg-indigo-500'}`}></div>}
                      </div>
                    );
                  });
                })()
              )}
            </div>
          </>
        )}

        {/* Expanded Slot Modal */}
        {expandedSlot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setExpandedSlot(null)}>
            <div className="bg-zinc-900 border border-white/10 rounded-3xl w-full max-w-sm max-h-[80vh] flex flex-col shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-5 border-b border-white/5 bg-zinc-900/50 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-white">Class Details</h3>
                  <p className="text-zinc-400 text-xs font-mono mt-0.5">{expandedSlot[0]?.time}</p>
                </div>
                <button onClick={() => setExpandedSlot(null)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                  <X size={18} className="text-zinc-400" />
                </button>
              </div>
              <div className="p-5 overflow-y-auto space-y-3 no-scrollbar">
                {expandedSlot.map((cls, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex justify-between items-start gap-3 mb-2">
                      <h4 className="text-sm font-bold text-zinc-100 leading-snug">{cls.subject}</h4>
                      {cls.category && <span className="text-[10px] font-bold px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 whitespace-nowrap">{cls.category}</span>}
                    </div>
                    <div className="space-y-1.5">
                      {cls.professor && <div className="flex items-center gap-2 text-xs text-zinc-400"><User size={12} className="shrink-0" /><span>{cls.professor}</span></div>}
                      <div className="flex items-center gap-2 text-xs text-zinc-400"><MapPin size={12} className="shrink-0" /><span>{cls.location}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          isWebkioskLoggedIn ? (
            <AttendanceContainer w={w} attendanceData={attendanceData} />
          ) : (
            <Login w={w} onLoginSuccess={() => setIsWebkioskLoggedIn(true)} onDemoLogin={() => setIsWebkioskLoggedIn(true)} />
          )
        )}
        {activeTab === 'search' && <FacultyDirectory facultyData={facultyDataForCampus} campus={campus} />}
        {activeTab === 'clubs' && <ClubsHubs campus={campus} />}
        {activeTab === 'menu' && <MessMenu menuData={messMenuData} campus={campus} />}
        {activeTab === 'calendar' && <AcademicCalendar />}
        {activeTab === 'placements' && <Placements />}
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} campus={campus} />
    </div>
  );
}