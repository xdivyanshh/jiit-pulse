import { useState, useEffect, useMemo } from 'react';

// --- UTILS from your snippet ---
function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  // Handle "09:00 AM - 10:00 AM" format by taking the start time
  const startStr = timeStr.includes(" - ") ? timeStr.split(" - ")[0] : timeStr;
  
  const [time, meridiem] = startStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (meridiem?.toUpperCase() === "PM" && hours < 12) hours += 12;
  if (meridiem?.toUpperCase() === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

// Stable sort for classes (Your requested feature)
function sortClassesByTime(list) {
  const arr = Array.isArray(list) ? [...list] : [];
  arr.sort((a, b) => {
    const s = timeToMinutes(a.time) - timeToMinutes(b.time);
    if (s !== 0) return s;
    return (a.subject || "").localeCompare(b.subject || "");
  });
  return arr;
}

export function useSchedule(allBatches, campus) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  const [currentDay, setCurrentDay] = useState("Monday");
  const [currentTime, setCurrentTime] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Batch State
  const [selectedBatch, setSelectedBatch] = useState(() => {
    if (allBatches && allBatches["B1"]) return "B1";
    if (allBatches && allBatches["F1"]) return "F1";
    const keys = allBatches ? Object.keys(allBatches) : [];
    return keys.length > 0 ? keys[0] : "";
  });

  // Get raw schedule for batch
  const currentBatchSchedule = useMemo(() => {
    return allBatches ? (allBatches[selectedBatch] || {}) : {};
  }, [allBatches, selectedBatch]);

  const rawClasses = currentBatchSchedule[currentDay] || [];

  // --- USE THE ROBUST SORTING LOGIC ---
  const sortedClasses = useMemo(() => {
    return sortClassesByTime(rawClasses);
  }, [rawClasses]);

  // --- TIME MANAGEMENT ---
  useEffect(() => {
    setMounted(true);
    const now = new Date();
    setCurrentTime(now);

    const todayIndex = now.getDay();
    const todayName = days[todayIndex];

    // Auto-select today if there are classes, else default to Monday
    if (currentBatchSchedule[todayName] && currentBatchSchedule[todayName].length > 0) {
      setCurrentDay(todayName);
    } else if (todayName === "Sunday") {
      setCurrentDay("Monday");
    }

    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, [selectedBatch, campus, currentBatchSchedule]); 

  // --- STATUS LOGIC ---
  const getStatus = () => {
    if (!mounted || !currentTime) return { status: "Loading...", color: "text-zinc-500" };
    
    const now = currentTime;
    const todayName = days[now.getDay()];
    
    if (todayName !== currentDay) return { status: "Viewing Schedule", color: "text-zinc-500" };
    if (!sortedClasses || sortedClasses.length === 0) return { status: "No Classes Today", color: "text-emerald-400" };

    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    for (const cls of sortedClasses) {
      // Parse start and end times
      const [startStr, endStr] = cls.time.split(" - ");
      const startMin = timeToMinutes(startStr);
      const endMin = timeToMinutes(endStr); // Reuse helper for end time

      if (currentMinutes >= startMin && currentMinutes < endMin) {
        if (cls.type === "Break") return { status: "Lunch Break 🍱", color: "text-emerald-400", activeId: cls.id };
        return { status: `Now: ${cls.subject}`, color: "text-rose-400", activeId: cls.id };
      }
      if (currentMinutes < startMin) {
        const diff = startMin - currentMinutes;
        const hours = Math.floor(diff / 60);
        const mins = diff % 60;
        let timeStr = "";
        if (hours > 0) timeStr += `${hours}h `;
        timeStr += `${mins}m`;
        return { status: `Next in ${timeStr}: ${cls.subject}`, color: "text-amber-400" };
      }
    }
    return { status: "Classes Over", color: "text-emerald-400" };
  };

  return {
    currentDay,
    setCurrentDay,
    currentTime,
    selectedBatch,
    setSelectedBatch,
    sortedClasses,
    getStatus,
    currentBatchSchedule,
    mounted
  };
}