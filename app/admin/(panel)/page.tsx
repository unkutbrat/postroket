import { prisma } from '@/src/lib/prisma';
import { SectionHeader } from '@/src/components/cards';
import { AnalyticsChart } from './analytics-chart';

export default async function AdminDashboard() {
  const [users, tools, jobs, views] = await Promise.all([
    prisma.internalUser.count(),
    prisma.tool.count(),
    prisma.jobPost.count(),
    prisma.analyticsPageView.count({ where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } })
  ]);

  const topPages = await prisma.analyticsPageView.groupBy({
    by: ['path'],
    _count: { path: true },
    orderBy: { _count: { path: 'desc' } },
    take: 5
  });

  return (
    <div className="space-y-6">
      <SectionHeader title="Dashboard" description="Overview of platform activity" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Internal users" value={users} />
        <StatCard title="Tools" value={tools} />
        <StatCard title="Jobs" value={jobs} />
        <StatCard title="Page views (7d)" value={views} />
      </div>
      <div className="card p-4">
        <AnalyticsChart />
      </div>
      <div className="card p-4">
        <h3 className="text-sm font-semibold text-slate-800 mb-3">Top pages</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          {topPages.map((item) => (
            <li key={item.path} className="flex justify-between">
              <span>{item.path}</span>
              <span className="font-semibold">{item._count.path}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="card p-4">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="text-2xl font-semibold text-slate-900 mt-1">{value}</div>
    </div>
  );
}
