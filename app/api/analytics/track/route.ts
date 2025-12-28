import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function POST(request: Request) {
  const body = await request.json();
  const { path, locale, device, referrer } = body;
  if (!path) return NextResponse.json({ ok: false }, { status: 400 });
  await prisma.analyticsPageView.create({
    data: {
      path,
      locale: locale || 'en',
      device: device || 'unknown',
      referrer: referrer || ''
    }
  });
  return NextResponse.json({ ok: true });
}
