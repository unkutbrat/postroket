import { prisma } from '@/src/lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function AdminSeoPage() {
  const glossary = await prisma.glossaryEntry.findMany({ orderBy: { term: 'asc' } });

  async function addTerm(formData: FormData) {
    'use server';
    const term = String(formData.get('term'));
    const definition = String(formData.get('definition'));
    const locale = String(formData.get('locale'));
    await prisma.glossaryEntry.upsert({
      where: { term_locale: { term, locale } },
      update: { definition },
      create: { term, definition, locale }
    });
    revalidatePath('/admin/seo');
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">SEO & Content</h1>
      <form action={addTerm} className="card p-5 grid grid-cols-1 md:grid-cols-3 gap-3">
        <input name="term" placeholder="Term" required className="border border-slate-200 rounded-lg px-3 py-2" />
        <select name="locale" className="border border-slate-200 rounded-lg px-3 py-2">
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="or">Odia</option>
        </select>
        <textarea name="definition" placeholder="Definition" required className="md:col-span-3 border border-slate-200 rounded-lg px-3 py-2 h-20" />
        <button className="md:col-span-3 py-3 rounded-lg bg-primary text-white font-semibold">Save term</button>
      </form>
      <div className="card p-4 space-y-2">
        {glossary.map((item) => (
          <div key={item.id} className="flex items-center justify-between border border-slate-200 rounded-lg px-3 py-2">
            <div>
              <div className="font-semibold text-slate-800">{item.term} ({item.locale})</div>
              <div className="text-sm text-slate-600">{item.definition}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
