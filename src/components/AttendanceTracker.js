import React, { useState, useEffect } from 'react';
import { Plus, Minus, TrendingUp, AlertTriangle, Percent } from 'lucide-react';
// We still import default as a fallback, but we prefer the prop
import { scheduleData as defaultSchedule } from '../data/schedule';

export default function AttendanceTracker({ selectedBatch, scheduleData }) {
  const [attendance, setAttendance] = useState({});
  // Use the passed prop, or fall back to the imported file if missing
  const currentSchedule = scheduleData || defaultSchedule;

  // 1. Initialize subjects based on the selected Batch!
  useEffect(() => {
    // Load saved data from phone storage
    const savedData = localStorage.getItem(`attendance_${selectedBatch}`);
    
    if (savedData) {
      setAttendance(JSON.parse(savedData));
    } else {
      // If no data, find subjects from the schedule
      const batchSchedule = currentSchedule[selectedBatch] || {};
      const subjects = new Set();
      
      Object.values(batchSchedule).forEach(dayClasses => {
        dayClasses.forEach(cls => {
          // Filter out Lunch, Breaks, or generic names
          if (cls.subject && cls.type !== 'Break' && cls.subject !== 'Lunch Break') {
            subjects.add(cls.subject);
          }
        });
      });

      const initialData = {};
      subjects.forEach(sub => {
        initialData[sub] = { present: 0, total: 0 };
      });
      setAttendance(initialData);
    }
  }, [selectedBatch, currentSchedule]); 

  // 2. Save to storage whenever data changes
  useEffect(() => {
    if (Object.keys(attendance).length > 0) {
      localStorage.setItem(`attendance_${selectedBatch}`, JSON.stringify(attendance));
    }
  }, [attendance, selectedBatch]);

  const updateAttendance = (subject, type) => {
    setAttendance(prev => {
      const current = prev[subject] || { present: 0, total: 0 };
      let newPresent = current.present;
      let newTotal = current.total;

      if (type === 'present') {
        newPresent++;
        newTotal++;
      } else if (type === 'absent') {
        newTotal++;
      }

      return {
        ...prev,
        [subject]: { present: newPresent, total: newTotal }
      };
    });
  };

  // Helper: Calculate Percentage
  const getPercentage = (present, total) => {
    if (total === 0) return 100;
    return Math.round((present / total) * 100);
  };

  // Helper: How many to bunk/attend for 75%
  const getPrediction = (present, total) => {
    const percent = getPercentage(present, total);
    if (percent >= 75) {
      const bunkable = Math.floor((present - 0.75 * total) / 0.75);
      return { text: `Can bunk ${bunkable} classes`, safe: true };
    } else {
      const need = Math.ceil((0.75 * total - present) / 0.25);
      return { text: `Attend next ${need} classes`, safe: false };
    }
  };

  // Handle case where no data exists (Sector 128)
  if (!currentSchedule[selectedBatch] || Object.keys(attendance).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-zinc-500 bg-zinc-900/20 rounded-3xl border border-dashed border-zinc-800/50">
        <Percent className="w-12 h-12 mb-3 opacity-20" />
        <p className="text-sm font-medium">No subjects found for Batch {selectedBatch}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Percent className="w-5 h-5 text-emerald-500" />
          Attendance
        </h2>
        <span className="text-[10px] font-bold text-zinc-500 bg-zinc-900 px-2 py-1 rounded border border-white/5 uppercase">
          Batch {selectedBatch}
        </span>
      </div>

      <div className="grid gap-3">
        {Object.keys(attendance).sort().map(subject => {
          const { present, total } = attendance[subject];
          const percent = getPercentage(present, total);
          const prediction = getPrediction(present, total);
          
          let color = "text-emerald-400";
          let barColor = "bg-emerald-500";
          
          if (percent < 75) {
            color = "text-rose-400";
            barColor = "bg-rose-500";
          } else if (percent < 80) {
            color = "text-amber-400";
            barColor = "bg-amber-500";
          }

          return (
            <div key={subject} className="bg-zinc-900/50 border border-white/5 rounded-2xl p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-zinc-200 font-bold text-sm truncate pr-4 w-2/3">{subject}</h3>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${color}`}>{percent}%</div>
                  <div className="text-[10px] text-zinc-500 font-medium">
                    {present} / {total} Classes
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mb-3">
                <div 
                  className={`h-full ${barColor} transition-all duration-500`} 
                  style={{ width: `${percent}%` }}
                ></div>
              </div>

              {/* Prediction Text */}
              <div className="flex items-center gap-1.5 mb-4 text-xs">
                {prediction.safe ? (
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                ) : (
                  <AlertTriangle className="w-3 h-3 text-rose-500" />
                )}
                <span className={prediction.safe ? "text-emerald-500/80" : "text-rose-500/80"}>
                  {prediction.text} to stay safe
                </span>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button 
                  onClick={() => updateAttendance(subject, 'present')}
                  className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 rounded-xl py-2 flex items-center justify-center gap-1 transition-colors active:scale-95"
                >
                  <Plus className="w-4 h-4" /> Present
                </button>
                <button 
                  onClick={() => updateAttendance(subject, 'absent')}
                  className="flex-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 rounded-xl py-2 flex items-center justify-center gap-1 transition-colors active:scale-95"
                >
                  <Minus className="w-4 h-4" /> Absent
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}