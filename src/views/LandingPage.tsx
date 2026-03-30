import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ChevronDown, 
  Zap, 
  Map as MapIcon, 
  PieChart, 
  ShieldCheck, 
  BrainCircuit,
  MousePointer2
} from 'lucide-react';
import { Page } from '../App';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/bcb3983b-ae83-4059-93ff-97cb2bb10dc2/hero-map-overlay-7ceb5273-1773006204304.webp"
            alt="Futuristic GIS Map"
            className="w-full h-full object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/40 to-neutral-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Next-Gen Spatial AI</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
              AgriUrban <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-emerald-400 to-emerald-600 italic">
                Intelligence
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-neutral-300 mb-10 leading-relaxed max-w-2xl font-light">
              AI Powered Spatial Intelligence for Sustainable Land Management in <span className="text-white font-medium border-b border-emerald-500/30">Bale Robe</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 mb-16">
              <button 
                onClick={() => onNavigate('map')}
                className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-2xl text-lg font-bold text-white shadow-2xl shadow-cyan-500/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all group"
              >
                Explore Map
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => onNavigate('dashboard')}
                className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-lg font-bold text-neutral-100 backdrop-blur-md flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
              >
                View Analytics
              </button>
              <button 
                onClick={() => onNavigate('subscription')}
                className="px-8 py-4 bg-transparent border-b-2 border-white/10 hover:border-cyan-500/50 rounded-none text-lg font-bold text-neutral-400 hover:text-cyan-400 transition-all"
              >
                Start Trial
              </button>
            </div>

            <div className="flex items-center gap-4 text-neutral-500 border-l-2 border-cyan-500/30 pl-6 py-2">
              <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-neutral-900 bg-neutral-800 flex items-center justify-center text-[10px] font-bold">
                    User
                  </div>
                ))}
              </div>
              <p className="text-sm">
                Trusted by 500+ researchers & city planners worldwide.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-500 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll to discover</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </section>

      {/* Attribution Banner */}
      <section className="bg-neutral-900 py-8 border-y border-white/5">
        <div className="container mx-auto px-6 text-center">
          <p className="text-neutral-400 font-medium">
            Prototype developed by <span className="text-cyan-400 font-bold">Abraham Takalng</span> — 3rd year GIS student
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Cutting Edge <span className="text-cyan-400">Spatial Tech</span></h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Harnessing the power of Sentinel-2 satellite data and custom ML algorithms to redefine urban development and agriculture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BrainCircuit,
                title: "AI Suitability Analysis",
                desc: "Advanced neural networks analyzing soil, water, and topology for optimal land use.",
                color: "cyan"
              },
              {
                icon: MapIcon,
                title: "Urban Growth Prediction",
                desc: "Cellular Automata simulations predicting Bale Robe's expansion up to 2035.",
                color: "emerald"
              },
              {
                icon: Zap,
                title: "Spatial Intelligence",
                desc: "Real-time distance metrics to infrastructure, roads, and water resources.",
                color: "blue"
              },
              {
                icon: ShieldCheck,
                title: "Precision Accuracy",
                desc: "WGS84 / UTM Zone 37N aligned datasets derived from official satellite imagery.",
                color: "indigo"
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-neutral-900/50 border border-white/5 backdrop-blur-xl group hover:border-cyan-500/30 transition-all"
              >
                <div className={`w-14 h-14 rounded-2xl bg-${feature.color}-500/10 flex items-center justify-center mb-8 border border-${feature.color}-500/20 group-hover:bg-${feature.color}-500 group-hover:text-white transition-all`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color}-400 group-hover:text-inherit`} />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-neutral-500 leading-relaxed group-hover:text-neutral-300 transition-colors">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Preview Section */}
      <section className="py-32 bg-neutral-900/30 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                Designed for <br />
                <span className="text-emerald-400">The Modern Analyst</span>
              </h2>
              <ul className="space-y-6 mb-10">
                {[
                  "Interactive multi-layer map visualization",
                  "Automated Land Cover classification (Sentinel-2)",
                  "Investment suitability index calculation",
                  "Draw-to-Analyze spatial reporting tool"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Zap className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-neutral-300 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => onNavigate('map')}
                className="px-10 py-4 bg-white text-neutral-950 font-bold rounded-2xl hover:bg-neutral-200 transition-colors"
              >
                Launch Map Viewer
              </button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500 to-emerald-500 opacity-20 blur-3xl rounded-full" />
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/bcb3983b-ae83-4059-93ff-97cb2bb10dc2/analytics-dashboard-preview-ebee8665-1773006202776.webp" 
                  alt="Platform Dashboard Preview" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-neutral-950/20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 cursor-pointer">
                      <MousePointer2 className="w-8 h-8 text-white fill-white" />
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Purpose */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/5 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl rounded-full" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full" />
             
             <h2 className="text-3xl lg:text-4xl font-bold mb-8">Study Area: Bale Robe, Ethiopia</h2>
             <p className="text-neutral-400 text-lg leading-relaxed mb-10">
                Focusing on the unique geospatial dynamics of Bale Robe Town. This prototype demonstrates how spatial analysis and AI can solve real-world land management challenges in Ethiopia, from urban sprawl to agricultural optimization.
             </p>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Region", val: "Bale Zone" },
                  { label: "CRS", val: "UTM 37N" },
                  { label: "Data", val: "Sentinel-2" },
                  { label: "Focus", val: "Agri-Urban" },
                ].map((stat, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1">{stat.label}</div>
                    <div className="text-white font-bold">{stat.val}</div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;