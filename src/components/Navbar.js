import React from 'react';
import { Bell, User, Activity, ArrowLeft } from 'lucide-react';

export default function Navbar({ onBack, campus }) {
  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5 px-4 py-3 flex justify-between items-center">
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className={`p-2 rounded-full transition-colors duration-200 ${campus === '128' ? 'text-rose-400 hover:bg-rose-500/10' : 'text-indigo-400 hover:bg-indigo-500/10'}`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-rose-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
          <div className="relative w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center border border-white/10 shadow-2xl">
            <Activity className="w-5 h-5 text-rose-500" />
          </div>
        </div>
        <div>
          <span className="block font-bold text-xl tracking-tight text-white leading-none">
            JIIT<span className="text-rose-500">Pulse</span>
          </span>
          <span className="text-[10px] text-zinc-500 font-medium tracking-wider uppercase">Student Dashboard</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Bell className="w-5 h-5 text-zinc-400 hover:text-white cursor-pointer transition-colors" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-500 rounded-full"></span>
        </div>
        <div className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-zinc-700 transition-colors cursor-pointer">
          <User className="w-4 h-4 text-zinc-400" />
        </div>
      </div>
    </nav>
  );
}