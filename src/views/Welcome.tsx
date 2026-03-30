import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Database, LayoutDashboard } from 'lucide-react';

const Welcome: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 scale-105"
        style={{
          backgroundImage: `url('https://storage.googleapis.com/dala-prod-public-storage/generated-images/bcb3983b-ae83-4059-93ff-97cb2bb10dc2/welcome-background-49a5f7da-1774646083630.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3) blur(2px)',
        }}
      />
      
      {/* Animated Hexagon Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      <div className="relative z-10 max-w-4xl w-full px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative p-1 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.5)]">
            <div className="bg-slate-900 rounded-xl p-4">
               <img src="/favicon.svg" alt="AgriUrban Logo" className="w-16 h-16" />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
        >
          AgriUrban <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Intelligence</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Empowering resilient communities through AI-driven GIS analysis, disaster preparedness, and sustainable agricultural innovation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button 
            asChild
            size="lg"
            className="w-full sm:w-auto px-8 py-6 text-lg bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl transition-all shadow-lg hover:shadow-cyan-500/20 group"
          >
            <Link to="/signin">
              Sign In
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button 
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto px-8 py-6 text-lg border-slate-700 text-slate-300 hover:bg-slate-800 rounded-xl transition-all"
          >
            <Link to="/signup">
              Create Account
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
        >
          {[
            { icon: <Shield className="w-5 h-5 text-cyan-400" />, title: "Secure Data", desc: "Enterprise-grade security for spatial intelligence." },
            { icon: <Database className="w-5 h-5 text-blue-400" />, title: "Real-time GIS", desc: "Live mapping and environmental monitoring." },
            { icon: <LayoutDashboard className="w-5 h-5 text-indigo-400" />, title: "AI Analytics", desc: "Predictive modeling for urban growth and risks." },
          ].map((feature, i) => (
            <div key={i} className="bg-slate-900/40 backdrop-blur-md p-4 rounded-xl border border-slate-800/50">
              <div className="mb-2">{feature.icon}</div>
              <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;