import React from 'react';
import { Mail, Github, Linkedin, Twitter, Globe, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="text-indigo-500 w-6 h-6" />
            <span className="text-xl font-bold text-white tracking-tight">AGRIURBAN</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            AI-powered spatial intelligence for sustainable land management and agricultural planning in Ethiopia.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-slate-500 hover:text-white transition-colors"><Twitter size={18} /></a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors"><Github size={18} /></a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors"><Linkedin size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><a href="/map" className="hover:text-indigo-400 transition-colors">Map Explorer</a></li>
            <li><a href="/analytics" className="hover:text-indigo-400 transition-colors">Analytics</a></li>
            <li><a href="/ai-prediction" className="hover:text-indigo-400 transition-colors">Growth Prediction</a></li>
            <li><a href="/agri-intelligence" className="hover:text-indigo-400 transition-colors">Agri Intelligence</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><a href="/about" className="hover:text-indigo-400 transition-colors">About Project</a></li>
            <li><a href="/subscription" className="hover:text-indigo-400 transition-colors">Subscription</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-2">
              <Mail size={16} className="text-indigo-500 mt-0.5" />
              <span>takalngabraham@gmail.com</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-indigo-500 mt-0.5" />
              <span>Bale Robe Town, Bale Zone, Ethiopia</span>
            </li>
            <li className="pt-2">
              <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                <p className="text-[11px] font-bold text-indigo-400 mb-1">PROTOTYPE CREDIT</p>
                <p className="text-xs text-slate-300">Developed by Abraham Takalng, 3rd year GIS student.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-slate-500 italic">Prototype developed by Abraham Takalng - 3rd year GIS student</p>
        <p className="text-xs text-slate-500">© 2026 AGRIURBAN INTELLIGENCE. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;