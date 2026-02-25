import React from 'react';
import { MoreVertical, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function AttendanceCard({ subject, goal }) {
  // Combine L/T and P attendance from jsjiit structure
  const attended = (subject.L_T?.present || 0) + (subject.P?.present || 0);
  const total = (subject.L_T?.total || 0) + (subject.P?.total || 0);
  const attendance = { attended, total };

  // Calculate percentage
  const percentage = total > 0 ? Math.round((attended / total) * 100) : 0;
  
  let statusColor = "bg-emerald-500";
  if (percentage < 75) statusColor = "bg-rose-500";
  else if (percentage < goal) statusColor = "bg-amber-500";

  // Classes needed/skippable logic
  const getStatusMessage = () => {
    if (!goal || total === 0) return null;
    const needed = Math.ceil((goal * total - 100 * attended) / (100 - goal));
    const bunk = Math.floor((100 * attended - goal * total) / goal);

    if (percentage >= goal) {
      if (bunk > 0) return <span className="text-emerald-400 text-xs">Skip {bunk} classes</span>;
      return <span className="text-emerald-400 text-xs">On Track!</span>;
    } else {
      if (needed > 0) return <span className="text-rose-400 text-xs">Attend {needed} more</span>;
      return <span className="text-rose-400 text-xs">Low Attendance!</span>;
    }
  };

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-xl p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-white font-bold text-sm">{subject.subject_name}</h3>
          <p className="text-zinc-500 text-xs">{subject.subject_code || "N/A"}</p>
        </div>
        <div className="text-right">
          <span className={`text-xl font-bold ${percentage < 75 ? 'text-rose-500' : 'text-emerald-500'}`}>
            {percentage}%
          </span>
          <p className="text-zinc-500 text-xs">{attended}/{total}</p>
        </div>
      </div>
      
      {/* Custom Progress Bar */}
      <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
        <div className={`h-full ${statusColor}`} style={{ width: `${Math.min(percentage, 100)}%` }} />
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-2">
           {subject.L_T && subject.L_T.total > 0 && (
             <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded text-zinc-300">L/T: {subject.L_T.present}/{subject.L_T.total}</span>
           )}
           {subject.P && subject.P.total > 0 && (
             <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded text-zinc-300">P: {subject.P.present}/{subject.P.total}</span>
           )}
        </div>
        {getStatusMessage()}
      </div>
    </div>
  );
}