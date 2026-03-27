import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'framer-motion';
import { Activity, Users, MapPin, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const landCoverData = [
  { name: 'Water', value: 5, color: '#3b82f6' },
  { name: 'Trees', value: 25, color: '#10b981' },
  { name: 'Crop', value: 40, color: '#f59e0b' },
  { name: 'Built-up', value: 20, color: '#ef4444' },
  { name: 'Bare', value: 10, color: '#78716c' },
];

const suitabilityData = [
  { name: 'Very High', count: 120, fill: '#059669' },
  { name: 'High', count: 450, fill: '#10b981' },
  { name: 'Moderate', count: 890, fill: '#f59e0b' },
  { name: 'Low', count: 320, fill: '#f97316' },
  { name: 'Very Low', count: 150, fill: '#ef4444' },
];

const growthData = [
  { year: '2020', built: 180, agri: 500 },
  { year: '2021', built: 200, agri: 480 },
  { year: '2022', built: 230, agri: 460 },
  { year: '2023', built: 280, agri: 430 },
  { year: '2024', built: 350, agri: 400 },
  { year: '2025', built: 420, agri: 380 },
  { year: '2026', built: 510, agri: 350 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black mb-2 tracking-tight">Spatial <span className="text-cyan-500">Analytics</span></h1>
          <p className="text-neutral-400">Detailed land distribution and growth metrics for Bale Robe.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm hover:bg-white/10 transition-all">Download CSV</button>
          <button className="px-4 py-2 bg-cyan-600 rounded-xl text-sm font-bold text-white shadow-lg shadow-cyan-600/20 hover:bg-cyan-500 transition-all">Generate Report</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard label="Total Analyzed Area" value="452.8 km²" change="+2.4%" icon={Activity} color="cyan" />
        <StatCard label="Est. Population" value="245,300" change="+4.1%" icon={Users} color="emerald" />
        <StatCard label="Kebele Units" value="14" change="0%" icon={MapPin} color="blue" />
        <StatCard label="Investment Score" value="78/100" change="+12%" icon={TrendingUp} color="amber" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Land Cover Distribution */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-900/50 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-xl"
        >
          <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
            Land Cover Classification
            <span className="text-[10px] px-2 py-0.5 bg-cyan-500/10 text-cyan-500 rounded-full font-medium">SENTINEL-2</span>
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={landCoverData}
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {landCoverData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
            {landCoverData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-neutral-400">{item.name}: <span className="text-white font-medium">{item.value}%</span></span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Growth Trends */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-neutral-900/50 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-xl"
        >
          <h3 className="text-lg font-bold mb-8">Urban Expansion vs Agriculture</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorBuilt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAgri" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis dataKey="year" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', borderRadius: '12px' }}
                />
                <Area type="monotone" dataKey="built" stroke="#ef4444" fillOpacity={1} fill="url(#colorBuilt)" strokeWidth={2} name="Urban (km²)" />
                <Area type="monotone" dataKey="agri" stroke="#10b981" fillOpacity={1} fill="url(#colorAgri)" strokeWidth={2} name="Agri (km²)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Suitability Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-neutral-900/50 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-xl"
        >
          <h3 className="text-lg font-bold mb-8">Land Suitability Class Count</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={suitabilityData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} width={100} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', borderRadius: '12px' }}
                />
                <Bar dataKey="count" radius={[0, 8, 8, 0]} barSize={24}>
                   {suitabilityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, change, icon: Icon, color }: any) => (
  <div className="bg-neutral-900/50 border border-white/5 rounded-3xl p-6 backdrop-blur-md">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl bg-${color}-500/10 border border-${color}-500/20`}>
        <Icon className={`w-5 h-5 text-${color}-400`} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold ${change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
        {change}
        {change.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
      </div>
    </div>
    <div className="text-2xl font-black text-white">{value}</div>
    <div className="text-sm text-neutral-500">{label}</div>
  </div>
);

export default Dashboard;