export const dynamic = 'force-dynamic';

import { prisma } from '@/src/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const start = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const grouped = await prisma.analyticsPageView.groupBy({
    by: ['createdAt'],
    where: { createdAt: { gte: start } },
    _count: { _all: true }
  });

  const byDay = grouped.reduce<Record<string, number>>((acc, item) => {
    const date = item.createdAt.toISOString().slice(0, 10);
    acc[date] = (acc[date] || 0) + item._count._all;
    return acc;
  }, {});

  const points = Object.entries(byDay)
    .sort(([a], [b]) => (a > b ? 1 : -1))
    .map(([date, views]) => ({ date, views }));

  return NextResponse.json({ points });
}
