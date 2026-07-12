import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';

export function RadarComparison({ data }) {
  return (
    <div className="h-80 w-full bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-center text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4">Legacy Distribution (Radar)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#64748b" />
          <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} tick={false} axisLine={false} />
          <Radar name="Mother" dataKey="mother" stroke="#ec4899" fill="#ec4899" fillOpacity={0.6} />
          <Radar name="Father" dataKey="father" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BarComparison({ data }) {
  return (
    <div className="h-80 w-full bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-center text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4">Factor Comparison (Bar)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} axisLine={false} />
          <Tooltip 
            cursor={{ fill: 'rgba(226, 232, 240, 0.4)' }}
            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar dataKey="mother" name="Mother" fill="#ec4899" radius={[4, 4, 0, 0]} />
          <Bar dataKey="father" name="Father" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
