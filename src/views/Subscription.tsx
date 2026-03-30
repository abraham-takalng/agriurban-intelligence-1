import React from 'react';
import { Check, Zap, Rocket, Star, Shield, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const Subscription: React.FC = () => {
  const plans = [
    {
      name: "Free access",
      price: "$0",
      period: "forever",
      desc: "Perfect for students and casual map explorers.",
      features: [
        "Basic Interactive Map View",
        "Public Kebele Statistics",
        "Limited Land Cover Data",
        "Community Support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Research Plan",
      price: "$29",
      period: "per month",
      desc: "Full dataset access for academic & spatial research.",
      features: [
        "Full Sentinel-2 Data Layers",
        "AI Suitability Exports",
        "Urban Growth Time-lapse",
        "CSV/JSON Report Downloads",
        "Priority Support"
      ],
      cta: "Subscribe Now",
      popular: true
    },
    {
      name: "Professional Plan",
      price: "$149",
      period: "per month",
      desc: "Enterprise-grade intelligence for developers and planners.",
      features: [
        "Unlimited Growth Simulations",
        "API Data Access",
        "Custom Draw-to-Analyze Tool",
        "Investment Parcel Analysis",
        "Dedicated Account Manager",
        "Custom GIS Processing"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="pt-28 pb-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-black mb-6">Choose Your <span className="text-cyan-500">Intelligence Tier</span></h1>
        <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Scale your geospatial capabilities with our professional data subscriptions tailored for Ethiopia's development.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`flex flex-col p-10 rounded-[3rem] border transition-all ${
              plan.popular 
                ? 'bg-neutral-900 border-cyan-500/50 shadow-2xl shadow-cyan-500/10 scale-105 z-10' 
                : 'bg-neutral-950 border-white/5 hover:border-white/10'
            }`}
          >
            {plan.popular && (
              <div className="self-start mb-6 px-4 py-1 bg-cyan-500 text-neutral-950 text-[10px] font-black uppercase tracking-widest rounded-full">
                Most Popular
              </div>
            )}
            
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-neutral-400 text-sm mb-8 leading-relaxed">{plan.desc}</p>
            
            <div className="flex items-baseline gap-1 mb-10">
              <span className="text-5xl font-black">{plan.price}</span>
              <span className="text-neutral-500 text-sm">/{plan.period}</span>
            </div>

            <div className="space-y-5 mb-12 flex-1">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-cyan-400" />
                  </div>
                  <span className="text-sm text-neutral-300 leading-tight">{feature}</span>
                </div>
              ))}
            </div>

            <button className={`w-full py-4 rounded-2xl font-bold transition-all ${
              plan.popular 
                ? 'bg-cyan-500 text-neutral-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20' 
                : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
            }`}>
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Payment Placeholder */}
      <div className="mt-24 p-12 bg-neutral-900/50 border border-white/5 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-md text-center md:text-left">
           <h4 className="text-2xl font-bold mb-4 flex items-center justify-center md:justify-start gap-2">
             <Shield className="w-6 h-6 text-cyan-400" />
             Secure Infrastructure
           </h4>
           <p className="text-neutral-400 text-sm leading-relaxed mb-6">
             Our payment processing is powered by simulated Stripe & PayPal integrations for the prototype demo. No real transactions will occur.
           </p>
           <div className="flex gap-4 justify-center md:justify-start">
             <div className="h-8 w-12 bg-white/5 rounded border border-white/10 flex items-center justify-center text-[8px] font-bold">VISA</div>
             <div className="h-8 w-12 bg-white/5 rounded border border-white/10 flex items-center justify-center text-[8px] font-bold">MC</div>
             <div className="h-8 w-12 bg-white/5 rounded border border-white/10 flex items-center justify-center text-[8px] font-bold">STRIPE</div>
           </div>
        </div>
        <div className="w-full max-w-sm bg-neutral-950 p-8 rounded-3xl border border-white/5">
           <div className="text-xs text-neutral-500 uppercase mb-6 font-bold tracking-widest">Prototype Gateway</div>
           <div className="space-y-4">
              <div className="h-12 w-full bg-white/5 rounded-xl border border-white/10 px-4 flex items-center text-sm text-neutral-500">Card Number</div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="h-12 w-full bg-white/5 rounded-xl border border-white/10 px-4 flex items-center text-sm text-neutral-500">MM/YY</div>
                 <div className="h-12 w-full bg-white/5 rounded-xl border border-white/10 px-4 flex items-center text-sm text-neutral-500">CVC</div>
              </div>
              <button className="w-full py-4 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-xl font-bold text-sm cursor-not-allowed">
                PROCEED TO CHECKOUT
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;