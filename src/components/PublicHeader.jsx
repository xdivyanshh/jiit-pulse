import React from 'react';
import { Activity } from 'lucide-react';

export default function PublicHeader() {
  return (
    <div className="w-full flex justify-center py-6">
      <div className="flex items-center gap-2">
        <div className="bg-rose-600 p-2 rounded-xl">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">JIIT Pulse</h1>
      </div>
    </div>
  );
}