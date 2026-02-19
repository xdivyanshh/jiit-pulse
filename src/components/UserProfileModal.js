import React, { useState, useEffect } from 'react';
import { X, Save, UserCircle } from 'lucide-react';
import { getStudentProfile, saveStudentProfile } from '../utils/studentProfile';

export default function UserProfileModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    campus: '128',
    batch: ''
  });

  useEffect(() => {
    if (isOpen) {
      const saved = getStudentProfile();
      if (saved) setFormData(saved);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveStudentProfile(formData);
    if (onSave) onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center">
            <UserCircle className="w-6 h-6 text-rose-500" />
          </div>
          <h2 className="text-xl font-bold text-white">Student Profile</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase mb-1.5">Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-500 transition-colors placeholder:text-zinc-600"
              placeholder="Enter your name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 uppercase mb-1.5">Campus</label>
              <select 
                value={formData.campus}
                onChange={(e) => setFormData({...formData, campus: e.target.value})}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-500 appearance-none"
              >
                <option value="128">Sector 128</option>
                <option value="62">Sector 62</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 uppercase mb-1.5">Batch</label>
              <input 
                type="text" 
                value={formData.batch}
                onChange={(e) => setFormData({...formData, batch: e.target.value.toUpperCase()})}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-500 placeholder:text-zinc-600"
                placeholder="e.g. F6"
              />
            </div>
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save & Continue
            </button>
            <p className="text-center text-xs text-zinc-500 mt-3">
              Your details are stored locally on your device.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}