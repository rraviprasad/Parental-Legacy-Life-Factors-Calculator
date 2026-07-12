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

const MOTHER_COLOR = '#ec4899';
const FATHER_COLOR = '#3b82f6';

const CustomLegend = () => (
  <div className="flex justify-center gap-6 pt-4">
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: MOTHER_COLOR }}></span>
      <span className="text-sm text-slate-600 dark:text-slate-300">Mother</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: FATHER_COLOR }}></span>
      <span className="text-sm text-slate-600 dark:text-slate-300">Father</span>
    </div>
  </div>
);

export function RadarComparison({ data }) {
  return (
    <div className="h-96 w-full bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-center text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Legacy Distribution (Radar)</h3>
      <ResponsiveContainer width="100%" height="85%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#64748b" />
          <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} />
          <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} tick={false} axisLine={false} />
          <Radar name="Mother" dataKey="mother" stroke={MOTHER_COLOR} fill={MOTHER_COLOR} fillOpacity={0.5} />
          <Radar name="Father" dataKey="father" stroke={FATHER_COLOR} fill={FATHER_COLOR} fillOpacity={0.5} />
          <Tooltip
            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
            formatter={(value, name) => [value.toFixed(3), name]}
          />
        </RadarChart>
      </ResponsiveContainer>
      <CustomLegend />
    </div>
  );
}

export function BarComparison({ data }) {
  return (
    <div className="h-96 w-full bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-center text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Factor Comparison (Bar)</h3>
      <ResponsiveContainer width="100%" height="85%">
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
          <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} axisLine={false} />
          <Tooltip
            cursor={{ fill: 'rgba(226, 232, 240, 0.4)' }}
            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
            formatter={(value, name) => [value.toFixed(3), name]}
          />
          <Bar dataKey="mother" name="Mother" fill={MOTHER_COLOR} radius={[4, 4, 0, 0]} />
          <Bar dataKey="father" name="Father" fill={FATHER_COLOR} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <CustomLegend />
    </div>
  );
}
