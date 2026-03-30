import React from 'react';
import { 
  BookOpen, 
  Phone, 
  ShieldAlert, 
  MapPin, 
  FileText, 
  ChevronRight, 
  Flame, 
  Waves, 
  Wind,
  Info,
  ExternalLink,
  Users,
  Ambulance,
  Radio,
  Clock,
  Droplet,
  Mountain
} from 'lucide-react';
import { motion } from 'framer-motion';

const DisasterPreparedness: React.FC = () => {
  const emergencyContacts = [
    { name: 'National Emergency', number: '991', icon: Phone, color: 'text-red-500' },
    { name: 'Fire Department', number: '939', icon: Flame, color: 'text-orange-500' },
    { name: 'Ambulance', number: '907', icon: Ambulance, color: 'text-blue-500' },
    { name: 'Police Bale Robe', number: '+251 11-XXX-XXXX', icon: ShieldAlert, color: 'text-indigo-500' },
  ];

  const readinessGuides = [
    {
      title: 'Flood Readiness Guide',
      category: 'Floods',
      description: 'Step-by-step instructions on what to do before, during, and after a flood event in Bale Robe.',
      icon: Waves,
      color: 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    },
    {
      title: 'Drought Resilience',
      category: 'Drought',
      description: 'Water conservation techniques and community strategies for long-term drought resilience.',
      icon: Droplet,
      color: 'bg-amber-500/10 text-amber-500 border-amber-500/20'
    },
    {
      title: 'Landslide Awareness',
      category: 'Landslide',
      description: 'Warning signs of soil instability and emergency evacuation procedures for high-risk slopes.',
      icon: Mountain,
      color: 'bg-orange-500/10 text-orange-500 border-orange-500/20'
    }
  ];

  return (
    <div className="pt-32 pb-20 bg-neutral-950 min-h-screen px-4">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Hero Section */}
        <section className="relative rounded-[3rem] overflow-hidden bg-neutral-900 border border-white/5 p-8 md:p-16 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">
              Be Prepared. <span className="text-cyan-500">Stay Safe.</span>
            </h1>
            <p className="text-neutral-400 text-lg md:text-xl leading-relaxed">
              Educational resources, readiness guides, and emergency information to help the Bale Robe community prepare for and respond to environmental hazards.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <StatBox icon={Users} label="Community Members" value="120k+" />
            <StatBox icon={MapPin} label="Safe Zones" value="14" />
            <StatBox icon={Radio} label="Alert Channels" value="4" />
            <StatBox icon={Clock} label="Response Time" value="<15m" />
          </div>
        </section>

        {/* Emergency Contacts */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center border border-red-500/20">
              <Phone className="text-red-500 w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Emergency Contacts</h2>
              <p className="text-sm text-neutral-500">Quick access to essential services in Bale Zone.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyContacts.map((contact, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-neutral-900/50 border border-white/5 p-6 rounded-3xl group cursor-pointer"
              >
                <contact.icon className={`w-8 h-8 ${contact.color} mb-4`} />
                <h3 className="text-lg font-bold text-white mb-1">{contact.name}</h3>
                <p className="text-2xl font-black tracking-wider text-neutral-200">{contact.number}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500 group-hover:text-cyan-400 transition-colors">
                  Call Now <ChevronRight size={12} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Readiness Guides */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20">
              <BookOpen className="text-cyan-500 w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Readiness Guides</h2>
              <p className="text-sm text-neutral-500">Expert-prepared educational materials for disaster prevention.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {readinessGuides.map((guide, idx) => (
              <div key={idx} className="bg-neutral-900/50 border border-white/5 rounded-[2rem] overflow-hidden flex flex-col">
                <div className={`h-40 ${guide.color.split(' ')[0]} flex items-center justify-center`}>
                  <guide.icon size={48} className={guide.color.split(' ')[1]} />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-500 mb-2">{guide.category}</div>
                  <h3 className="text-xl font-bold mb-4 text-white">{guide.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-1">{guide.description}</p>
                  <button className="flex items-center gap-2 text-sm font-bold text-white hover:text-cyan-400 transition-colors group">
                    <FileText size={16} />
                    Download PDF Guide
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Prevention Resources */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/5 p-10 rounded-[3rem]">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <ShieldAlert className="text-emerald-500 w-6 h-6" />
              Prevention & Mitigation
            </h2>
            <div className="space-y-6">
              <MitigationItem 
                title="Stormwater Management" 
                desc="Community initiatives for clearing drainage channels before rainy seasons." 
              />
              <MitigationItem 
                title="Afforestation Programs" 
                desc="Planting native vegetation on high-slope areas to prevent soil erosion and landslides." 
              />
              <MitigationItem 
                title="Sustainable Urban Design" 
                desc="Guidelines for permeable paving and rainwater harvesting in new construction." 
              />
            </div>
          </div>

          <div className="bg-neutral-900/50 border border-white/5 p-10 rounded-[3rem] flex flex-col justify-center">
            <Info className="text-cyan-500 w-10 h-10 mb-6" />
            <h2 className="text-2xl font-bold mb-4">Official Resources</h2>
            <p className="text-neutral-400 mb-8">Access external portals and international databases for global disaster preparedness standards.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ResourceLink label="Global Disaster Alert" />
              <ResourceLink label="UN DRR Portal" />
              <ResourceLink label="Regional Meteorological Agency" />
              <ResourceLink label="Ethiopian Red Cross Society" />
            </div>
          </div>
        </section>

        {/* Attribution / Footer Part */}
        <div className="text-center py-10 border-t border-white/5">
           <p className="text-neutral-500 text-sm">
             Project supported by local disaster management authorities of Bale Robe.
           </p>
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
    <Icon className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
    <div className="text-xl font-black text-white">{value}</div>
    <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">{label}</div>
  </div>
);

const MitigationItem = ({ title, desc }: { title: string, desc: string }) => (
  <div className="group">
    <h4 className="font-bold text-neutral-200 mb-1 group-hover:text-emerald-400 transition-colors">{title}</h4>
    <p className="text-sm text-neutral-500">{desc}</p>
  </div>
);

const ResourceLink = ({ label }: { label: string }) => (
  <a href="#" className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
    <span className="text-xs font-bold text-neutral-300">{label}</span>
    <ExternalLink size={14} className="text-neutral-500" />
  </a>
);

export default DisasterPreparedness;