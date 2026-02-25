import React, { useState, useEffect } from 'react';
import AttendanceCard from './Attendance'; // Renamed for clarity
import { Loader2, AlertCircle } from 'lucide-react';

export default function AttendanceContainer({ w, attendanceData: initialData }) {
  const [attendanceGoal, setAttendanceGoal] = useState(75);
  const [attendanceData, setAttendanceData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If no initial data is passed, fetch it.
    if (!initialData) {
      const fetchAttendance = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const data = await w.get_attendance();
          setAttendanceData(data);
        } catch (e) {
          console.error("Failed to fetch attendance:", e);
          setError(e.message || "Could not load attendance data.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchAttendance();
    }
  }, [w, initialData]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p className="text-sm font-medium">Fetching Attendance...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-rose-400 bg-rose-500/10 rounded-2xl">
        <AlertCircle className="w-8 h-8 mb-2" />
        <p className="text-sm font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 pb-24">
      {attendanceData?.attendance_data?.map((subject, index) => (
        <AttendanceCard key={subject.subject_code || index} subject={subject} goal={attendanceGoal} />
      ))}
    </div>
  );
}