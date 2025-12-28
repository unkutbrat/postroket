import { prisma } from '@/src/lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function AdminDocsPage() {
  const settings = await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {}
  });

  async function save(formData: FormData) {
    'use server';
    const contactEmail = String(formData.get('contactEmail') || '');
    const contactPhone = String(formData.get('contactPhone') || '');
    await prisma.siteSettings.update({ where: { id: 1 }, data: { contactEmail, contactPhone } });
    revalidatePath('/admin/docs');
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Document tools</h1>
      <form action={save} className="card p-5 space-y-3 max-w-xl">
        <label className="text-sm text-slate-700">Contact email (for document footer)</label>
        <input name="contactEmail" defaultValue={settings.contactEmail ?? ''} className="w-full border border-slate-200 rounded-lg px-3 py-2" />
        <label className="text-sm text-slate-700">Contact phone</label>
        <input name="contactPhone" defaultValue={settings.contactPhone ?? ''} className="w-full border border-slate-200 rounded-lg px-3 py-2" />
        <button className="w-full py-3 rounded-lg bg-primary text-white font-semibold">Save</button>
      </form>
    </div>
  );
}
