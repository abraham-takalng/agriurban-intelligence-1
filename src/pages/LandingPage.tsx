import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Layers, BarChart, CheckCircle2, TrendingUp, Sprout, ShieldAlert, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="relative">
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950"></div>
          <div className="absolute inset-0 opacity-15 pointer-events-none" 
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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-8 tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Prototype by Abraham Takalng
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
                AGRIURBAN <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">INTELLIGENCE</span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-2xl text-slate-400 font-medium leading-relaxed mb-12">
                Pioneering AI-powered spatial intelligence for disaster resilience, agricultural optimization, and sustainable urban growth.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Link to="/map" className="w-full sm:w-auto px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-emerald-900/20 hover:scale-105 active:scale-95 group">
                  Explore Interactive Map <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/disaster-intel" className="w-full sm:w-auto px-10 py-5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all">
                  <ShieldAlert size={20} className="text-emerald-500" /> Disaster Risk Portal
                </Link>
              </div>

              <div className="mt-16 p-6 rounded-2xl bg-slate-900/40 backdrop-blur border border-slate-800 max-w-lg mx-auto">
                 <p className="text-slate-500 text-sm font-medium">Developed by <span className="text-emerald-400">Abraham Takalng</span> - 3rd year GIS student</p>
                 <p className="text-slate-600 text-[10px] uppercase tracking-tighter mt-1 font-bold">Study Area: Bale Robe Town, Ethiopia</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Comprehensive <span className="text-emerald-500">Spatial Solutions</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Leveraging multi-source geospatial data to solve complex local challenges.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: 'Flood Analysis', 
                icon: ShieldAlert, 
                desc: 'Real-time hydrological modeling using high-resolution DEMs and weather APIs.',
                link: '/disaster-intel',
                color: 'text-blue-400'
              },
              { 
                title: 'Drought Monitoring', 
                icon: Sprout, 
                desc: 'Satellite imagery analysis (NDVI) and soil moisture sensing for crop protection.',
                link: '/disaster-intel',
                color: 'text-orange-400'
              },
              { 
                title: 'Urban Growth', 
                icon: TrendingUp, 
                desc: 'Predictive simulations of city expansion to prevent unplanned urban sprawl.',
                link: '/ai-predict',
                color: 'text-purple-400'
              },
              { 
                title: 'Investment Index', 
                icon: BarChart, 
                desc: 'Identify high-value land parcels based on infrastructure proximity scores.',
                link: '/investment',
                color: 'text-emerald-400'
              },
              { 
                title: 'Preparedness Guides', 
                icon: Navigation, 
                desc: 'Educational resources and community readiness tools for hazard mitigation.',
                link: '/preparedness',
                color: 'text-cyan-400'
              },
              { 
                title: 'AI Map Explorer', 
                icon: Globe, 
                desc: 'Interactive Leaflet interface with dynamic Kebele boundary overlays.',
                link: '/map',
                color: 'text-indigo-400'
              },
            ].map((f, i) => (
              <Link key={i} to={f.link} className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/50 transition-all group">
                <f.icon className={`w-10 h-10 ${f.color} mb-6 group-hover:scale-110 transition-transform`} />
                <h3 className="text-2xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{f.desc}</p>
                <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-widest">
                  Open Module <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Preview Section */}
      <section className="py-32 bg-slate-900/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-8 leading-tight">
              Interactive Risk <br />
              <span className="text-emerald-400">Dashboards</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Drill down into individual Kebeles to analyze elevation, slope, and real-time hazard intensity. Our platform provides high-resolution data visualization for effective disaster prevention.
            </p>
            <div className="space-y-4 mb-10">
              {['Interactive Flood Risk Maps', 'Landslide Hazard Zone Classing', 'Automated SMS/Email Alerting'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-emerald-500" />
                  <span className="text-slate-200 font-medium">{item}</span>
                </div>
              ))}
            </div>
            <Link to="/disaster-intel" className="px-8 py-4 bg-white text-slate-950 rounded-xl font-bold hover:bg-slate-200 transition-colors inline-block">
              Launch Disaster Portal
            </Link>
          </div>
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-tr from-emerald-500 to-blue-500 opacity-20 blur-2xl rounded-3xl" />
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/bcb3983b-ae83-4059-93ff-97cb2bb10dc2/flood-risk-analysis-map-overlay-88f60ca4-1773694347808.webp" 
              alt="Dashboard Preview" 
              className="rounded-3xl border border-slate-800 shadow-2xl relative z-10"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;