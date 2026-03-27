import React from 'react';
import { Check, CreditCard, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Subscription = () => {
  const plans = [
    { name: 'Free', price: '0', features: ['Map Explorer', 'Admin Boundaries', 'Current Land Cover'], popular: false },
    { name: 'Research', price: '29', features: ['Growth Prediction', 'Agri Suitability', 'Data Export'], popular: true },
    { name: 'Pro', price: '99', features: ['Investment Index', 'API Access', '24/7 Support'], popular: false }
  ];

  return (
    <div className="pt-20 px-6 min-h-screen bg-slate-950 pb-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-16 text-center tracking-tight">Intelligence Tiers</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, i) => (
            <div key={i} className={`p-8 rounded-3xl border ${plan.popular ? 'bg-indigo-600/10 border-indigo-500' : 'bg-slate-900/50 border-slate-800'}`}>
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="text-5xl font-black text-white mb-8">${plan.price}</div>
              <ul className="space-y-4 mb-10">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                    <Check className="w-5 h-5 text-indigo-500" /> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-xl font-bold ${plan.popular ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-white'}`}>Select Plan</button>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8">
           <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
             <CreditCard className="w-5 h-5 text-indigo-500" /> Secure Checkout Simulation
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                 <input type="text" placeholder="Card Holder" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white" />
                 <input type="text" placeholder="Card Number" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white" />
                 <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM/YY" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white" />
                    <input type="text" placeholder="CVV" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white" />
                 </div>
                 <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" /> Pay $29.00
                 </button>
              </div>
              <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
                 <h4 className="text-sm font-bold text-white mb-4 uppercase">Summary</h4>
                 <div className="flex justify-between text-xs text-slate-400 mb-2"><span>Plan</span><span>Research</span></div>
                 <div className="flex justify-between text-sm font-bold text-white"><span>Total</span><span>$29.00</span></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;