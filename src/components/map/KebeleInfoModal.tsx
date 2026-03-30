import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { 
  Users, 
  Map as MapIcon, 
  Layers, 
  ShieldCheck, 
  Droplets, 
  Zap, 
  Sprout, 
  Building2, 
  TrendingUp,
  Info,
  MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';
import { KebeleData } from '@/data/mockGisData';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getRiskColor } from '@/lib/constants';

interface KebeleInfoModalProps {
  kebele: KebeleData | null;
  isOpen: boolean;
  onClose: () => void;
}

const KebeleInfoModal: React.FC<KebeleInfoModalProps> = ({ kebele, isOpen, onClose }) => {
  if (!kebele) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-slate-950/95 border-slate-800 text-white backdrop-blur-xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <DialogHeader className="mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-cyan-500/20 rounded-2xl border border-cyan-500/30">
              <MapPin className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="flex flex-col">
              <Badge variant="outline" className="w-fit border-indigo-500/30 text-indigo-400 bg-indigo-500/5 mb-1">
                KEBELE DISTRICT
              </Badge>
              <DialogTitle className="text-4xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                {kebele.name}
              </DialogTitle>
            </div>
          </div>
          <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-xl mb-2">
            <DialogDescription className="text-slate-300 text-base font-medium leading-relaxed">
              {kebele.suitability_summary}
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Metrics */}
          <div className="space-y-4">
            <div className="p-5 bg-slate-900/50 rounded-2xl border border-slate-800/50 group hover:border-cyan-500/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Users className="w-3 h-3 text-cyan-500" /> Population Metrics
                </span>
                <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">Verified</Badge>
              </div>
              <div className="text-3xl font-black text-white mb-1">
                {kebele.population.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-2 font-medium">
                <Info className="w-3 h-3 text-slate-500" /> {kebele.population_estimates}
              </div>
            </div>

            <div className="p-5 bg-slate-900/50 rounded-2xl border border-slate-800/50">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <TrendingUp className="w-3 h-3 text-indigo-400" /> Intelligence Scores
              </h4>
              <div className="space-y-4">
                <MetricProgress 
                  label="Agricultural Suitability" 
                  value={kebele.agriSuitabilityScore} 
                  color="bg-emerald-500" 
                  icon={<Sprout className="w-3 h-3 text-emerald-400" />} 
                />
                <MetricProgress 
                  label="Urban Growth Index" 
                  value={kebele.urbanGrowthPotential} 
                  color="bg-blue-500" 
                  icon={<Building2 className="w-3 h-3 text-blue-400" />} 
                />
                <MetricProgress 
                  label="General Land Suitability" 
                  value={kebele.suitabilityScore} 
                  color="bg-cyan-500" 
                  icon={<ShieldCheck className="w-3 h-3 text-cyan-400" />} 
                />
              </div>
            </div>
          </div>

          {/* Environmental Risk & Land Cover */}
          <div className="space-y-4">
            <div className="p-5 bg-slate-900/50 rounded-2xl border border-slate-800/50">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Layers className="w-3 h-3 text-amber-400" /> Spatial Distribution
              </h4>
              <p className="text-xs text-slate-400 mb-4 font-medium leading-relaxed italic">
                {kebele.land_cover_distribution}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(kebele.landCover).map(([key, value]) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-[10px] text-slate-500 uppercase font-bold">
                      <span>{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-slate-300">{value}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full ${getLandCoverColor(key)}`} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 bg-slate-900/50 rounded-2xl border border-slate-800/50">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <ShieldCheck className="w-3 h-3 text-rose-400" /> Disaster Resilience
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <RiskBadge label="Flood Risk" level={kebele.floodRiskLevel} icon={<Droplets className="w-3 h-3" />} />
                <RiskBadge label="Drought Exposure" level={kebele.droughtRiskLevel} icon={<Zap className="w-3 h-3" />} />
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-4 p-6 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
          <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mb-4">Strategic Recommendations</h4>
          <ul className="space-y-3">
            {kebele.recommendations.map((rec, i) => (
              <motion.li 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="flex items-start gap-3 text-sm text-slate-200"
              >
                <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.6)] shrink-0" />
                <span className="leading-relaxed">{rec}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const MetricProgress = ({ label, value, color, icon }: { label: string, value: number, color: string, icon: React.ReactNode }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-tight">
        {icon}
        {label}
      </div>
      <span className="text-xs font-black text-white">{Math.round(value)}%</span>
    </div>
    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className={`h-full ${color}`} 
      />
    </div>
  </div>
);

const RiskBadge = ({ label, level, icon }: { label: string, level: string, icon: React.ReactNode }) => {
  const color = getRiskColor(level as any);
  return (
    <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800 flex flex-col gap-2 group hover:border-slate-700 transition-colors">
      <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase font-bold">
        {icon}
        {label}
      </div>
      <div 
        className="text-xs font-black uppercase tracking-widest text-center py-1 rounded-md bg-opacity-10"
        style={{ color, backgroundColor: `${color}10` }}
      >
        {level}
      </div>
    </div>
  );
};

const getLandCoverColor = (type: string) => {
  switch (type) {
    case 'builtUp': return 'bg-rose-500';
    case 'cropLand': return 'bg-amber-500';
    case 'vegetation': return 'bg-emerald-500';
    case 'water': return 'bg-blue-500';
    case 'bare': return 'bg-stone-500';
    default: return 'bg-slate-500';
  }
};

export default KebeleInfoModal;