import React, { useState, useEffect } from 'react';
import { Users, UserPlus, GitBranch, Activity, MapPin, Link as LinkIcon, Calendar, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useTheme } from 'next-themes';

const chartData = [
  { name: 'Jan', desktop: 185, mobile: 80 },
  { name: 'Feb', desktop: 305, mobile: 200 },
  { name: 'Mar', desktop: 235, mobile: 120 },
  { name: 'Apr', desktop: 275, mobile: 190 },
  { name: 'May', desktop: 210, mobile: 130 },
  { name: 'Jun', desktop: 315, mobile: 240 },
];

const smallChartData = [
  { day: 'M', commits: 12 },
  { day: 'T', commits: 19 },
  { day: 'W', commits: 15 },
  { day: 'T', commits: 25 },
  { day: 'F', commits: 22 },
  { day: 'S', commits: 8 },
  { day: 'S', commits: 14 },
];

export function MockProfileCard() {
  const [followers, setFollowers] = useState(2378);
  const [isHoveringChart, setIsHoveringChart] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted
    ? resolvedTheme === 'dark'
    : typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

  useEffect(() => {
    if (!isHoveringChart) return;
    
    // Simulate real-time follower changes
    const interval = setInterval(() => {
      setFollowers(prev => {
        // Mostly increase by 1-3, sometimes decrease by 1 to make it look realistic
        const change = Math.floor(Math.random() * 5) - 1; 
        return prev + change;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isHoveringChart]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-background rounded-xl border border-border p-4 flex flex-col gap-3 text-left font-sans relative z-20 overflow-hidden transition-colors duration-300">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-40 dark:opacity-20 bg-cover bg-center transition-opacity duration-300"
        style={{ backgroundImage: 'url(/assets/mock_cover.webp)' }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col gap-3">
        {/* Top Profile Card */}
        <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-border bg-background/60 backdrop-blur-md transition-colors duration-300">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-[#ffe082] p-0 flex items-center justify-center overflow-hidden border-2 border-background">
              <img src="/assets/avater.png" alt="Avatar" className="w-full h-full object-cover rounded-full" onError={(e) => { e.currentTarget.style.display = 'none' }} />
            </div>
          </div>
          <div className="flex flex-col flex-1 text-foreground">
            <h2 className="text-xl font-bold mb-1">Dhrubaraj Pati</h2>
            <p className="text-muted-foreground text-sm mb-2">@codewithdhruba01</p>
            <p className="text-sm mb-3 leading-relaxed">
              Full-stack dev (React . Node . Postgres) Building scalable, high-performance web applications.<br />
              Open to SDE-1 roles.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> india</div>
              <div className="flex items-center gap-1"><LinkIcon className="w-3.5 h-3.5" /> Website</div>
              <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Joined September 26, 2023</div>
            </div>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Followers */}
          <div className={`flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-background/60 backdrop-blur-sm transition-colors duration-300 ${isHoveringChart ? 'border-blue-500/50 bg-blue-500/10' : ''}`}>
            <Users className="w-6 h-6 text-blue-500 mb-2" />
            <span className={`text-2xl font-bold mb-1 transition-colors duration-300 ${isHoveringChart ? 'text-blue-600 dark:text-blue-400' : 'text-foreground'}`}>
              {followers.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">Followers</span>
          </div>
          {/* Following */}
          <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-background/60 backdrop-blur-md transition-colors duration-300">
            <UserPlus className="w-6 h-6 text-green-500 mb-2" />
            <span className="text-2xl font-bold text-foreground mb-1">137</span>
            <span className="text-xs text-muted-foreground">Following</span>
          </div>
          {/* Public Repos */}
          <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-background/60 backdrop-blur-md transition-colors duration-300">
            <GitBranch className="w-6 h-6 text-purple-500 mb-2" />
            <span className="text-2xl font-bold text-foreground mb-1">70</span>
            <span className="text-xs text-muted-foreground">Public Repos</span>
          </div>
          {/* Account Age */}
          <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-background/60 backdrop-blur-md transition-colors duration-300">
            <Activity className="w-6 h-6 text-orange-500 mb-2" />
            <span className="text-2xl font-bold text-foreground mb-1">3 years</span>
            <span className="text-xs text-muted-foreground">Account Age</span>
          </div>
        </div>

        {/* Bottom Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Profile Insights Chart */}
          <div className="md:col-span-2 p-4 rounded-xl border border-border bg-background/60 dark:bg-[#1a1b1e]/80 backdrop-blur-md flex flex-col gap-4 transition-colors duration-300">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              <h3 className="text-lg font-bold text-foreground">Profile Insights</h3>
              {isHoveringChart && (
                <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 animate-pulse bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Live Updates
                </span>
              )}
            </div>

            <div 
              className="h-[220px] w-full cursor-crosshair"
              onMouseEnter={() => setIsHoveringChart(true)}
              onMouseLeave={() => setIsHoveringChart(false)}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`desktopGrad-${isDark ? 'dark' : 'light'}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={isDark ? "#60a5fa" : "#3b82f6"} stopOpacity={1} />
                      <stop offset="100%" stopColor={isDark ? "#1d4ed8" : "#2563eb"} stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#9ca3af' : '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#9ca3af' : '#64748b', fontSize: 12 }} ticks={[0, 80, 160, 240, 320]} />
                  <Tooltip 
                    cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }} 
                    contentStyle={{
                      backgroundColor: isDark ? '#18181b' : '#ffffff',
                      borderColor: isDark ? '#27272a' : '#e2e8f0',
                      color: isDark ? '#f4f4f5' : '#0f172a',
                      borderRadius: '8px',
                      boxShadow: isDark ? '0 4px 14px rgba(0,0,0,0.5)' : '0 4px 14px rgba(0,0,0,0.08)',
                      fontSize: '12px'
                    }}
                    itemStyle={{ color: isDark ? '#e4e4e7' : '#1e293b' }}
                    labelStyle={{ color: isDark ? '#a1a1aa' : '#64748b', fontWeight: 600, marginBottom: '4px' }}
                  />
                  <Bar dataKey="desktop" name="Desktop" fill={`url(#desktopGrad-${isDark ? 'dark' : 'light'})`} radius={[3, 3, 0, 0]} barSize={22} />
                  <Bar dataKey="mobile" name="Mobile" fill={isDark ? "#38bdf8" : "#60a5fa"} radius={[3, 3, 0, 0]} barSize={22} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Column: Metrics & Small Graph */}
          <div className="flex flex-col gap-4">
            {/* Profile Metrics Card */}
            <div className="p-4 rounded-xl border border-border bg-background/60 dark:bg-[#1a1b1e]/80 backdrop-blur-sm flex flex-col h-fit transition-colors duration-300">
              <h4 className="text-base font-semibold text-foreground mb-4">Profile Metrics</h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p className="flex items-center justify-between border-b border-border pb-2">
                  <span>Follower Ratio:</span> <span className="text-foreground font-semibold">2.54</span>
                </p>
                <p className="flex items-center justify-between border-b border-border pb-2">
                  <span>Repos per Year:</span> <span className="text-foreground font-semibold">23</span>
                </p>
                <p className="flex items-center justify-between">
                  <span>Last Updated:</span> <span className="text-foreground font-semibold">Oct 2, 2026</span>
                </p>
              </div>
            </div>
            
            {/* Small Graph Card */}
            <div className="p-3.5 rounded-xl border border-border bg-background/60 dark:bg-[#1a1b1e]/80 backdrop-blur-sm flex flex-col h-fit transition-colors duration-300">
              <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-500" /> Commits Activity
              </h4>
              <div className="h-[70px] w-full mt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={smallChartData}>
                    <Tooltip 
                      cursor={{ stroke: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)', strokeWidth: 1 }} 
                      contentStyle={{ 
                        backgroundColor: isDark ? '#18181b' : '#ffffff', 
                        borderColor: isDark ? '#27272a' : '#e2e8f0', 
                        color: isDark ? '#f4f4f5' : '#0f172a', 
                        fontSize: '12px',
                        borderRadius: '8px',
                        boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.5)' : '0 4px 12px rgba(0,0,0,0.08)'
                      }} 
                      itemStyle={{ color: isDark ? '#e4e4e7' : '#1e293b' }}
                      labelStyle={{ color: isDark ? '#a1a1aa' : '#64748b', fontWeight: 600, marginBottom: '2px' }}
                    />
                    <Line type="monotone" dataKey="commits" stroke={isDark ? "#c084fc" : "#9333ea"} strokeWidth={2.5} dot={{ r: 3, fill: isDark ? "#c084fc" : "#9333ea" }} activeDot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
