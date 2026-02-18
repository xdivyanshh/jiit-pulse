import React from 'react';
import { Building2, GraduationCap, ArrowRight } from 'lucide-react';

export default function LandingPage({ onSelect }) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-rose-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold tracking-tighter mb-2">JIIT<span className="text-rose-500">Pulse</span></h1>
          <p className="text-zinc-500 text-sm font-medium tracking-wide uppercase">Select Your Campus</p>
        </div>

        <div className="grid gap-4">
          {/* Sector 62 Card */}
          <button 
            onClick={() => onSelect('62')}
            className="group relative overflow-hidden bg-zinc-900/50 hover:bg-zinc-900 border border-white/10 hover:border-indigo-500/50 p-6 rounded-3xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div className="flex justify-between items-start">
              <div className="p-3 bg-indigo-500/10 rounded-2xl group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                <Building2 className="w-6 h-6 text-indigo-400 group-hover:text-white" />
              </div>
              <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-indigo-400 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-white mb-1">Sector 62</h3>
              <p className="text-xs text-zinc-500">Main Campus • CSE/IT Hub</p>
            </div>
          </button>

          {/* Sector 128 Card */}
          <button 
            onClick={() => onSelect('128')}
            className="group relative overflow-hidden bg-zinc-900/50 hover:bg-zinc-900 border border-white/10 hover:border-rose-500/50 p-6 rounded-3xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-rose-500/10"
          >
            <div className="flex justify-between items-start">
              <div className="p-3 bg-rose-500/10 rounded-2xl group-hover:bg-rose-500 group-hover:text-white transition-colors">
                <GraduationCap className="w-6 h-6 text-rose-400 group-hover:text-white" />
              </div>
              <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-rose-400 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-white mb-1">Sector 128</h3>
              <p className="text-xs text-zinc-500">Jaypee Wish Town • ECE/CSE</p>
            </div>
          </button>
        </div>
        
        <p className="text-center text-[10px] text-zinc-600 pt-8">
          Designed for Students, by Students.
        </p>
      </div>
    </div>
  );
}