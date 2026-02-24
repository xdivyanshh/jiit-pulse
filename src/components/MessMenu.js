import React, { useState, useEffect } from 'react';
import { Utensils, Coffee, Moon, Info, Clock, CloudSun, UtensilsCrossed, AlertCircle } from 'lucide-react';
// Import default data as fallback
import { messMenu as defaultMenu, messTimings, messGuidelines } from '../data/mess';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const cardStyle = (index) => ({
  animation: `flipIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ${index * 0.1}s both`,
  transformOrigin: 'top center'
});

const MealCard = ({ title, items, icon: Icon, color, timing, index }) => (
  <div 
    className="bg-zinc-900/80 border border-white/5 rounded-2xl p-4 relative overflow-hidden group hover:bg-zinc-900 transition-all duration-300 shadow-sm"
    style={cardStyle(index)}
  >
    <div className="flex gap-4 items-start relative z-10">
      <div className={`p-3.5 rounded-2xl ${color} shadow-lg shadow-black/20 shrink-0`}>
        <Icon className="w-6 h-6 text-white drop-shadow-md" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-white font-bold text-base tracking-wide">{title}</h3>
          {timing && (
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-zinc-400 bg-black/40 px-2.5 py-1 rounded-full border border-white/5">
              <Clock className="w-3 h-3" />
              <span>{timing}</span>
            </div>
          )}
        </div>
        <p className="text-zinc-300 text-sm leading-relaxed font-light">{items}</p>
      </div>
    </div>
  </div>
);

// Now accepts 'menuData' prop to support different campuses
export default function MessMenu({ menuData, campus }) {
  const [selectedDay, setSelectedDay] = useState("Monday");

  // Use passed data, or default to Sector 62 data, or empty if explicitly null
  const currentMenuData = menuData !== undefined ? menuData : defaultMenu;

  const isOutdated = React.useMemo(() => {
    if (!currentMenuData?.effectiveDate) return false;
    
    const getMonday = (d) => {
      const date = new Date(d);
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1);
      const monday = new Date(date.setDate(diff));
      const year = monday.getFullYear();
      const month = String(monday.getMonth() + 1).padStart(2, '0');
      const dt = String(monday.getDate()).padStart(2, '0');
      return `${year}-${month}-${dt}`;
    };
    
    const currentMonday = getMonday(new Date());
    return currentMenuData.effectiveDate !== currentMonday;
  }, [currentMenuData]);

  useEffect(() => {
    const todayIndex = new Date().getDay();
    setSelectedDay(days[todayIndex]);
  }, []);

  const menu = currentMenuData ? (currentMenuData[selectedDay] || {}) : {};

  if (isOutdated) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-zinc-500 bg-zinc-900/20 rounded-3xl border border-dashed border-zinc-800/50">
        <AlertCircle className="w-12 h-12 mb-3 opacity-20 text-amber-500" />
        <p className="text-sm font-medium text-zinc-400">Menu for this week hasn't been updated.</p>
        <p className="text-xs text-zinc-600 mt-1">Please check back later.</p>
      </div>
    );
  }

  // If no menu data exists (Sector 128), show a placeholder
  if (!currentMenuData || Object.keys(currentMenuData).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-zinc-500 bg-zinc-900/20 rounded-3xl border border-dashed border-zinc-800/50">
        <UtensilsCrossed className="w-12 h-12 mb-3 opacity-20" />
        <p className="text-sm font-medium">No menu available for this sector</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <style jsx>{`
        @keyframes flipIn {
          0% { opacity: 0; transform: perspective(1000px) rotateX(-30deg) translateY(-10px); }
          100% { opacity: 1; transform: perspective(1000px) rotateX(0) translateY(0); }
        }
      `}</style>
      
      <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 snap-x no-scrollbar">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`
              relative snap-center shrink-0 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300
              ${selectedDay === day 
                ? (campus === '128' ? 'bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-500/20 scale-105' : 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-lg shadow-indigo-500/20 scale-105')
                : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300 border border-white/5'
              }
            `}
          >
            {day.slice(0, 3)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-1 mb-2">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Utensils className={`w-5 h-5 ${campus === '128' ? 'text-rose-500' : 'text-indigo-500'}`} />
            Daily Menu
          </h2>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-zinc-400 bg-zinc-900/80 px-3 py-1.5 rounded-full border border-white/5 uppercase tracking-widest">
              {selectedDay}
            </span>
            {currentMenuData?.effectiveDate && (
              <span className="text-[9px] text-zinc-600 mt-1 font-medium">
                Week of {(() => {
                  const [y, m, d] = currentMenuData.effectiveDate.split('-').map(Number);
                  const date = new Date(y, m - 1, d);
                  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                })()}
              </span>
            )}
          </div>
        </div>

        <div key={selectedDay} className="grid gap-4">
          {menu.Breakfast && (
            <MealCard index={0} title="Breakfast" items={menu.Breakfast} icon={Coffee} color="bg-amber-500" timing={messTimings.Breakfast} />
          )}
          {menu.Lunch && (
            <MealCard index={1} title="Lunch" items={menu.Lunch} icon={UtensilsCrossed} color="bg-orange-500" timing={messTimings.Lunch} />
          )}
          {menu.Snacks && (
            <MealCard index={2} title="Snacks" items={menu.Snacks} icon={CloudSun} color="bg-rose-500" timing="5:00 PM - 6:00 PM" />
          )}
          {menu.Dinner && (
            <MealCard index={3} title="Dinner" items={menu.Dinner} icon={Moon} color="bg-indigo-500" timing={messTimings.Dinner} />
          )}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 animate-in slide-in-from-bottom-10 fade-in duration-700 delay-300">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
          <Info className="w-4 h-4" />
          Mess Guidelines
        </h3>
        <div className="bg-zinc-900/30 rounded-2xl p-5 border border-white/5 space-y-3 backdrop-blur-sm">
          {messGuidelines.map((guide, idx) => (
            <div key={idx} className="flex gap-3 items-start text-xs text-zinc-400 group">
              <span className={`w-1.5 h-1.5 rounded-full bg-zinc-700 mt-1.5 shrink-0 transition-colors ${campus === '128' ? 'group-hover:bg-rose-500' : 'group-hover:bg-indigo-500'}`}></span>
              <p className="leading-relaxed group-hover:text-zinc-300 transition-colors">{guide}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}