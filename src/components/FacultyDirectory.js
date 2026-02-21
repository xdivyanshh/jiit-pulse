import React, { useState } from 'react';
import { Search, User, Mail, BookOpen, X, ExternalLink } from 'lucide-react';

export default function FacultyDirectory({ facultyData, campus }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  // Helper to normalize data (supports both string and object formats)
  const getFacultyInfo = (initials, data) => {
    if (typeof data === 'string') {
      return {
        id: initials,
        name: data,
        designation: "Faculty",
        department: null,
        email: null,
        image: null,
        areaOfInterest: null
      };
    }
    return { id: initials, ...data };
  };

  const filteredFaculty = Object.entries(facultyData)
    .map(([initials, data]) => getFacultyInfo(initials, data))
    .filter(faculty => 
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faculty.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (faculty.department && faculty.department.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="sticky top-20 z-40 bg-black/50 backdrop-blur-md p-2 rounded-2xl border border-white/10 flex items-center gap-2">
        <Search className="w-5 h-5 text-zinc-500 ml-2" />
        <input 
          type="text"
          placeholder="Search professors (e.g. RKG or Radha)"
          className="bg-transparent w-full text-zinc-200 outline-none text-sm placeholder:text-zinc-600 h-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* List */}
      <div className="space-y-2 pb-24">
        {filteredFaculty.length > 0 ? (
          filteredFaculty.map((faculty) => (
            <button 
              key={faculty.id} 
              onClick={() => setSelectedFaculty(faculty)}
              className="w-full bg-zinc-900/50 p-4 rounded-xl border border-white/5 flex items-center gap-4 hover:bg-zinc-900 transition-all active:scale-[0.98] text-left group"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold border border-white/5 overflow-hidden shrink-0">
                {faculty.image ? (
                  <img src={faculty.image} alt={faculty.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{faculty.id}</span>
                )}
              </div>
              <div>
                <h3 className="text-zinc-200 font-medium group-hover:text-white transition-colors">{faculty.name}</h3>
                <p className="text-xs text-zinc-500 uppercase tracking-wider">{faculty.designation}</p>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center py-10 text-zinc-600">
            No faculty found matching "{searchTerm}"
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedFaculty(null)}>
          <div className="bg-zinc-900 border border-white/10 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative" onClick={e => e.stopPropagation()}>
            
            {/* Header Background */}
            <div className={`h-24 bg-gradient-to-r ${campus === '128' ? 'from-rose-600 to-purple-600' : 'from-indigo-600 to-purple-600'} relative`}>
               <button 
                onClick={() => setSelectedFaculty(null)} 
                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white/80 hover:text-white transition-colors backdrop-blur-md"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 pb-6 -mt-12 relative">
              {/* Profile Image */}
              <div className="w-24 h-24 rounded-full bg-zinc-900 p-1.5 mx-auto mb-4 shadow-xl">
                <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 text-2xl font-bold border border-white/5 overflow-hidden">
                   {selectedFaculty.image ? (
                      <img src={selectedFaculty.image} alt={selectedFaculty.name} className="w-full h-full object-cover" />
                    ) : (
                      selectedFaculty.id
                    )}
                </div>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-white mb-1">{selectedFaculty.name}</h2>
                <p className={`text-sm ${campus === '128' ? 'text-rose-400' : 'text-indigo-400'} font-medium`}>{selectedFaculty.designation}</p>
                <p className="text-xs text-zinc-500">{selectedFaculty.department}</p>
              </div>

              <div className="space-y-3">
                {selectedFaculty.email && (
                  <a href={`mailto:${selectedFaculty.email}`} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group">
                    <div className={`p-2 rounded-lg ${campus === '128' ? 'bg-rose-500/10 text-rose-400 group-hover:bg-rose-500' : 'bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500'} group-hover:text-white transition-colors`}>
                      <Mail size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Email</p>
                      <p className="text-sm text-zinc-300 truncate">{selectedFaculty.email}</p>
                    </div>
                  </a>
                )}

                {selectedFaculty.areaOfInterest && (
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 mt-0.5">
                      <BookOpen size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mb-0.5">Area of Interest</p>
                      <p className="text-sm text-zinc-300 leading-relaxed">{selectedFaculty.areaOfInterest}</p>
                    </div>
                  </div>
                )}
                
                {/* Search Link */}
                <a 
                  href={`https://www.google.com/search?q=${encodeURIComponent(selectedFaculty.name + " JIIT Faculty")}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 mt-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium text-sm transition-colors"
                >
                  Search Profile on Web <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}