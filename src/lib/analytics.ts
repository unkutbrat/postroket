import { AnalyticsEvent, AnalyticsPageView, PaymentStatus } from '@prisma/client';
import { prisma } from './prisma';

export async function recordPageView(data: Omit<AnalyticsPageView, 'id' | 'createdAt'>) {
  await prisma.analyticsPageView.create({ data });
}

export async function recordEvent(data: { type: string; payload: any; locale?: string; toolId?: string }) {
  await prisma.analyticsEvent.create({ data });
}

export async function markJobPaid(jobId: string) {
  await prisma.jobPost.update({ where: { id: jobId }, data: { paymentStatus: PaymentStatus.PAID } });
}
