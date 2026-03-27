import React from 'react';
import { Globe, Shield, Database, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-20 px-6 min-h-screen bg-slate-950 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">AGRIURBAN INTELLIGENCE</h1>
          <p className="text-xl text-slate-400 leading-relaxed font-medium">
            AI-powered GIS platform for Bale Robe Town, Ethiopia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl relative overflow-hidden">
             <GraduationCap size={40} className="text-indigo-500 mb-4" />
             <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Academic Attribution</h3>
             <h2 className="text-2xl font-bold text-white mb-2">Developed by Abraham Takalng</h2>
             <p className="text-indigo-400 font-bold mb-6">3rd Year GIS Student</p>
             <p className="text-slate-400 text-sm">takalngabraham@gmail.com</p>
          </div>

          <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
             <div className="space-y-6">
                <div className="flex items-start gap-4">
                   <Globe className="w-5 h-5 text-indigo-500" />
                   <div>
                      <h4 className="text-sm font-bold text-white">Bale Robe Town</h4>
                      <p className="text-xs text-slate-400">Ethiopia</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <Shield className="w-5 h-5 text-indigo-500" />
                   <div>
                      <h4 className="text-sm font-bold text-white">Coordinate System</h4>
                      <p className="text-xs text-slate-400">WGS84 / UTM Zone 37N</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;