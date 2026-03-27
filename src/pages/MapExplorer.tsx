import React, { useState } from 'react';
import MapContainer from '../components/map/MapContainer';
import { LayoutGrid, Map as MapIcon, Layers, Maximize, MousePointer2, Search, PenTool, Trash2, Download, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const MapExplorer = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [isDrawing, setIsDrawing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<null | any>(null);

  const toggleDrawing = () => {
    if (!isDrawing) {
      toast.info('Draw Mode Active: Click and drag on the map to select an area.');
      setIsDrawing(true);
    } else {
      setIsDrawing(false);
      setAnalysisResult(null);
    }
  };

  const simulateAnalysis = () => {
    toast.promise(new Promise(resolve => setTimeout(resolve, 2000)), {
      loading: 'AI analyzing selected area...',
      success: () => {
        setAnalysisResult({
          area: '24.5 Hectares',
          suitability: 'High (78%)',
          dominantCover: 'Crop Land (62%)',
          investmentScore: '82/100',
          recommendation: 'Ideal for small-scale irrigation expansion.'
        });
        return 'Analysis Complete!';
      },
      error: 'Analysis failed. Please try again.',
    });
  };

  return (
    <div className="h-[calc(100vh-64px)] pt-16 flex flex-col bg-slate-950">
      {/* Secondary Sub-nav */}
      <div className="px-6 py-3 border-b border-slate-900 bg-slate-950 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
           <h1 className="text-lg font-bold text-white flex items-center gap-2">
             <MapIcon className="w-5 h-5 text-indigo-500" /> Bale Robe Explorer
           </h1>
           <div className="hidden md:block h-4 w-px bg-slate-800 mx-2"></div>
           <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
             <button 
               onClick={() => setActiveTab('map')}
               className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'map' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
             >
               Live Map
             </button>
             <button 
               onClick={() => setActiveTab('data')}
               className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'data' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
             >
               Data View
             </button>
           </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search Kebele..." 
              className="bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full md:w-64"
            />
          </div>
          <button className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white">
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow relative flex overflow-hidden">
        {/* Left Sidebar for Quick Tools */}
        <div className="w-16 border-r border-slate-900 flex flex-col items-center py-6 gap-6 bg-slate-950/50">
           {[
             { icon: MousePointer2, label: 'Select' },
             { icon: Layers, label: 'Layers' },
             { icon: LayoutGrid, label: 'Grid' },
           ].map((tool, i) => (
             <button key={i} className="p-3 bg-slate-900 rounded-xl text-slate-500 hover:text-indigo-400 hover:bg-slate-800 transition-all group relative">
               <tool.icon className="w-5 h-5" />
               <span className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-[10px] text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                 {tool.label}
               </span>
             </button>
           ))}
           <div className="h-px w-8 bg-slate-800" />
           <button 
             onClick={toggleDrawing}
             className={`p-3 rounded-xl transition-all group relative ${isDrawing ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-indigo-400 hover:bg-slate-800'}`}
           >
             <PenTool className="w-5 h-5" />
             <span className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-[10px] text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
               Draw & Analyze
             </span>
           </button>
        </div>

        {/* Map Container */}
        <div className="flex-grow relative">
          <MapContainer />
          
          {/* Analysis Overlay */}
          <AnimatePresence>
            {isDrawing && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute top-6 left-6 z-20 w-80 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-2xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Draw & Analyze</h3>
                  <button onClick={() => setIsDrawing(false)} className="text-slate-500 hover:text-white"><Trash2 size={16} /></button>
                </div>
                
                {!analysisResult ? (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Select an area on the map to calculate spatial variables and suitability metrics.
                    </p>
                    <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                      <div className="text-[10px] font-bold text-indigo-400 uppercase mb-2">Instructions</div>
                      <ul className="text-[10px] text-slate-300 space-y-1">
                        <li>1. Click "Start Drawing"</li>
                        <li>2. Trace a polygon on the map</li>
                        <li>3. Double-click to finish</li>
                      </ul>
                    </div>
                    <button 
                      onClick={simulateAnalysis}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20"
                    >
                      Process Selection
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                        <div className="text-[10px] text-slate-500 uppercase font-bold">Area</div>
                        <div className="text-sm font-bold text-white">{analysisResult.area}</div>
                      </div>
                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                        <div className="text-[10px] text-slate-500 uppercase font-bold">Suitability</div>
                        <div className="text-sm font-bold text-emerald-400">{analysisResult.suitability}</div>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Dominant Cover</div>
                      <div className="text-sm font-bold text-white">{analysisResult.dominantCover}</div>
                    </div>
                    <div className="p-4 bg-indigo-500/10 rounded-xl">
                      <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-bold uppercase mb-1">
                        <CheckCircle2 size={12} /> Recommendation
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed italic">
                        "{analysisResult.recommendation}"
                      </p>
                    </div>
                    <div className="flex gap-2">
                       <button className="flex-grow py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2">
                          <Download size={14} /> CSV
                       </button>
                       <button onClick={() => setAnalysisResult(null)} className="flex-grow py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg">
                          Clear
                       </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MapExplorer;