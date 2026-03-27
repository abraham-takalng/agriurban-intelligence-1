import React from 'react';
import { ShieldAlert, BookOpen, Phone, CheckCircle, AlertTriangle, CloudRain, Thermometer, Zap, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const DisasterPreparedness = () => {
  const categories = [
    {
      title: "Flood Readiness",
      icon: CloudRain,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      guides: [
        "Elevate critical utilities (furnaces, water heaters).",
        "Keep sandbags and emergency water-pumping equipment ready.",
        "Maintain drainage systems around your property.",
        "Store important documents in waterproof containers."
      ]
    },
    {
      title: "Drought Mitigation",
      icon: Zap,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      guides: [
        "Implement rainwater harvesting systems.",
        "Use mulch to retain soil moisture in urban gardens.",
        "Install low-flow plumbing fixtures.",
        "Plant drought-resistant native species."
      ]
    },
    {
      title: "Heatwave Safety",
      icon: Thermometer,
      color: "text-orange-400",
      bg: "bg-orange-400/10",
      guides: [
        "Stay hydrated and avoid strenuous activities midday.",
        "Keep living spaces cool using reflective window films.",
        "Check on elderly neighbors and vulnerable populations.",
        "Maintain high-efficiency HVAC systems."
      ]
    },
    {
      title: "Landslide Prevention",
      icon: Layers,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      guides: [
        "Avoid building near steep slopes or drainage ways.",
        "Plant ground cover on slopes to prevent soil erosion.",
        "Install proper retaining walls where necessary.",
        "Watch for new cracks in house foundations."
      ]
    }
  ];

  const emergencyContacts = [
    { name: "Disaster Response Unit", phone: "911 / 112", role: "Immediate Emergency" },
    { name: "Red Cross Liaison", phone: "+251 11 XXX XXXX", role: "Shelter & Aid" },
    { name: "Meteorological Agency", phone: "800-WEATHER", role: "Alerts & Forecasts" },
    { name: "Kebele Disaster Committee", phone: "+251 91 XXX XXXX", role: "Local Assistance" }
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6"
          >
            <ShieldAlert className="w-4 h-4" />
            Preparedness & Resources
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Stay Ready, <span className="text-cyan-400">Stay Safe</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg"
          >
            Access comprehensive educational guides and emergency protocols to protect your community from environmental hazards.
          </motion.p>
        </div>

        {/* Readiness Guides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-cyan-500/30 transition-all"
            >
              <div className={`w-14 h-14 rounded-2xl ${cat.bg} flex items-center justify-center mb-6`}>
                <cat.icon className={`w-8 h-8 ${cat.color}`} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{cat.title}</h3>
              <ul className="space-y-3">
                {cat.guides.map((guide, i) => (
                  <li key={i} className="flex gap-3 text-slate-400">
                    <CheckCircle className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                    <span>{guide}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Emergency Contacts & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-8 rounded-3xl">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Phone className="w-6 h-6 text-cyan-400" />
              Emergency Directory
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {emergencyContacts.map((contact) => (
                <div key={contact.name} className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <p className="text-sm text-cyan-400 font-medium mb-1">{contact.role}</p>
                  <p className="text-lg font-bold text-white mb-1">{contact.name}</p>
                  <p className="text-xl text-slate-300 font-mono">{contact.phone}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 p-8 rounded-3xl">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              Live Alerts
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/50 rounded-xl border border-red-500/20 border-l-4 border-l-red-500">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">High Risk - Flood</p>
                <p className="text-sm font-medium text-white mb-2">River levels rising in District 4. Evacuate low-lying areas.</p>
                <p className="text-xs text-slate-400">Updated: 10 mins ago</p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border border-amber-500/20 border-l-4 border-l-amber-500">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Moderate - Heatwave</p>
                <p className="text-sm font-medium text-white mb-2">Temperatures expected to exceed 38°C over the weekend.</p>
                <p className="text-xs text-slate-400">Updated: 1 hour ago</p>
              </div>
              <button className="w-full py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold rounded-xl transition-all mt-4">
                Sign up for SMS Alerts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterPreparedness;