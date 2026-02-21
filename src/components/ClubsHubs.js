import React, { useState } from 'react';
import { Users, ExternalLink, ChevronRight, Calendar, Instagram, Globe, Zap, Music, Code, Cpu } from 'lucide-react';

export default function ClubsHubs({ campus }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const clubs = [
    {
      id: 1,
      name: "GDSC",
      fullName: "Google Developer Student Clubs",
      description: "Community group for students interested in Google developer technologies. Workshops, hackathons, and more.",
      category: "Technical",
      members: "500+",
      events: "12",
      icon: Globe,
      color: "from-blue-500 to-green-500",
      iconColor: "text-blue-400"
    },
    {
      id: 2,
      name: "IEEE",
      fullName: "Institute of Electrical and Electronics Engineers",
      description: "The world's largest technical professional organization dedicated to advancing technology for the benefit of humanity.",
      category: "Technical",
      members: "300+",
      events: "8",
      icon: Cpu,
      color: "from-indigo-500 to-purple-500",
      iconColor: "text-indigo-400"
    },
    {
      id: 3,
      name: "Jhankaar",
      fullName: "Dance Club",
      description: "The official dance club of the college. Express yourself through movement and rhythm in various styles.",
      category: "Cultural",
      members: "150+",
      events: "5",
      icon: Music,
      color: "from-rose-500 to-orange-500",
      iconColor: "text-rose-400"
    },
    {
      id: 4,
      name: "Knuth",
      fullName: "Programming Hub",
      description: "Competitive programming, algorithms, and problem solving. Prepare for ACM-ICPC and other contests.",
      category: "Technical",
      members: "400+",
      events: "15",
      icon: Code,
      color: "from-emerald-500 to-teal-500",
      iconColor: "text-emerald-400"
    },
    {
      id: 5,
      name: "Parola",
      fullName: "Literary Hub",
      description: "Debates, poetry, and literary discussions. A place for those who love words and expression.",
      category: "Cultural",
      members: "200+",
      events: "10",
      icon: Zap,
      color: "from-amber-500 to-yellow-500",
      iconColor: "text-amber-400"
    }
  ];

  const categories = ['All', 'Technical', 'Cultural', 'Sports'];
  
  const filteredClubs = activeCategory === 'All' 
    ? clubs 
    : clubs.filter(c => c.category === activeCategory);

  const is128 = campus === '128';
  const accentColor = is128 ? 'text-rose-500' : 'text-indigo-500';
  const btnBg = is128 ? 'bg-rose-600 hover:bg-rose-500' : 'bg-indigo-600 hover:bg-indigo-500';
  const shadowColor = is128 ? 'shadow-rose-900/20' : 'shadow-indigo-900/20';

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-zinc-900/50 border border-white/5 p-6">
        <div className={`absolute top-0 right-0 w-32 h-32 ${is128 ? 'bg-rose-500/20' : 'bg-indigo-500/20'} rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none`}></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Student Hubs</h2>
              <p className="text-zinc-400 text-xs">Explore {is128 ? 'Sector 128' : 'Sector 62'} communities</p>
            </div>
            <div className={`p-2.5 rounded-xl bg-zinc-900 border border-white/10 ${accentColor}`}>
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar px-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeCategory === cat
                ? `bg-white text-black shadow-lg shadow-white/10 scale-105`
                : 'bg-zinc-900/50 text-zinc-500 border border-white/5 hover:bg-zinc-800 hover:text-zinc-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Clubs Grid */}
      <div className="grid gap-4">
        {filteredClubs.map((club, index) => (
          <div 
            key={club.id} 
            className="group relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-3xl p-5 overflow-hidden hover:bg-zinc-900/60 transition-all duration-300 active:scale-[0.98]"
            style={{
              animation: `slideUp 0.5s ease-out ${index * 0.1}s both`
            }}
          >
            {/* Gradient Glow on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${club.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-zinc-800/50 border border-white/5 flex items-center justify-center ${club.iconColor}`}>
                   <club.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/5 text-zinc-400 border border-white/5 uppercase tracking-wider">
                  {club.category}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all">
                {club.name}
              </h3>
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide mb-3">{club.fullName}</p>
              
              <p className="text-sm text-zinc-400 leading-relaxed mb-5 line-clamp-2">
                {club.description}
              </p>

              {/* Stats Row */}
              <div className="flex items-center gap-4 mb-5 text-xs text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>{club.members}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{club.events} Events</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                 <button className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-medium flex items-center justify-center gap-2 transition-colors border border-white/5">
                    <Instagram className="w-3.5 h-3.5" /> Socials
                 </button>
                 <button className={`py-2.5 rounded-xl ${btnBg} text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${shadowColor}`}>
                    Join Club <ChevronRight className="w-3.5 h-3.5" />
                 </button>
              </div>
            </div>
          </div>
        ))}
        
        {filteredClubs.length === 0 && (
           <div className="text-center py-12">
              <p className="text-zinc-500 text-sm">No clubs found in this category.</p>
           </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
