import React, { useState } from 'react';
import { CalendarDays, Sun, Star, BookOpen, Briefcase } from 'lucide-react';

export default function AcademicCalendar() {
  const [activeTab, setActiveTab] = useState('odd');

  const oddSemEvents = [
    { date: "10 Jul 2025", event: "Registration (1st Year)", type: "admin" },
    { date: "24 Jul 2025", event: "Classes Start (All Batches)", type: "academic" },
    { date: "29 Aug 2025", event: "T1 Examinations Start", type: "exam" },
    { date: "10 Oct 2025", event: "Mid Term Viva (Labs)", type: "exam" },
    { date: "10 Oct 2025", event: "T2 Examinations Start", type: "exam" },
    { date: "19 Oct 2025", event: "Diwali Break Starts", type: "holiday" },
    { date: "01 Dec 2025", event: "End Semester Exams Start", type: "exam" },
    { date: "14 Dec 2025", event: "Winter Vacation Starts", type: "holiday" },
  ];

  const evenSemEvents = [
    { date: "02 Jan 2026", event: "Registration & Classes", type: "academic" },
    { date: "10 Feb 2026", event: "T1 Examinations Start", type: "exam" },
    { date: "01 Mar 2026", event: "Holi Break Starts", type: "holiday" },
    { date: "24 Mar 2026", event: "T2 Examinations Start", type: "exam" },
    { date: "11 May 2026", event: "End Semester Exams Start", type: "exam" },
    { date: "27 May 2026", event: "Summer Vacation Starts", type: "holiday" },
  ];

  const holidays = [
    { date: "09 Aug 2025", event: "Rakshabandhan", day: "Saturday" },
    { date: "15 Aug 2025", event: "Independence Day", day: "Friday" },
    { date: "02 Oct 2025", event: "Gandhi Jayanti", day: "Thursday" },
    { date: "20 Oct 2025", event: "Deepawali", day: "Mon-Tue" },
    { date: "25 Dec 2025", event: "Christmas", day: "Thursday" },
    { date: "26 Jan 2026", event: "Republic Day", day: "Monday" },
    { date: "03 Mar 2026", event: "Holi", day: "Tue-Wed" },
    { date: "14 Apr 2026", event: "Ambedkar Jayanti", day: "Tuesday" },
  ];

  const getEvents = () => {
    switch(activeTab) {
      case 'odd': return oddSemEvents;
      case 'even': return evenSemEvents;
      case 'holidays': return holidays;
      default: return [];
    }
  };

  const getTypeStyles = (type) => {
    switch(type) {
      case 'exam': return 'border-l-rose-500 bg-zinc-900/50';
      case 'holiday': return 'border-l-emerald-500 bg-zinc-900/50';
      case 'academic': return 'border-l-blue-500 bg-zinc-900/50';
      case 'admin': return 'border-l-amber-500 bg-zinc-900/50';
      default: return 'border-l-zinc-500 bg-zinc-900/50';
    }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'exam': return <Star className="w-3 h-3 text-rose-500" />;
      case 'holiday': return <Sun className="w-3 h-3 text-emerald-500" />;
      case 'academic': return <BookOpen className="w-3 h-3 text-blue-500" />;
      case 'admin': return <Briefcase className="w-3 h-3 text-amber-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
       {/* Header */}
       <div className="flex items-center justify-between px-1">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <CalendarDays className="w-6 h-6 text-indigo-500" />
          Academic Calendar
        </h2>
        <span className="text-[10px] font-bold text-zinc-500 bg-zinc-900 px-3 py-1.5 rounded-full border border-white/10 uppercase tracking-wider">
          2025-26
        </span>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-zinc-900/80 rounded-xl border border-white/10 backdrop-blur-md">
        {['odd', 'even', 'holidays'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${
              activeTab === tab 
                ? 'bg-zinc-800 text-white shadow-lg scale-[1.02]' 
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
            }`}
          >
            {tab === 'holidays' ? 'Holidays' : `${tab} Sem`}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-3">
        {getEvents().map((item, idx) => (
          <div 
            key={idx}
            className={`relative p-4 rounded-xl border border-white/5 flex gap-4 items-center transition-all duration-300 hover:bg-zinc-900 hover:scale-[1.01] group border-l-4 ${getTypeStyles(item.type || 'holiday')}`}
            style={{ 
              animation: `slideIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) ${idx * 0.05}s both` 
            }}
          >
            <div className="shrink-0 w-14 text-center flex flex-col justify-center">
              <span className="block text-xl font-bold leading-none text-white group-hover:text-indigo-400 transition-colors">
                {item.date.split(' ')[0].split('-')[0]}
              </span>
              <span className="text-[10px] font-medium uppercase text-zinc-500 mt-1">
                {item.date.split(' ')[1]}
              </span>
            </div>
            
            <div className="w-px h-10 bg-white/10 group-hover:bg-white/20 transition-colors"></div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm text-zinc-200 group-hover:text-white transition-colors truncate">
                {item.event}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-zinc-500 font-medium bg-black/20 px-2 py-0.5 rounded border border-white/5">
                  {item.day || item.date}
                </span>
                {getIcon(item.type || 'holiday')}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
