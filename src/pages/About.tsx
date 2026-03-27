import React from 'react';
import { Globe, Shield, Database, GraduationCap, Github, Linkedin, MessageSquare, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { CONTACT_INFO } from '../lib/constants';

const About = () => {
  return (
    <div className="pt-20 px-6 min-h-screen bg-slate-950 pb-20">
      <div className="max-w-4xl mx-auto mt-12">
        <div className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
          >
            AGRIURBAN INTELLIGENCE
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 leading-relaxed font-medium"
          >
            A cutting-edge AI-powered GIS platform dedicated to Bale Robe Town, Ethiopia. 
            Integrating remote sensing, spatial analysis, and predictive modeling for a resilient future.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="p-8 bg-slate-900 border border-slate-800 rounded-3xl relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/10 rounded-full -translate-y-16 translate-x-16 blur-2xl group-hover:bg-emerald-600/20 transition-all" />
             <GraduationCap size={40} className="text-emerald-500 mb-6" />
             <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Academic Attribution</h3>
             <h2 className="text-3xl font-bold text-white mb-2">Abraham Takalng</h2>
             <p className="text-emerald-400 font-bold mb-8 text-lg">3rd Year GIS Student</p>
             
             <div className="flex gap-4">
               <a href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-950 rounded-xl hover:text-emerald-400 transition-colors border border-slate-800">
                 <Github size={20} />
               </a>
               <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-950 rounded-xl hover:text-emerald-400 transition-colors border border-slate-800">
                 <Linkedin size={20} />
               </a>
               <a href={CONTACT_INFO.telegram} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-950 rounded-xl hover:text-emerald-400 transition-colors border border-slate-800">
                 <MessageSquare size={20} />
               </a>
               <a href={`mailto:${CONTACT_INFO.email}`} className="p-3 bg-slate-950 rounded-xl hover:text-emerald-400 transition-colors border border-slate-800">
                 <Mail size={20} />
               </a>
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-8"
          >
             <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Project Context</h3>
             <div className="space-y-6">
                <div className="flex items-start gap-4">
                   <div className="p-3 bg-emerald-600/10 rounded-xl border border-emerald-500/20">
                    <Globe className="w-5 h-5 text-emerald-500" />
                   </div>
                   <div>
                      <h4 className="text-sm font-bold text-white">Bale Robe Town</h4>
                      <p className="text-xs text-slate-400">Primary Study Area - Oromia, Ethiopia</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="p-3 bg-emerald-600/10 rounded-xl border border-emerald-500/20">
                    <Shield className="w-5 h-5 text-emerald-500" />
                   </div>
                   <div>
                      <h4 className="text-sm font-bold text-white">Spatial Accuracy</h4>
                      <p className="text-xs text-slate-400">Validated via Sentinel-2 (10m) & DEM (12.5m) Data</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="p-3 bg-emerald-600/10 rounded-xl border border-emerald-500/20">
                    <Database className="w-5 h-5 text-emerald-500" />
                   </div>
                   <div>
                      <h4 className="text-sm font-bold text-white">Coordinate Reference</h4>
                      <p className="text-xs text-slate-400">WGS84 / UTM Zone 37N (EPSG:32637)</p>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-12 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-[3rem] text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Mission</h2>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed italic">
            "To leverage open-source geospatial intelligence in creating safer, more sustainable urban environments through data-driven decision making."
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;