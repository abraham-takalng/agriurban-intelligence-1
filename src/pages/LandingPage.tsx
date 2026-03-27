import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Layers, BarChart, CheckCircle2, TrendingUp, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="relative">
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950"></div>
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{ 
              backgroundImage: `url('https://storage.googleapis.com/dala-prod-public-storage/generated-images/bcb3983b-ae83-4059-93ff-97cb2bb10dc2/hero-map-visualization-eee0377a-1773005863538.webp')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              mixBlendMode: 'overlay'
            }}>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold mb-6 tracking-widest uppercase">
                Prototype by Abraham Takalng
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-[0.9]">
                AGRIURBAN <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">INTELLIGENCE</span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-medium leading-relaxed mb-10">
                AI Powered Spatial Intelligence for Sustainable Land Management.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/map" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                  Explore Map <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/analytics" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all">
                  View Analytics
                </Link>
              </div>

              <div className="mt-16 p-6 rounded-2xl bg-slate-900/50 backdrop-blur border border-slate-800 max-w-lg mx-auto text-center">
                 <p className="text-slate-400 text-sm italic">Developed by Abraham Takalng - 3rd year GIS student</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'AI Land Suitability', icon: Layers, desc: 'Evaluation for agriculture.' },
              { title: 'Urban Growth', icon: TrendingUp, desc: 'Growth simulation.' },
              { title: 'Agri Mapping', icon: Sprout, desc: 'Farming potential.' },
              { title: 'Analytics', icon: BarChart, desc: 'Real-time dashboard.' },
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800">
                <f.icon className="w-6 h-6 text-indigo-500 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;