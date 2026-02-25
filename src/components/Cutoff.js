import React, { useState } from 'react';
import { TrendingUp, AlertCircle, Percent, Hash, MapPin, ChevronDown } from 'lucide-react';

export default function Cutoff() {
  const [mode, setMode] = useState('percentage'); // 'percentage' or 'rank'
  const [year, setYear] = useState('2025');
  const [campus, setCampus] = useState('62'); // '62' or '128'

  const percentageData = [
    { campus: "JIIT62", prog: "B.Tech", branch: "BIO", data: { "2022": ["60.00", "95.00"], "2023": ["61.00", "96.33"], "2024": ["60.00", "93.33"], "2025": ["61.33", "98.33"] } },
    { campus: "JIIT62", prog: "B.Tech", branch: "CSE", data: { "2022": ["97.00", "100.00"], "2023": ["95.33", "100.00"], "2024": ["95.33", "100.00"], "2025": ["94.00", "99.67"] } },
    { campus: "JIIT62", prog: "B.Tech", branch: "EC (ACT)", data: { "2022": ["-", "-"], "2023": ["81.00", "94.00"], "2024": ["68.67", "95.00"], "2025": ["69.00", "88.33"] } },
    { campus: "JIIT62", prog: "B.Tech", branch: "ECE", data: { "2022": ["90.00", "100.00"], "2023": ["63.33", "96.00"], "2024": ["66.00", "95.67"], "2025": ["77.00", "95.33"] } },
    { campus: "JIIT62", prog: "B.Tech", branch: "EE (VLSI)", data: { "2022": ["-", "-"], "2023": ["84.33", "91.33"], "2024": ["66.67", "92.67"], "2025": ["68.33", "84.67"] } },
    { campus: "JIIT62", prog: "B.Tech", branch: "M&C", data: { "2022": ["-", "-"], "2023": ["-", "-"], "2024": ["88.33", "95.67"], "2025": ["82.67", "94.33"] } },
    { campus: "JIIT62", prog: "B.Tech", branch: "R&AI", data: { "2022": ["-", "-"], "2023": ["-", "-"], "2024": ["-", "-"], "2025": ["84.33", "96.00"] } },
    { campus: "J62/J128", prog: "B.Tech", branch: "IT", data: { "2022": ["96.00", "98.00"], "2023": ["94.33", "96.00"], "2024": ["82.67", "95.00"], "2025": ["70.67", "89.67"] } },
    { campus: "JIIT128", prog: "B.Tech", branch: "AIML", data: { "2022": ["-", "-"], "2023": ["-", "-"], "2024": ["-", "-"], "2025": ["77.67", "98.33"] } },
    { campus: "JIIT128", prog: "B.Tech", branch: "CSE", data: { "2022": ["94.00", "100.00"], "2023": ["90.67", "98.33"], "2024": ["91.00", "95.67"], "2025": ["82.67", "94.33"] } },
    { campus: "JIIT128", prog: "B.Tech", branch: "CSE (CS)", data: { "2022": ["-", "-"], "2023": ["-", "-"], "2024": ["-", "-"], "2025": ["70.67", "91.67"] } },
    { campus: "JIIT128", prog: "B.Tech", branch: "ECE", data: { "2022": ["60.00", "95.00"], "2023": ["-", "-"], "2024": ["-", "-"], "2025": ["-", "-"] } },
    { campus: "JIIT128", prog: "B.Tech", branch: "ECM", data: { "2022": ["-", "-"], "2023": ["-", "-"], "2024": ["65.00", "92.67"], "2025": ["65.33", "86.00"] } },
    { campus: "JIIT62", prog: "INTGT", branch: "BIO", data: { "2022": ["-", "-"], "2023": ["60.00", "97.67"], "2024": ["60.00", "82.33"], "2025": ["60.00", "95.00"] } },
    { campus: "JIIT62", prog: "INTGT", branch: "CSE", data: { "2022": ["-", "-"], "2023": ["90.67", "96.00"], "2024": ["89.33", "95.33"], "2025": ["89.67", "94.00"] } },
    { campus: "JIIT62", prog: "INTGT", branch: "ECE", data: { "2022": ["-", "-"], "2023": ["63.00", "91.67"], "2024": ["65.67", "89.00"], "2025": ["65.00", "82.33"] } },
  ];

  const rankData = [
    { campus: "JIIT62", prog: "B.Tech", branch: "BIO", data: { "2022": ["-", "-"], "2023": ["-", "-"], "2024": ["-", "-"], "2025": ["-", "-"] } },
    { campus: "JIIT62", prog: "B.Tech", branch: "CSE", data: { "2022": ["18000", "60000"], "2023": ["18185", "65607"], "2024": ["17438", "73836"], "2025": ["12458", "92207"] } },
    { campus: "JIIT62", prog: "B.Tech", branch: "EC (ACT)", data: { "2022": ["-", "-"], "2023": ["87040", "186028"], "2024": ["68276", "199283"], "2025": ["128904", "382799"] } },
    { campus: "JIIT62", prog: "B.Tech", branch: "ECE", data: { "2022": ["50000", "160000"], "2023": ["54748", "210800"], "2024": ["64743", "247410"], "2025": ["64600", "382452"] } },
    { campus: "JIIT62", prog: "B.Tech", branch: "EE (VLSI)", data: { "2022": ["-", "-"], "2023": ["74273", "136571"], "2024": ["73929", "192189"], "2025": ["132382", "397196"] } },
    { campus: "JIIT62", prog: "B.Tech", branch: "M&C", data: { "2022": ["-", "-"], "2023": ["-", "-"], "2024": ["64226", "119167"], "2025": ["35627", "126758"] } },
    { campus: "JIIT62", prog: "B.Tech", branch: "R&AI", data: { "2022": ["-", "-"], "2023": ["-", "-"], "2024": ["-", "-"], "2025": ["93728", "245092"] } },
    { campus: "J62/J128", prog: "B.Tech", branch: "IT", data: { "2022": ["40000", "60000"], "2023": ["49000", "79219"], "2024": ["77425", "299142"], "2025": ["111097", "350402"] } },
    { campus: "JIIT128", prog: "B.Tech", branch: "AIML", data: { "2022": ["-", "-"], "2023": ["-", "-"], "2024": ["-", "-"], "2025": ["79752", "382292"] } },
    { campus: "JIIT128", prog: "B.Tech", branch: "CSE", data: { "2022": ["40000", "100000"], "2023": ["46290", "128693"], "2024": ["63684", "140657"], "2025": ["71012", "263583"] } },
    { campus: "JIIT128", prog: "B.Tech", branch: "CSE (CS)", data: { "2022": ["-", "-"], "2023": ["-", "-"], "2024": ["-", "-"], "2025": ["122087", "382999"] } },
    { campus: "JIIT128", prog: "B.Tech", branch: "ECE", data: { "2022": ["100000", "500000"], "2023": ["-", "-"], "2024": ["-", "-"], "2025": ["-", "-"] } },
    { campus: "JIIT128", prog: "B.Tech", branch: "ECM", data: { "2022": ["-", "-"], "2023": ["-", "-"], "2024": ["98113", "203256"], "2025": ["141709", "395845"] } },
    { campus: "JIIT62", prog: "INTGT", branch: "CSE", data: { "2022": ["-", "-"], "2023": ["55586", "136648"], "2024": ["64685", "128337"], "2025": ["72620", "176107"] } },
    { campus: "JIIT62", prog: "INTGT", branch: "ECE", data: { "2022": ["-", "-"], "2023": ["100798", "208680"], "2024": ["119167", "131966"], "2025": ["254381", "370024"] } },
  ];

  const currentData = mode === 'percentage' ? percentageData : rankData;

  const filteredData = currentData.filter(item => {
    if (campus === '62') return item.campus.includes('62');
    if (campus === '128') return item.campus.includes('128');
    return false;
  });

  return (
    <div className="space-y-6 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-emerald-500" />
          Cut-offs
        </h2>
      </div>

      {/* Controls Container */}
      <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-4 space-y-4">
        
        {/* Mode Toggle */}
        <div className="flex bg-zinc-900 p-1 rounded-xl border border-white/5">
          <button 
            onClick={() => setMode('percentage')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${mode === 'percentage' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Percent className="w-3.5 h-3.5" />
            10+2 Merit
          </button>
          <button 
            onClick={() => setMode('rank')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${mode === 'rank' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Hash className="w-3.5 h-3.5" />
            JEE Rank
          </button>
        </div>

        <div className="flex gap-3">
            {/* Campus Toggle */}
            <div className="flex-1 flex bg-zinc-900 p-1 rounded-xl border border-white/5">
                <button 
                    onClick={() => setCampus('62')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${campus === '62' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    Sec 62
                </button>
                <button 
                    onClick={() => setCampus('128')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${campus === '128' ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    Sec 128
                </button>
            </div>

            {/* Year Selector */}
            <div className="relative min-w-[90px]">
                <select 
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full h-full bg-zinc-900 text-white text-xs font-bold px-3 rounded-xl border border-white/5 appearance-none outline-none focus:border-white/20"
                >
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
            </div>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-3">
        {filteredData.map((item, idx) => {
            const [min, max] = item.data[year] || ["-", "-"];
            const isAvailable = min !== "-" && max !== "-";
            
            return (
                <div key={idx} className="bg-zinc-900/30 border border-white/5 rounded-xl p-4 flex items-center justify-between group hover:bg-zinc-900/50 transition-colors">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-bold text-white">{item.branch}</h3>
                            <span className="text-[10px] font-bold text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">{item.prog}</span>
                        </div>
                        <div className="text-xs text-zinc-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {item.campus}
                        </div>
                    </div>

                    <div className="text-right">
                        {isAvailable ? (
                            <div className="flex items-center gap-4">
                                <div>
                                    <div className="text-[10px] text-zinc-500 uppercase font-bold mb-0.5">Opening</div>
                                    <div className="text-sm font-bold text-emerald-400">{min}</div>
                                </div>
                                <div className="w-px h-8 bg-white/10"></div>
                                <div>
                                    <div className="text-[10px] text-zinc-500 uppercase font-bold mb-0.5">Closing</div>
                                    <div className="text-sm font-bold text-rose-400">{max}</div>
                                </div>
                            </div>
                        ) : (
                            <span className="text-xs font-medium text-zinc-600 italic">Data N/A</span>
                        )}
                    </div>
                </div>
            );
        })}
        
        {filteredData.length === 0 && (
            <div className="text-center py-10 text-zinc-500 text-sm">
                No branches found for this selection.
            </div>
        )}
      </div>
      
      <div className="flex items-start gap-2 bg-zinc-900/50 p-3 rounded-xl border border-white/5">
        <AlertCircle className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
        <p className="text-xs text-zinc-500 leading-relaxed">
            Cut-offs shown are for general category. Actual counseling cut-offs may vary slightly based on rounds and vacancies.
        </p>
      </div>
    </div>
  );
}