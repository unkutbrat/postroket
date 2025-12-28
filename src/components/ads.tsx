import { prisma } from '@/src/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';

export async function BannerAdPlacement({ placement, locale, page }: { placement: string; locale?: string; page?: string }) {
  const now = new Date();
  const ads = await prisma.bannerAd.findMany({
    where: {
      placement,
      status: 'ACTIVE',
      AND: [
        { OR: [{ startAt: null }, { startAt: { lte: now } }] },
        { OR: [{ endAt: null }, { endAt: { gte: now } }] },
        { OR: [{ localeTarget: 'all' }, { localeTarget: locale ?? 'all' }] }
      ]
    },
    orderBy: { createdAt: 'desc' },
    take: 1
  });

  if (!ads.length) {
    return <div className="card p-4 text-sm text-slate-500 text-center border-dashed border-2 border-slate-200">Ad space • {placement}</div>;
  }

  const ad = ads[0];

  return (
    <Link href={ad.targetUrl} className="block card overflow-hidden">
      <div className="relative w-full h-32">
        <Image src={ad.imageUrl} alt="Ad" fill className="object-cover" />
      </div>
    </Link>
  );
}
