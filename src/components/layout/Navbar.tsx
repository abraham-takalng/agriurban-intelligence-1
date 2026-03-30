import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Map as MapIcon, BarChart3, BrainCircuit, Sprout, TrendingUp, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Map', path: '/map', icon: MapIcon },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'AI Prediction', path: '/ai-prediction', icon: BrainCircuit },
    { name: 'Agri Intel', path: '/agri-intelligence', icon: Sprout },
    { name: 'Investment', path: '/investment', icon: TrendingUp },
    { name: 'Pricing', path: '/subscription', icon: Globe },
    { name: 'About', path: '/about', icon: Info },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || location.pathname !== '/' ? 'bg-slate-950/80 backdrop-blur-lg border-b border-slate-800' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-12 h-12 transition-transform group-hover:scale-110 duration-300 flex items-center justify-center">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/attachments/820e4cfb-b67b-4e0d-acfe-8a02a845cd07/1774729697680_Agriurban_Intelligence_Hexagonal_Logo.svg" 
                alt="AgriUrban Intelligence Logo" 
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(79,70,229,0.5)]" 
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold tracking-tight text-white block leading-none">AGRIURBAN</span>
              <span className="text-[10px] text-indigo-400 font-medium uppercase tracking-widest">Intelligence System</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  isActive(link.path) 
                  ? 'text-white bg-indigo-600/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </Link>
            ))}
            <Link to="/map" className="ml-4 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-600/20">
              Launch Platform
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-white p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="xl:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800"
          >
            <div className="px-4 pt-4 pb-8 space-y-2 max-h-[85vh] overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 px-4 py-4 rounded-xl text-base font-semibold transition-all ${
                    isActive(link.path) 
                    ? 'text-white bg-indigo-600/20 border border-indigo-500/30' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isActive(link.path) ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    <link.icon className="w-5 h-5" />
                  </div>
                  {link.name}
                </Link>
              ))}
              <div className="pt-6">
                <Link
                  to="/map"
                  onClick={() => setIsOpen(false)}
                  className="w-full block text-center px-4 py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-500/30 transition-all"
                >
                  Launch Platform
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;