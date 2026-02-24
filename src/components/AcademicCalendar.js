import React, { useState } from 'react';
import { CalendarDays, Sun, Star, BookOpen, Briefcase, CalendarPlus, Download, X } from 'lucide-react';

export default function AcademicCalendar() {
  const [activeTab, setActiveTab] = useState(() => {
    const month = new Date().getMonth();
    return (month >= 6 && month <= 11) ? 'odd' : 'even';
  });
  const [selectedEvent, setSelectedEvent] = useState(null);

  const oddSemEvents = [
    { date: "10 Jul 2025", event: "Registration (1st Year)", type: "admin" },
    { date: "24 Jul 2025", event: "Classes Start (All Batches)", type: "academic" },
    { date: "29 Aug 2025", event: "T1 Examinations Start", type: "exam" },
    { date: "10 Oct 2025", event: "Mid Term Viva (Labs)", type: "exam" },
    { date: "10 Oct 2025", event: "T2 Examinations Start", type: "exam" },
    { date: "19 Oct 2025", displayDate: "19 Oct - 26 Oct 2025", event: "Diwali Break", type: "holiday" },
    { date: "01 Dec 2025", event: "End Semester Exams Start", type: "exam" },
    { date: "14 Dec 2025", displayDate: "14 Dec 2025 - 01 Jan 2026", event: "Winter Vacation", type: "holiday" },
  ];

  const evenSemEvents = [
    { date: "02 Jan 2026", event: "Registration & Classes", type: "academic" },
    { date: "10 Feb 2026", event: "T1 Examinations Start", type: "exam" },
    { date: "01 Mar 2026", displayDate: "01 Mar - 08 Mar 2026", event: "Holi Break", type: "holiday" },
    { date: "24 Mar 2026", event: "T2 Examinations Start", type: "exam" },
    { date: "11 May 2026", event: "End Semester Exams Start", type: "exam" },
    { date: "27 May 2026", displayDate: "27 May - 15 Jul 2026", event: "Summer Vacation", type: "holiday" },
  ];

  const holidays = [
    { date: "09 Aug 2025", event: "Rakshabandhan", day: "Saturday" },
    { date: "15 Aug 2025", event: "Independence Day", day: "Friday" },
    { date: "02 Oct 2025", event: "Gandhi Jayanti", day: "Thursday" },
    { date: "19 Oct 2025", displayDate: "19 Oct - 26 Oct 2025", event: "Diwali Break", day: "Week-long" },
    { date: "25 Dec 2025", event: "Christmas", day: "Thursday" },
    { date: "26 Jan 2026", event: "Republic Day", day: "Monday" },
    { date: "01 Mar 2026", displayDate: "01 Mar - 08 Mar 2026", event: "Holi Break", day: "Week-long" },
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

  const parseDateString = (dateStr) => {
    const parts = dateStr.split(' ');
    if (parts.length < 3) return null;
    const day = parseInt(parts[0]);
    const monthStr = parts[1];
    const year = parseInt(parts[2]);
    
    const months = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };
    
    return new Date(year, months[monthStr], day);
  };

  const nextHolidayIndex = holidays.findIndex(h => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const hDate = parseDateString(h.date);
    return hDate && hDate >= today;
  });

  const addToGoogleCalendar = (item) => {
    const date = parseDateString(item.date);
    if (!date) return;
    
    const start = date.toISOString().replace(/-|:|\.\d\d\d/g, "").split("T")[0];
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    const end = nextDay.toISOString().replace(/-|:|\.\d\d\d/g, "").split("T")[0];
    
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(item.event)}&dates=${start}/${end}&details=${encodeURIComponent("Event at JIIT Noida")}`;
    window.open(url, '_blank');
  };

  const downloadICS = (item) => {
    const date = parseDateString(item.date);
    if (!date) return;
    
    const start = date.toISOString().replace(/-|:|\.\d\d\d/g, "").split("T")[0];
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    const end = nextDay.toISOString().replace(/-|:|\.\d\d\d/g, "").split("T")[0];
    
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${item.event}\nDTSTART;VALUE=DATE:${start}\nDTEND;VALUE=DATE:${end}\nDESCRIPTION:Event at JIIT Noida\nEND:VEVENT\nEND:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${item.event.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        {getEvents().map((item, idx) => {
          const isNextHoliday = activeTab === 'holidays' && idx === nextHolidayIndex;
          return (
          <div 
            key={idx}
            className={`relative p-4 rounded-xl border border-white/5 flex gap-4 items-center transition-all duration-300 hover:bg-zinc-900 hover:scale-[1.01] group border-l-4 ${getTypeStyles(item.type || 'holiday')} ${isNextHoliday ? 'bg-zinc-800/80 ring-1 ring-emerald-500/30' : ''}`}
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
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-zinc-200 group-hover:text-white transition-colors truncate">
                  {item.event}
                </h3>
                {isNextHoliday && <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">NEXT</span>}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-zinc-500 font-medium bg-black/20 px-2 py-0.5 rounded border border-white/5">
                  {item.displayDate || item.day || item.date}
                </span>
                {getIcon(item.type || 'holiday')}
              </div>
            </div>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedEvent(item);
              }}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-500 hover:text-white transition-colors shrink-0"
            >
              <CalendarPlus className="w-4 h-4" />
            </button>
          </div>
        )})}
      </div>

      {/* Calendar Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedEvent(null)}>
          <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-xs p-5 shadow-2xl space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start gap-4">
              <h3 className="text-white font-bold text-lg leading-tight">{selectedEvent.event}</h3>
              <button onClick={() => setSelectedEvent(null)} className="p-1 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><X className="w-5 h-5 text-zinc-400" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => addToGoogleCalendar(selectedEvent)} className="bg-zinc-800 hover:bg-zinc-700 text-white p-4 rounded-xl flex flex-col items-center gap-2 transition-colors border border-white/5">
                <CalendarDays className="w-6 h-6 text-blue-500" />
                <span className="text-xs font-bold">Google</span>
              </button>
              <button onClick={() => downloadICS(selectedEvent)} className="bg-zinc-800 hover:bg-zinc-700 text-white p-4 rounded-xl flex flex-col items-center gap-2 transition-colors border border-white/5">
                <Download className="w-6 h-6 text-emerald-500" />
                <span className="text-xs font-bold">iOS / Outlook</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
