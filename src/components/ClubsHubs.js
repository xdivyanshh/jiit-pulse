import React, { useState } from 'react';
import { 
  Users, ExternalLink, ChevronRight, Calendar, Instagram, 
  Globe, Zap, Music, Code, Cpu, Terminal, Radio, Database, 
  Mic, Star, Video, Palette, MessageSquare, TrendingUp, 
  Heart, Leaf, Trophy 
} from 'lucide-react';

export default function ClubsHubs({ campus }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const clubs = [
    // --- Technical: Coding & Dev ---
    {
      id: "knuth",
      name: "Knuth",
      fullName: "The Programming Hub",
      description: "The central coding community for CSE/IT at Sector 62. Organizes 'Code Class Noob', 'Execute', and 'The KNUTH Cup'. Focuses on ACM-ICPC and algorithmic thinking.",
      category: "Technical",
      members: "600+",
      events: "20+",
      icon: Terminal,
      color: "from-emerald-500 to-teal-500",
      iconColor: "text-emerald-400"
    },
    {
      id: "bitwise",
      name: "Bit-Wise",
      fullName: "The Bit-Wise Programming Club",
      description: "Dedicated to competitive programming and DSA at Sector 128. Organizes weekly code classes and the high-pressure 'KODEATHON'.",
      category: "Technical",
      members: "400+",
      events: "15+",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      iconColor: "text-blue-400"
    },
    {
      id: "gdsc",
      name: "GDSC",
      fullName: "Google Developer Student Clubs",
      description: "Google-recognized community. Focuses on Web/App dev, Cloud, and Gen AI. Hosts '30 Days of Google Cloud' and 'Solution Challenge'.",
      category: "Technical",
      members: "500+",
      events: "12+",
      icon: Globe,
      color: "from-red-500 to-yellow-500",
      iconColor: "text-red-400"
    },
    {
      id: "osdc",
      name: "OSDC",
      fullName: "Open Source Developers Community",
      description: "Lives and breathes open source. 'No gatekeeping' policy. Hosts 'Linux Installfests', 'CodeJam', and 'Hack Nights'.",
      category: "Technical",
      members: "350+",
      events: "10+",
      icon: Users,
      color: "from-orange-500 to-pink-500",
      iconColor: "text-orange-400"
    },
    
    // --- Technical: Hardware & Electronics ---
    {
      id: "ucr",
      name: "uCR",
      fullName: "Microcontroller Based System and Robotics Hub",
      description: "Sanctuary for hardware enthusiasts. 'Building the future' with Arduino, sensors, and automation. Organizes inter-college robotics battles.",
      category: "Technical",
      members: "300+",
      events: "8+",
      icon: Cpu,
      color: "from-indigo-500 to-purple-500",
      iconColor: "text-indigo-400"
    },
    {
      id: "cice",
      name: "CICE",
      fullName: "Creativity and Innovation Cell in Electronics",
      description: "Demystifies analogue/digital electronics. PCB Fabrication, MATLAB workshops. Flagship event: 'Electro Vision'.",
      category: "Technical",
      members: "200+",
      events: "6+",
      icon: Radio,
      color: "from-yellow-500 to-orange-500",
      iconColor: "text-yellow-400"
    },

    // --- Technical: Specialized & Professional ---
    {
      id: "ieee",
      name: "IEEE",
      fullName: "IEEE Student Branch",
      description: "World’s largest technical professional org. Hosts 'Xenith', 'Enigma', and humanitarian engineering via IEEE SIGHT.",
      category: "Technical",
      members: "450+",
      events: "10+",
      icon: Globe,
      color: "from-blue-600 to-indigo-600",
      iconColor: "text-blue-500"
    },
    {
      id: "acm",
      name: "ACM",
      fullName: "Association for Computing Machinery",
      description: "Focuses on advanced computing, IoT, and Data Science. Hosts 'Lady Ada' programming contest for women.",
      category: "Technical",
      members: "250+",
      events: "8+",
      icon: Database,
      color: "from-sky-500 to-blue-500",
      iconColor: "text-sky-400"
    },
    {
      id: "aiml",
      name: "AI/ML Hub",
      fullName: "Artificial Intelligence and Machine Learning Hub",
      description: "Dedicated to innovation in AI, ML, and Data Science. Leverages the 'Ramanujan Universe' supercomputing facility.",
      category: "Technical",
      members: "200+",
      events: "5+",
      icon: Cpu,
      color: "from-violet-500 to-fuchsia-500",
      iconColor: "text-violet-400"
    },

    // --- Cultural: Performing Arts ---
    {
      id: "jhankaar",
      name: "Jhankaar",
      fullName: "The Dance Hub",
      description: "The official dance club. Includes 'Music Made Visible' (Western), 'Nrityang' (Classical), and 'Surkhaab' (Bhangra).",
      category: "Cultural",
      members: "150+",
      events: "10+",
      icon: Zap,
      color: "from-rose-500 to-pink-600",
      iconColor: "text-rose-400"
    },
    {
      id: "crescendo",
      name: "Crescendo",
      fullName: "The Music Hub",
      description: "Unites students through music. Hosts 'Unplugged', 'Euphonium', and 'Voice of Impressions'.",
      category: "Cultural",
      members: "120+",
      events: "8+",
      icon: Music,
      color: "from-purple-500 to-pink-500",
      iconColor: "text-purple-400"
    },
    {
      id: "thespian",
      name: "Thespian Circle",
      fullName: "Dramatics Society",
      description: "Social reform through theatrical art. Performs stage plays and street plays (Nukkad Natak).",
      category: "Cultural",
      members: "100+",
      events: "12+",
      icon: Mic,
      color: "from-red-500 to-orange-500",
      iconColor: "text-red-400"
    },
    {
      id: "radiance",
      name: "Radiance",
      fullName: "Fashion and Event Management Hub",
      description: "Manages high-profile stage events and fashion showcases like 'Theme Walk' and 'Mr. & Miss Impressions'.",
      category: "Cultural",
      members: "80+",
      events: "5+",
      icon: Star,
      color: "from-yellow-400 to-orange-400",
      iconColor: "text-yellow-400"
    },

    // --- Creative & Visual Arts ---
    {
      id: "icreate",
      name: "iCreate",
      fullName: "Multimedia Development Hub",
      description: "Graphic design, VFX, and animation. Training in Photoshop, Flash, and video editing.",
      category: "Creative",
      members: "100+",
      events: "6+",
      icon: Video,
      color: "from-green-400 to-emerald-500",
      iconColor: "text-green-400"
    },
    {
      id: "graficas",
      name: "Graficas",
      fullName: "Graphic Design and Visual Arts",
      description: "The creative engine for the university. Designs promotional materials and digital art installations.",
      category: "Creative",
      members: "80+",
      events: "5+",
      icon: Palette,
      color: "from-pink-400 to-rose-500",
      iconColor: "text-pink-400"
    },

    // --- Literary & Business ---
    {
      id: "parola",
      name: "Parola",
      fullName: "The Literary Hub",
      description: "Debating, extempore, and MUNs. Organizes the 'Jaypee Youth Parliament'.",
      category: "Literary",
      members: "150+",
      events: "10+",
      icon: MessageSquare,
      color: "from-blue-400 to-indigo-500",
      iconColor: "text-blue-400"
    },
    {
      id: "business",
      name: "Business Hub",
      fullName: "Economics and Business Hub",
      description: "Cultivates business acumen. Hosts 'Manager of the Year' and 'Business Buzz'.",
      category: "Literary",
      members: "100+",
      events: "8+",
      icon: TrendingUp,
      color: "from-slate-500 to-zinc-500",
      iconColor: "text-slate-400"
    },

    // --- Social & Environment ---
    {
      id: "nss",
      name: "NSS",
      fullName: "National Service Scheme",
      description: "Social welfare and community service. Pillars: Compassion, Health, Education, and Awareness.",
      category: "Social",
      members: "1000+",
      events: "25+",
      icon: Heart,
      color: "from-red-600 to-rose-600",
      iconColor: "text-red-500"
    },
    {
      id: "ecoquence",
      name: "EcoQuence",
      fullName: "The Environment Hub",
      description: "Focuses on ecological responsibility and sustainable campus living.",
      category: "Social",
      members: "100+",
      events: "5+",
      icon: Leaf,
      color: "from-green-500 to-lime-500",
      iconColor: "text-green-400"
    },

    // --- Sports ---
    {
      id: "sports",
      name: "Sports Hub",
      fullName: "The Sports Hub",
      description: "Manages athletic infrastructure and organizes the annual 'Fun Sports Meet'.",
      category: "Sports",
      members: "2000+",
      events: "1+",
      icon: Trophy,
      color: "from-orange-500 to-red-500",
      iconColor: "text-orange-400"
    }
  ];

  const categories = ['All', 'Technical', 'Cultural', 'Literary', 'Social', 'Sports', 'Creative'];
  
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