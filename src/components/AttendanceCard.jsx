import React from 'react';
// REMOVED the missing 'Progress' import
import { MoreVertical, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function AttendanceCard({ subject, goal }) {
  const attendance = subject.attendance || { attended: 0, total: 0 };
  const percentage = subject.combined ? parseFloat(subject.combined) : 0;
  
  const getStatusMessage = () => {
    if (!goal) return null;
    const needed = Math.ceil((goal * attendance.total - 100 * attendance.attended) / (100 - goal));
    const bunk = Math.floor((100 * attendance.attended - goal * attendance.total) / goal);

    if (percentage >= goal) {
      if (bunk > 0) return <span className="text-emerald-400 text-xs">Skip up to <b>{bunk}</b> classes</span>;
      return <span className="text-emerald-400 text-xs">On Track!</span>;
    } else {
      if (needed > 0) return <span className="text-rose-400 text-xs">Attend <b>{needed}</b> more</span>;
      return <span className="text-rose-400 text-xs">Low Attendance!</span>;
    }
  };

  let statusColor = "bg-emerald-500";
  if (percentage < 75) statusColor = "bg-rose-500";
  else if (percentage < goal) statusColor = "bg-amber-500";

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-xl p-4 mb-4 shadow-sm hover:border-white/20 transition-all">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-white font-bold text-sm tracking-wide">{subject.name}</h3>
          <p className="text-zinc-500 text-xs mt-1">Code: {subject.subjectcode || "N/A"}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className={`text-xl font-bold ${percentage < 75 ? 'text-rose-500' : 'text-emerald-500'}`}>
            {percentage}%
          </span>
          <span className="text-zinc-500 text-xs">{attendance.attended}/{attendance.total} Present</span>
        </div>
      </div>

      {/* Custom Progress Bar (No external library needed) */}
      <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
        <div 
            className={`h-full ${statusColor} transition-all duration-500 ease-out`} 
            style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-2">
            {['L', 'T', 'P'].map(type => {
                const total = subject[`${type}totalclass`];
                if (!total || total === "0") return null;
                return (
                    <div key={type} className="text-[10px] bg-zinc-800 px-2 py-1 rounded text-zinc-300">
                        {type}: {subject[`${type}totalpres`]}/{total}
                    </div>
                );
            })}
        </div>
        {getStatusMessage()}
      </div>
    </div>
  );
}