import { prisma } from '@/src/lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function AdminAdsPage() {
  const ads = await prisma.bannerAd.findMany({ orderBy: { createdAt: 'desc' } });

  async function addBanner(formData: FormData) {
    'use server';
    await prisma.bannerAd.create({
      data: {
        imageUrl: String(formData.get('imageUrl')),
        targetUrl: String(formData.get('targetUrl')),
        placement: String(formData.get('placement')),
        localeTarget: String(formData.get('localeTarget') || 'all'),
        pageTarget: String(formData.get('pageTarget') || 'all'),
        status: 'ACTIVE'
      }
    });
    revalidatePath('/admin/ads');
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Ads & banners</h1>
      <form action={addBanner} className="card p-5 grid grid-cols-1 md:grid-cols-2 gap-3">
        <input name="imageUrl" placeholder="Image URL" required className="border border-slate-200 rounded-lg px-3 py-2" />
        <input name="targetUrl" placeholder="Target URL" required className="border border-slate-200 rounded-lg px-3 py-2" />
        <select name="placement" className="border border-slate-200 rounded-lg px-3 py-2">
          <option value="top">Top</option>
          <option value="sidebar">Sidebar</option>
          <option value="in-content">In-content</option>
          <option value="footer">Footer</option>
        </select>
        <select name="localeTarget" className="border border-slate-200 rounded-lg px-3 py-2">
          <option value="all">All locales</option>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="or">Odia</option>
        </select>
        <input name="pageTarget" placeholder="Page target (all/tools/jobs/docs)" className="border border-slate-200 rounded-lg px-3 py-2" />
        <button className="md:col-span-2 py-3 rounded-lg bg-primary text-white font-semibold">Save banner</button>
      </form>
      <div className="card p-4 space-y-3">
        {ads.map((ad) => (
          <div key={ad.id} className="border border-slate-200 rounded-lg p-3">
            <div className="font-semibold text-slate-800">{ad.placement} • {ad.localeTarget}</div>
            <div className="text-sm text-slate-600">{ad.targetUrl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
