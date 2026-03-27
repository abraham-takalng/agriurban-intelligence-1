import React from 'react';
import { Mail, Github, ExternalLink, GraduationCap, MapPin, Database, Server, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="pt-28 pb-32 px-6 max-w-5xl mx-auto">
      <div className="relative mb-24 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyan-500/5 blur-[120px] rounded-full -z-10" />
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-white/10 mb-8 shadow-xl">
           <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
           <span className="text-xs font-bold text-neutral-300">PLATFORM PROTOTYPE V1.0</span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-black mb-10 tracking-tighter leading-[1.1]">
          About the <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">AgriUrban Project</span>
        </h1>
        <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
          Designed to demonstrate the powerful integration of Artificial Intelligence and Geographic Information Systems in solving real-world land management challenges in Ethiopia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <div className="space-y-8">
           <h2 className="text-3xl font-bold flex items-center gap-3">
             <GraduationCap className="w-8 h-8 text-cyan-400" />
             The Vision
           </h2>
           <p className="text-neutral-400 leading-relaxed">
             This prototype focuses on Bale Robe Town, Bale Zone, Ethiopia. Using real geospatial data derived from Sentinel-2 imagery, it simulates a commercial geospatial intelligence service that supports sustainable urban expansion and agricultural optimization.
           </p>
           <div className="p-8 bg-neutral-900 border border-white/5 rounded-[2.5rem] relative group">
              <div className="absolute -top-4 -right-4 p-4 bg-cyan-500 rounded-2xl shadow-xl shadow-cyan-500/20 scale-90 group-hover:scale-100 transition-transform">
                <span className="text-neutral-950 font-black text-xs">UTM ZONE 37N</span>
              </div>
              <h3 className="font-bold text-lg mb-4">Study Area Specifications</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-neutral-400">
                  <MapPin className="w-4 h-4 text-cyan-500" />
                  Bale Robe Town, Ethiopia
                </li>
                <li className="flex items-center gap-3 text-sm text-neutral-400">
                  <Database className="w-4 h-4 text-cyan-500" />
                  Sentinel-2 Satellite Data
                </li>
                <li className="flex items-center gap-3 text-sm text-neutral-400">
                  <Server className="w-4 h-4 text-cyan-500" />
                  WGS84 Coordinate System
                </li>
              </ul>
           </div>
        </div>

        <div className="space-y-8">
           <h2 className="text-3xl font-bold flex items-center gap-3">
             <Code2 className="w-8 h-8 text-emerald-400" />
             The Creator
           </h2>
           <div className="p-10 bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/5 rounded-[3rem] text-center">
              <div className="w-24 h-24 bg-gradient-to-tr from-cyan-600 to-emerald-600 rounded-3xl mx-auto mb-6 flex items-center justify-center text-4xl font-black text-white shadow-2xl">
                AT
              </div>
              <h3 className="text-2xl font-black mb-1">Abraham Takalng</h3>
              <p className="text-cyan-400 font-bold text-sm mb-6">3rd Year GIS Student</p>
              <p className="text-neutral-500 text-sm leading-relaxed mb-8">
                 Passionate about GIS development, AI engineering, and geospatial data science. This platform is a culmination of spatial intelligence research and full-stack software architecture.
              </p>
              <div className="flex justify-center gap-4">
                <a href="mailto:takalngabraham@gmail.com" className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-bold transition-all flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact
                </a>
                <a href="#" className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-bold transition-all flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </div>
           </div>
        </div>
      </div>

      <div className="p-12 bg-neutral-900 border border-white/5 rounded-[3rem] text-center">
         <h2 className="text-2xl font-bold mb-8 uppercase tracking-[0.2em] text-neutral-500">Technology Stack</h2>
         <div className="flex flex-wrap justify-center gap-8">
            {['React 19', 'Next.js', 'FastAPI', 'PostGIS', 'Leaflet', 'Sentinel-2', 'Scikit-Learn'].map(tech => (
              <span key={tech} className="px-4 py-2 bg-neutral-950 border border-white/10 rounded-xl text-sm font-medium text-neutral-300">
                {tech}
              </span>
            ))}
         </div>
         <p className="mt-12 text-xs text-neutral-600 uppercase tracking-widest font-bold">
           Developed as a technical prototype demo • 2026
         </p>
      </div>
    </div>
  );
};

export default About;