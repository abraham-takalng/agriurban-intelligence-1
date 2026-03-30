import React from 'react';
import { 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  ExternalLink,
  MapPin,
  Phone
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 transition-transform hover:scale-110 duration-300 flex items-center justify-center">
                <img src="/favicon.svg" alt="AgriUrban Intelligence Logo" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight uppercase">AgriUrban <span className="text-cyan-500 italic">Intelligence</span></h2>
            </div>
            <p className="text-neutral-400 max-w-md mb-8 leading-relaxed">
              Advancing sustainable land management and disaster resilience through AI and GIS. Specifically designed for Bale Robe town, Ethiopia.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-400 transition-all border border-white/5">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-400 transition-all border border-white/5">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-400 transition-all border border-white/5">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-400 transition-all border border-white/5">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-6">Platform</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Map Explorer</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Disaster Intelligence</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">AI Predictions</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">About Project</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-neutral-400">
                <MapPin className="w-4 h-4 text-cyan-500" />
                <span>Bale Robe, Ethiopia</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-400">
                <Phone className="w-4 h-4 text-cyan-500" />
                <span>+251 (0) 900 000 000</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-400">
                <Mail className="w-4 h-4 text-cyan-500" />
                <span>contact@agriurban.ai</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">
            &copy; 2026 AgriUrban Intelligence. Prototype developed for academic research purposes.
          </p>
          <div className="flex gap-8 text-xs text-neutral-600 font-medium">
            <a href="#" className="hover:text-neutral-400">PRIVACY POLICY</a>
            <a href="#" className="hover:text-neutral-400">TERMS OF SERVICE</a>
            <a href="#" className="hover:text-neutral-400">UTM ZONE 37N / WGS84</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;