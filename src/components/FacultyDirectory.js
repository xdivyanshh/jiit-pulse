import React, { useState } from 'react';
import { Search, User } from 'lucide-react';
import { facultyData } from '../data/faculty';

export default function FacultyDirectory() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaculty = Object.entries(facultyData).filter(([initials, name]) => 
    name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    initials.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="space-y-2">
        {filteredFaculty.length > 0 ? (
          filteredFaculty.map(([initials, name]) => (
            <div key={initials} className="bg-zinc-900/50 p-4 rounded-xl border border-white/5 flex items-center gap-4 hover:bg-zinc-900 transition-colors">
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold border border-white/5">
                {initials}
              </div>
              <div>
                <h3 className="text-zinc-200 font-medium">{name}</h3>
                <p className="text-xs text-zinc-500 uppercase tracking-wider">Faculty</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-zinc-600">
            No faculty found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
}