import React, { useState } from 'react';
import { TrendingUp, AlertCircle, Percent, Hash } from 'lucide-react';

export default function Cutoff() {
  const [activeTab, setActiveTab] = useState('percentage'); // 'percentage' or 'rank'

  const percentageData = [
    { campus: "JIIT62", prog: "B.Tech", branch: "BIO", data: { "2023": ["61.00", "96.33"], "2024": ["60.00", "93.33"], "2025": ["61.33", "98.33"] } },
    { campus: "JIIT62", prog: "B.Tech", branch: "CSE", data: { "2023": ["95.33", "100.00"], "2024": ["95.33", "100.00"], "2025": ["94.00", "99.67"] } },
    { campus: "JIIT62", prog: "B.Tech", branch: "EC (ACT)", data: { "2023": ["81.00", "94.00"], "2024": ["68.67", "95.00"], "2025": ["69.00", "88.33"] } },
    { campus: "JIIT62", prog: "B.Tech", branch: "ECE", data: { "2023": ["63.33", "96.00"], "2024": ["66.00", "95.67"], "2025": ["77.00", "95.33"] } },
    { campus: "JIIT62", prog: "B.Tech", branch: "EE (VLSI)", data: { "2023": ["84.33", "91.33"], "2024": ["66.67", "92.67"], "2025": ["68.33", "84.67"] } },
    { campus: "JIIT62", prog: "B.Tech", branch: "M&C", data: { "2023": ["-", "-"], "2024": ["88.33", "95.67"], "2025": ["82.67", "94.33"] } },
    { campus: "JIIT62", prog: "B.Tech", branch: "R&AI", data: { "2023": ["-", "-"], "2024": ["-", "-"], "2025": ["84.33", "96.00"] } },
    { campus: "J62/J128", prog: "B.Tech", branch: "IT", data: { "2023": ["94.33", "96.00"], "2024": ["82.67", "95.00"], "2025": ["70.67", "89.67"] } },
    { campus: "JIIT128", prog: "B.Tech", branch: "AIML", data: { "2023": ["-", "-"], "2024": ["-", "-"], "2025": ["77.67", "98.33"] } },
    { campus: "JIIT128", prog: "B.Tech", branch: "CSE", data: { "2023": ["90.67", "98.33"], "2024": ["91.00", "95.67"], "2025": ["82.67", "94.33"] } },
    { campus: "JIIT128", prog: "B.Tech", branch: "CSE (CS)", data: { "2023": ["-", "-"], "2024": ["-", "-"], "2025": ["70.67", "91.67"] } },
    { campus: "JIIT128", prog: "B.Tech", branch: "ECM", data: { "2023": ["-", "-"], "2024": ["65.00", "92.67"], "2025": ["65.33", "86.00"] } },
    { campus: "JIIT62", prog: "INTGT", branch: "BIO", data: { "2023": ["60.00", "97.67"], "2024": ["60.00", "82.33"], "2025": ["60.00", "95.00"] } },
    { campus: "JIIT62", prog: "INTGT", branch: "CSE", data: { "2023": ["90.67", "96.00"], "2024": ["89.33", "95.33"], "2025": ["89.67", "94.00"] } },
    { campus: "JIIT62", prog: "INTGT", branch: "ECE", data: { "2023": ["63.00", "91.67"], "2024": ["65.67", "89.00"], "2025": ["65.00", "82.33"] } },
  ];

  const rankData = [
    { campus: "JIIT62", prog: "B.Tech", branch: "BIO", data: { "2023": ["-", "-"], "2024": ["-", "-"], "2025": ["-", "-"] } },
    { campus: "JIIT62", prog: "B.Tech", branch: "CSE", data: { "2023": ["18185", "65607"], "2024": ["17438", "73836"], "2025": ["12458", "92207"] } },
    { campus: "JIIT62", prog: "B.Tech", branch: "EC (ACT)", data: { "2023": ["87040", "186028"], "2024": ["68276", "199283"], "2025": ["128904", "382799"] } },
    { campus: "JIIT62", prog: "B.Tech", branch: "ECE", data: { "2023": ["54748", "210800"], "2024": ["64743", "247410"], "2025": ["64600", "382452"] } },
    { campus: "JIIT62", prog: "B.Tech", branch: "EE (VLSI)", data: { "2023": ["74273", "136571"], "2024": ["73929", "192189"], "2025": ["132382", "397196"] } },
    { campus: "JIIT62", prog: "B.Tech", branch: "M&C", data: { "2023": ["-", "-"], "2024": ["64226", "119167"], "2025": ["35627", "126758"] } },
    { campus: "JIIT62", prog: "B.Tech", branch: "R&AI", data: { "2023": ["-", "-"], "2024": ["-", "-"], "2025": ["93728", "245092"] } },
    { campus: "J62/J128", prog: "B.Tech", branch: "IT", data: { "2023": ["49000", "79219"], "2024": ["77425", "299142"], "2025": ["111097", "350402"] } },
    { campus: "JIIT128", prog: "B.Tech", branch: "AIML", data: { "2023": ["-", "-"], "2024": ["-", "-"], "2025": ["79752", "382292"] } },
    { campus: "JIIT128", prog: "B.Tech", branch: "CSE", data: { "2023": ["46290", "128693"], "2024": ["63684", "140657"], "2025": ["71012", "263583"] } },
    { campus: "JIIT128", prog: "B.Tech", branch: "CSE (CS)", data: { "2023": ["-", "-"], "2024": ["-", "-"], "2025": ["122087", "382999"] } },
    { campus: "JIIT128", prog: "B.Tech", branch: "ECM", data: { "2023": ["-", "-"], "2024": ["98113", "203256"], "2025": ["141709", "395845"] } },
    { campus: "JIIT62", prog: "INTGT", branch: "CSE", data: { "2023": ["55586", "136648"], "2024": ["64685", "128337"], "2025": ["72620", "176107"] } },
    { campus: "JIIT62", prog: "INTGT", branch: "ECE", data: { "2023": ["100798", "208680"], "2024": ["119167", "131966"], "2025": ["254381", "370024"] } },
  ];

  const currentData = activeTab === 'percentage' ? percentageData : rankData;

  return (
    <div className="space-y-6 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-emerald-500" />
          Cut-offs
        </h2>
        <div className="flex bg-zinc-900/80 rounded-lg p-1 border border-white/10">
          <button 
            onClick={() => setActiveTab('percentage')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${activeTab === 'percentage' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Percent className="w-3 h-3" />
            10+2 Merit
          </button>
          <button 
            onClick={() => setActiveTab('rank')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${activeTab === 'rank' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Hash className="w-3 h-3" />
            JEE Rank
          </button>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-4 flex gap-3 items-start">
        <AlertCircle className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-400 leading-relaxed">
          <p className="mb-1"><strong className="text-zinc-300">Min:</strong> Opening Rank/Percentage</p>
          <p><strong className="text-zinc-300">Max:</strong> Closing Rank/Percentage</p>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-zinc-500 text-[10px] font-bold uppercase tracking-wider border-b border-white/5">
                <th className="p-4 sticky left-0 bg-zinc-900 z-10 border-r border-white/5">Branch</th>
                <th className="p-4 text-center min-w-[100px]">2025</th>
                <th className="p-4 text-center min-w-[100px]">2024</th>
                <th className="p-4 text-center min-w-[100px]">2023</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {currentData.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors group">
                  <td className="p-4 sticky left-0 bg-zinc-900 group-hover:bg-zinc-800 transition-colors border-r border-white/5 z-10">
                    <div className="font-bold text-white text-xs">{row.branch}</div>
                    <div className="text-[9px] text-zinc-500 mt-0.5">{row.campus} • {row.prog}</div>
                  </td>
                  {['2025', '2024', '2023'].map(year => (
                    <td key={year} className="p-4 text-center">
                      {row.data[year][0] === '-' ? (
                        <span className="text-zinc-600 text-xs">-</span>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-medium text-emerald-400">{row.data[year][0]}</span>
                          <div className="h-px w-full bg-white/5"></div>
                          <span className="text-xs font-medium text-rose-400">{row.data[year][1]}</span>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <p className="text-center text-[10px] text-zinc-600">
        Data sourced from official counseling records.
      </p>
    </div>
  );
}