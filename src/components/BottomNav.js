import React from 'react';
import { Calendar, Search, Menu, Users, CalendarRange } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, campus }) {
  const getIconColor = (tabName) => activeTab === tabName ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300';
  const getBgColor = (tabName) => {
    if (activeTab !== tabName) return 'hover:bg-zinc-800/50';
    return campus === '128' ? 'bg-rose-600 shadow-lg shadow-rose-500/20' : 'bg-indigo-600 shadow-lg shadow-indigo-500/20';
  };

  const NavButton = ({ tab, icon: Icon }) => (
    <button 
      onClick={() => setActiveTab(tab)}
      className={`p-3 rounded-full transition-all duration-300 group ${getBgColor(tab)}`}
    >
      <Icon className={`w-5 h-5 ${getIconColor(tab)}`} />
    </button>
  );

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-1.5 rounded-full flex gap-1 shadow-2xl z-50">
      <NavButton tab="schedule" icon={Calendar} />
      <NavButton tab="search" icon={Search} />
      <NavButton tab="calendar" icon={CalendarRange} />
      <NavButton tab="clubs" icon={Users} />
      <NavButton tab="menu" icon={Menu} />
    </div>
  );
}