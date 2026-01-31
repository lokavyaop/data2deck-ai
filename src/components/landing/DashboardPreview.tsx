import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  FileText, 
  Eye, 
  DollarSign,
  Building2,
  MapPin,
  BarChart3,
  PieChart,
  Loader2
} from "lucide-react";
import { usePitchStats } from "@/hooks/usePitchStats";

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  return `$${value.toLocaleString()}`;
};

const formatNumber = (value: number) => {
  return value.toLocaleString();
};

const DashboardPreview = () => {
  const { stats, loading } = usePitchStats();
  const [animateCharts, setAnimateCharts] = useState(false);

  useEffect(() => {
    if (stats && !loading) {
      setAnimateCharts(true);
    }
  }, [stats, loading]);

  // Calculate max value for chart scaling
  const maxViews = stats?.weeklyData ? Math.max(...stats.weeklyData.map(d => d.views)) : 100;

  if (loading && !stats) {
    return (
      <div className="w-full h-full bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  const propertyTypeColors: Record<string, string> = {
    commercial: "bg-indigo-500",
    residential: "bg-emerald-500",
    "mixed-use": "bg-amber-500",
    hospitality: "bg-rose-500",
    industrial: "bg-cyan-500",
    healthcare: "bg-purple-500",
    other: "bg-slate-500",
  };

  const totalPropertyTypes = stats?.propertyTypes 
    ? Object.values(stats.propertyTypes).reduce((a, b) => a + b, 0) 
    : 1;

  return (
    <div className="w-full h-full bg-slate-900 p-4 overflow-hidden">
      {/* Top Stats Row */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[
          { icon: FileText, label: "Total Pitches", value: stats?.totalPitches || 0, change: "+2", up: true },
          { icon: DollarSign, label: "Total Value", value: formatCurrency(stats?.totalValue || 0), change: "+18%", up: true },
          { icon: Eye, label: "Views", value: formatNumber(stats?.totalViews || 0), change: "+234", up: true },
          { icon: TrendingUp, label: "Conversion", value: `${stats?.conversionRate || 0}%`, change: "+5%", up: true },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="bg-slate-800/80 rounded-lg p-3 border border-slate-700/50"
          >
            <div className="flex items-center justify-between mb-1">
              <stat.icon className="w-4 h-4 text-blue-400" />
              <span className={`text-[10px] flex items-center gap-0.5 ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>
                {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <div className="text-white font-bold text-sm">{typeof stat.value === 'number' ? stat.value : stat.value}</div>
            <div className="text-slate-400 text-[10px]">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-3">
        {/* Pitch Cards */}
        <div className="col-span-2 space-y-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-xs font-medium">Recent Pitches</span>
            <span className="text-blue-400 text-[10px]">View all →</span>
          </div>
          
          {(stats?.recentPitches || []).slice(0, 3).map((pitch, i) => (
            <motion.div
              key={pitch.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-slate-800/60 rounded-lg p-2.5 border border-slate-700/50 flex items-center gap-3 hover:border-blue-500/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-xs font-medium truncate">{pitch.title}</div>
                <div className="flex items-center gap-1 text-slate-400 text-[10px]">
                  <MapPin className="w-3 h-3" />
                  {pitch.location}
                </div>
              </div>
              <div className="text-right">
                <div className="text-white text-xs font-medium">{formatCurrency(pitch.value)}</div>
                <div className={`${pitch.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500'} text-[9px] px-1.5 py-0.5 rounded-full text-white`}>
                  {pitch.status === 'completed' ? 'completed' : 'in progress'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Panel - Charts */}
        <div className="space-y-3">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-800/60 rounded-lg p-3 border border-slate-700/50"
          >
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-3 h-3 text-blue-400" />
              <span className="text-white text-[10px] font-medium">Weekly Views</span>
            </div>
            <div className="h-16 flex items-end justify-between gap-1">
              {(stats?.weeklyData || []).map((data, i) => {
                const heightPercent = maxViews > 0 ? (data.views / maxViews) * 100 : 0;
                const isHighest = data.views === maxViews;
                return (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: animateCharts ? `${heightPercent}%` : 0 }}
                    transition={{ delay: 0.6 + i * 0.05, duration: 0.5 }}
                    className={`flex-1 rounded-sm ${isHighest ? 'bg-blue-500' : 'bg-slate-600'}`}
                    title={`${data.day}: ${data.views} views`}
                  />
                );
              })}
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-slate-500 text-[8px]">Mon</span>
              <span className="text-slate-500 text-[8px]">Sun</span>
            </div>
          </motion.div>

          {/* Property Types */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-slate-800/60 rounded-lg p-3 border border-slate-700/50"
          >
            <div className="flex items-center gap-2 mb-2">
              <PieChart className="w-3 h-3 text-purple-400" />
              <span className="text-white text-[10px] font-medium">Property Mix</span>
            </div>
            <div className="flex items-center gap-3">
              {/* Mini Pie Chart */}
              <svg width="50" height="50" viewBox="0 0 50 50" className="flex-shrink-0">
                <circle cx="25" cy="25" r="20" fill="none" stroke="#4f46e5" strokeWidth="8" strokeDasharray="50 75" strokeDashoffset="0" />
                <circle cx="25" cy="25" r="20" fill="none" stroke="#22c55e" strokeWidth="8" strokeDasharray="30 95" strokeDashoffset="-50" />
                <circle cx="25" cy="25" r="20" fill="none" stroke="#f59e0b" strokeWidth="8" strokeDasharray="20 105" strokeDashoffset="-80" />
                <circle cx="25" cy="25" r="20" fill="none" stroke="#64748b" strokeWidth="8" strokeDasharray="25 100" strokeDashoffset="-100" />
              </svg>
              <div className="space-y-1">
                {stats?.propertyTypes && Object.entries(stats.propertyTypes).slice(0, 4).map(([type, count], i) => {
                  const percentage = Math.round((count / totalPropertyTypes) * 100);
                  return (
                    <div key={type} className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${propertyTypeColors[type] || 'bg-slate-500'}`} />
                      <span className="text-slate-400 text-[8px] capitalize">{type.replace('-', ' ')}</span>
                      <span className="text-white text-[8px] font-medium ml-auto">{percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg p-3 border border-blue-500/30"
          >
            <div className="text-blue-400 text-[10px] mb-1">AI Generated</div>
            <div className="text-white text-lg font-bold">{stats?.totalPitches || 0}</div>
            <div className="text-slate-400 text-[10px]">Pitch decks this month</div>
            <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: animateCharts ? `${Math.min((stats?.totalPitches || 0) / 15 * 100, 100)}%` : 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" 
              />
            </div>
            <div className="text-slate-500 text-[8px] mt-1">{Math.min(Math.round((stats?.totalPitches || 0) / 15 * 100), 100)}% of monthly goal</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
