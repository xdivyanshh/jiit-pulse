import React, { useState, useRef } from 'react';
import { 
  Users, ExternalLink, ChevronRight, Calendar, Instagram, 
  Globe, Zap, Music, Code, Cpu, Terminal, Radio, Database, 
  Mic, Star, Video, Palette, MessageSquare, TrendingUp,
  Heart, Leaf, Trophy, X, Camera, Activity, BookOpen, Sun, HandHeart, Check, Loader2
} from 'lucide-react';

export default function ClubsHubs({ campus }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedClub, setExpandedClub] = useState(null);
  
  // Join Modal State
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joiningClub, setJoiningClub] = useState(null);
  const [joinFormData, setJoinFormData] = useState({
    name: '',
    course: '',
    semester: '',
    reason: '',
    contact: ''
  });
  const [joinStatus, setJoinStatus] = useState('idle'); // idle, submitting, success, error

  const openJoinModal = (club, e) => {
    e.stopPropagation(); // Prevent card expansion
    setJoiningClub(club);
    setIsJoinModalOpen(true);
    setJoinStatus('idle');
  };

  const closeJoinModal = () => {
    setIsJoinModalOpen(false);
    setJoiningClub(null);
    setJoinFormData({ name: '', course: '', semester: '', reason: '', contact: '' });
  };

  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    setJoinStatus('submitting');

    // --- DATABASE INTEGRATION POINT ---
    // This is where you would send the data to your database.
    // Example: await fetch('/api/join', { method: 'POST', body: JSON.stringify(joinFormData) });
    
    try {
      // Simulating network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Application Submitted:", { ...joinFormData, club: joiningClub?.name });
      
      setJoinStatus('success');
      setTimeout(() => {
        closeJoinModal();
      }, 2000);
    } catch (error) {
      setJoinStatus('error');
    }
  };

  const longPressTimerRef = useRef(null);

  const handlePressStart = (club) => {
    longPressTimerRef.current = setTimeout(() => {
      setExpandedClub(club);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(50); // Haptic feedback
      }
    }, 500); // 500ms hold time
  };

  const handlePressEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

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
      id: "jpeg",
      name: "JPEG",
      fullName: "Jaypee Photographic Enthusiasts Guild",
      description: "The official photography society. Conducts workshops on DSLR/editing, photo-walks, and exhibitions. Events include '30-30', 'Just Do It', and 'Snap Story'.",
      category: "Creative",
      members: "150+",
      events: "20+",
      icon: Camera,
      color: "from-cyan-500 to-blue-500",
      iconColor: "text-cyan-400"
    },
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
    {
      id: "expressions",
      name: "Expressions",
      fullName: "The Painting Hub",
      description: "The painting hub for creative expression on canvas. Hosts 'Live Art Gallery', 'Palette Punch', 'Bold Brush', and 'Caricature Booth'.",
      category: "Creative",
      members: "100+",
      events: "10+",
      icon: Palette,
      color: "from-violet-600 to-fuchsia-600",
      iconColor: "text-violet-400"
    },

    // --- Literary & Business ---
    {
      id: "kalakriti",
      name: "Kalakriti",
      fullName: "The Rangoli Hub",
      description: "Unleashes artistic creativity through Sand art, Rangoli, Junk Rangoli, Poster making, and Graffiti.",
      category: "Creative",
      members: "120+",
      events: "8+",
      icon: Sun,
      color: "from-orange-500 to-red-500",
      iconColor: "text-orange-400"
    },
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
      id: "pageturner",
      name: "Page Turner Society",
      fullName: "The Book Club",
      description: "Encourages reading culture through book exchanges, author meetups, and visits to book cafes. Events: 'Wordsmith Hunt', 'Bookapedia', and 'Hult Prize'.",
      category: "Literary",
      members: "80+",
      events: "6+",
      icon: BookOpen,
      color: "from-amber-500 to-orange-600",
      iconColor: "text-amber-500"
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
      id: "yoga",
      name: "Yoga Hub",
      fullName: "Yoga, Prahari & Health Hub",
      description: "Promotes holistic wellness (physical, emotional, spiritual). Conducts regular yoga sessions and 'Prahari' drug awareness campaigns via nukkad natak.",
      category: "Social",
      members: "50+",
      events: "Weekly",
      icon: Activity,
      color: "from-teal-500 to-green-500",
      iconColor: "text-teal-400"
    },
    {
      id: "itsourearth",
      name: "It’s Our Earth",
      fullName: "Social & Environmental Hub",
      description: "Fosters student empowerment for social and environmental development. Organizes Tree Plantation drives, Donation camps, and 'Say No to Drugs' campaigns.",
      category: "Social",
      members: "120+",
      events: "8+",
      icon: Globe,
      color: "from-emerald-500 to-cyan-500",
      iconColor: "text-emerald-400"
    },
    {
      id: "adwitya",
      name: "Adwitya",
      fullName: "Service to Specially-Abled",
      description: "Extends services to specially-abled persons. Imparts skills like basic computer education, maths, and creative skills. Conducts awareness programs.",
      category: "Social",
      members: "80+",
      events: "5+",
      icon: HandHeart,
      color: "from-sky-500 to-blue-500",
      iconColor: "text-sky-400"
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
            className="group relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-3xl p-5 overflow-hidden hover:bg-zinc-900/60 transition-all duration-300 active:scale-[0.98] select-none"
            style={{
              animation: `slideUp 0.5s ease-out ${index * 0.1}s both`
            }}
            onMouseDown={() => handlePressStart(club)}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={() => handlePressStart(club)}
            onTouchEnd={handlePressEnd}
            onTouchMove={handlePressEnd}
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
                 <button 
                    onClick={(e) => openJoinModal(club, e)}
                    className={`py-2.5 rounded-xl ${btnBg} text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${shadowColor}`}
                 >
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

      {/* Expanded Club Modal */}
      {expandedClub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setExpandedClub(null)}>
          <div className="bg-zinc-900 border border-white/10 rounded-3xl w-full max-w-sm max-h-[80vh] flex flex-col shadow-2xl overflow-hidden relative" onClick={e => e.stopPropagation()}>
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${expandedClub.color} opacity-5 pointer-events-none`}></div>
            
            <div className="p-5 border-b border-white/5 bg-zinc-900/50 flex justify-between items-center relative z-10">
               <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-zinc-800/50 border border-white/5 flex items-center justify-center ${expandedClub.iconColor}`}>
                     <expandedClub.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-none">{expandedClub.name}</h3>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{expandedClub.category}</span>
                  </div>
               </div>
               <button onClick={() => setExpandedClub(null)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                  <X size={18} className="text-zinc-400" />
               </button>
            </div>

            <div className="p-6 overflow-y-auto no-scrollbar relative z-10 space-y-6">
               <div>
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">About</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {expandedClub.description}
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center">
                     <div className="text-2xl font-bold text-white mb-1">{expandedClub.members}</div>
                     <div className="text-[10px] text-zinc-500 uppercase font-bold">Active Members</div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center">
                     <div className="text-2xl font-bold text-white mb-1">{expandedClub.events}</div>
                     <div className="text-[10px] text-zinc-500 uppercase font-bold">Annual Events</div>
                  </div>
               </div>

               <button className={`w-full py-3 rounded-xl ${is128 ? 'bg-rose-600 hover:bg-rose-500' : 'bg-indigo-600 hover:bg-indigo-500'} text-white font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2`}>
                  Visit Club Page <ExternalLink className="w-4 h-4" />
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Join Club Modal */}
      {isJoinModalOpen && joiningClub && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={closeJoinModal}>
          <div className="bg-zinc-900 border border-white/10 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
            
            {/* Header */}
            <div className={`p-6 border-b border-white/5 ${is128 ? 'bg-rose-950/30' : 'bg-indigo-950/30'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white">Join {joiningClub.name}</h3>
                  <p className="text-zinc-400 text-xs mt-1">Fill in your details to apply</p>
                </div>
                <button onClick={closeJoinModal} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-zinc-400 hover:text-white">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 overflow-y-auto no-scrollbar">
              {joinStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center py-8 text-center space-y-4 animate-in zoom-in duration-300">
                  <div className={`w-16 h-16 rounded-full ${is128 ? 'bg-rose-500/20 text-rose-500' : 'bg-indigo-500/20 text-indigo-500'} flex items-center justify-center mb-2`}>
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Application Sent!</h4>
                  <p className="text-zinc-400 text-sm max-w-xs leading-relaxed">
                    Your request to join <span className="text-white font-medium">{joiningClub.name}</span> has been submitted. The club admins will contact you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleJoinSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Full Name</label>
                    <input 
                      required
                      type="text"
                      value={joinFormData.name}
                      onChange={e => setJoinFormData({...joinFormData, name: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-zinc-700"
                      placeholder="e.g. Aryan Sharma"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Course</label>
                      <select 
                        required
                        value={joinFormData.course}
                        onChange={e => setJoinFormData({...joinFormData, course: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors appearance-none"
                      >
                        <option value="" disabled>Select</option>
                        <option value="B.Tech">B.Tech</option>
                        <option value="BCA">BCA</option>
                        <option value="BBA">BBA</option>
                        <option value="M.Tech">M.Tech</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Semester</label>
                      <select 
                        required
                        value={joinFormData.semester}
                        onChange={e => setJoinFormData({...joinFormData, semester: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors appearance-none"
                      >
                        <option value="" disabled>Select</option>
                        {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Contact (Phone/Email)</label>
                    <input 
                      required
                      type="text"
                      value={joinFormData.contact}
                      onChange={e => setJoinFormData({...joinFormData, contact: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-zinc-700"
                      placeholder="e.g. 9876543210"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Why do you want to join? <span className="text-zinc-600 normal-case font-normal">(Optional)</span></label>
                    <textarea 
                      rows={3}
                      value={joinFormData.reason}
                      onChange={e => setJoinFormData({...joinFormData, reason: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-zinc-700 resize-none"
                      placeholder="Tell us briefly about your interest..."
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={joinStatus === 'submitting'}
                    className={`w-full py-3.5 rounded-xl ${is128 ? 'bg-rose-600 hover:bg-rose-500' : 'bg-indigo-600 hover:bg-indigo-500'} text-white font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {joinStatus === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}