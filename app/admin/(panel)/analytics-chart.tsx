'use client';

import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Point = { date: string; views: number };

export function AnalyticsChart() {
  const [data, setData] = useState<Point[]>([]);

  useEffect(() => {
    fetch('/api/analytics/summary')
      .then((res) => res.json())
      .then((json) => setData(json.points))
      .catch(() => setData([]));
  }, []);

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="views" stroke="#2563eb" fill="#bfdbfe" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
