import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  LayoutDashboard, 
  Map as MapIcon, 
  BrainCircuit, 
  TrendingUp, 
  Sprout, 
  CreditCard, 
  Info, 
  ChevronRight, 
  Menu, 
  X, 
  Github, 
  Mail, 
  ExternalLink,
  ShieldCheck,
  Zap,
  BarChart3,
  Layers,
  AlertTriangle,
  BookOpen,
  Linkedin,
  Send,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';

// Views
import LandingPage from './views/LandingPage';
import MapExplorer from './views/MapExplorer';
import Dashboard from './views/Dashboard';
import AIPredictions from './views/AIPredictions';
import AgricultureIntelligence from './views/AgricultureIntelligence';
import InvestmentOpportunity from './views/InvestmentOpportunity';
import Subscription from './views/Subscription';
import About from './views/About';
import DisasterIntelligence from './views/DisasterIntelligence';
import DisasterPreparedness from './views/DisasterPreparedness';
import AIAssistant from './components/ai/AIAssistant';

// Standard Leaflet CSS
const LeafletStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    .leaflet-container {
      width: 100%;
      height: 100%;
      background: #0a0a0a !important;
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #262626;
      border-radius: 10px;
    }
    @keyframes scan-line {
      0% { top: 0%; opacity: 0; }
      50% { opacity: 1; }
      100% { top: 100%; opacity: 0; }
    }
    .animate-scan-line {
      animation: scan-line 4s linear infinite;
    }
    .leaflet-popup-content-wrapper {
      background: #0a0a0a !important;
      color: white !important;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px !important;
    }
    .leaflet-popup-tip {
      background: #0a0a0a !important;
    }
  `}} />
);

export type Page = 'home' | 'map' | 'dashboard' | 'ai' | 'agri' | 'invest' | 'subscription' | 'about' | 'disaster' | 'preparedness';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const menuItems = [
    { id: 'home', label: 'Home', icon: Globe },
    { id: 'map', label: 'Map Explorer', icon: MapIcon },
    { id: 'disaster', label: 'Disaster Intel', icon: AlertTriangle },
    { id: 'preparedness', label: 'Preparedness', icon: BookOpen },
    { id: 'dashboard', label: 'Analytics', icon: LayoutDashboard },
    { id: 'ai', label: 'AI Prediction', icon: BrainCircuit },
    { id: 'agri', label: 'Agri Intel', icon: Sprout },
    { id: 'invest', label: 'Investment', icon: TrendingUp },
    { id: 'subscription', label: 'Plans', icon: CreditCard },
    { id: 'about', label: 'About', icon: Info },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! Abraham will get back to you soon.");
    setShowContactForm(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 font-sans selection:bg-cyan-500/30 selection:text-white">
      <LeafletStyles />
      <Toaster position="top-right" theme="dark" />
      
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5 ${
          scrolled || currentPage !== 'home' 
            ? 'bg-neutral-950/80 backdrop-blur-md py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
              <Globe className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
                AGRIURBAN
              </h1>
              <span className="text-[10px] block -mt-1 uppercase tracking-[0.2em] text-cyan-400 font-medium">INTELLIGENCE</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-1">
            {menuItems.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id as Page)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  currentPage === item.id 
                    ? 'bg-white/10 text-white shadow-inner' 
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => navigate('map')}
              className="ml-4 px-5 py-2 bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-full text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 hover:opacity-90 transition-all active:scale-95"
            >
              Launch Platform
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="xl:hidden p-2 text-neutral-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-neutral-950 pt-24 px-6 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-2 pb-10">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id as Page)}
                  className={`flex items-center gap-4 p-4 rounded-2xl text-lg font-medium ${
                    currentPage === item.id 
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                      : 'text-neutral-400'
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {currentPage === 'home' && <LandingPage onNavigate={navigate} />}
            {currentPage === 'map' && <MapExplorer />}
            {currentPage === 'dashboard' && <Dashboard />}
            {currentPage === 'ai' && <AIPredictions />}
            {currentPage === 'agri' && <AgricultureIntelligence />}
            {currentPage === 'invest' && <InvestmentOpportunity />}
            {currentPage === 'subscription' && <Subscription />}
            {currentPage === 'about' && <About />}
            {currentPage === 'disaster' && <DisasterIntelligence />}
            {currentPage === 'preparedness' && <DisasterPreparedness />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* AI Assistant Floating UI */}
      <AIAssistant />

      {/* Footer */}
      <footer className="bg-neutral-950 border-t border-white/5 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                  <Globe className="text-white w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">AGRIURBAN <span className="text-cyan-500 italic">INTELLIGENCE</span></h2>
              </div>
              <p className="text-neutral-400 max-w-md mb-8 leading-relaxed">
                Advancing sustainable land management and disaster resilience through AI and GIS. Specifically designed for Bale Robe town, Ethiopia.
              </p>
              <div className="flex gap-4">
                <a href="https://github.com/abraham-takalng" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-400 transition-all border border-white/5">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/abraham-takalng" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-400 transition-all border border-white/5">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://t.me/abraham_takalng" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-400 transition-all border border-white/5">
                  <Send className="w-5 h-5" />
                </a>
                <a href="mailto:takalngabraham@gmail.com" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-400 transition-all border border-white/5">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-6">Platform</h3>
              <ul className="space-y-4">
                <li><button onClick={() => navigate('map')} className="text-neutral-400 hover:text-white transition-colors">Map Explorer</button></li>
                <li><button onClick={() => navigate('disaster')} className="text-neutral-400 hover:text-white transition-colors">Disaster Intelligence</button></li>
                <li><button onClick={() => navigate('preparedness')} className="text-neutral-400 hover:text-white transition-colors">Preparedness Guides</button></li>
                <li><button onClick={() => navigate('ai')} className="text-neutral-400 hover:text-white transition-colors">AI Analysis</button></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-6">Contact Me</h3>
              {!showContactForm ? (
                <div className="space-y-4">
                   <p className="text-neutral-400 text-sm">Have questions or interested in the prototype?</p>
                   <button 
                    onClick={() => setShowContactForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-all"
                   >
                     <MessageSquare className="w-4 h-4 text-cyan-400" />
                     Send Message
                   </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <input required type="text" placeholder="Name" className="w-full px-3 py-2 bg-neutral-900 border border-white/10 rounded-lg text-sm focus:border-cyan-500 outline-none" />
                  <input required type="email" placeholder="Email" className="w-full px-3 py-2 bg-neutral-900 border border-white/10 rounded-lg text-sm focus:border-cyan-500 outline-none" />
                  <textarea required placeholder="Message" rows={3} className="w-full px-3 py-2 bg-neutral-900 border border-white/10 rounded-lg text-sm focus:border-cyan-500 outline-none"></textarea>
                  <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 bg-cyan-600 rounded-lg text-xs font-bold">Send</button>
                    <button type="button" onClick={() => setShowContactForm(false)} className="px-4 py-2 bg-neutral-800 rounded-lg text-xs font-bold">Cancel</button>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm">
              © 2026 AgriUrban Intelligence. Prototype developed by <span className="text-neutral-300 font-semibold">Abraham Takalng</span>, 3rd year GIS student.
            </p>
            <div className="flex gap-8 text-xs text-neutral-600 font-medium">
              <a href="#" className="hover:text-neutral-400">PRIVACY POLICY</a>
              <a href="#" className="hover:text-neutral-400">TERMS OF SERVICE</a>
              <a href="#" className="hover:text-neutral-400">UTM ZONE 37N / WGS84</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;