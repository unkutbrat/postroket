import { prisma } from '@/src/lib/prisma';
import { slugify } from '@/src/lib/utils';
import { revalidatePath } from 'next/cache';

export default async function AdminToolsPage() {
  const tools = await prisma.tool.findMany({ orderBy: { createdAt: 'desc' } });

  async function createTool(formData: FormData) {
    'use server';
    const title = String(formData.get('title') || '');
    const slug = slugify(title);
    await prisma.tool.create({
      data: {
        slug,
        category: String(formData.get('category') || 'general'),
        popular: Boolean(formData.get('popular')),
        order: Number(formData.get('order') || 0)
      }
    });
    revalidatePath('/admin/tools');
  }

  return (
    <div className="space-y-6">
      <div className="card p-4">
        <h2 className="text-lg font-semibold text-slate-900">Add tool</h2>
        <form action={createTool} className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3">
          <input name="title" placeholder="Title" required className="border border-slate-200 rounded-lg px-3 py-2" />
          <input name="category" placeholder="Category" className="border border-slate-200 rounded-lg px-3 py-2" />
          <input name="order" placeholder="Order" type="number" className="border border-slate-200 rounded-lg px-3 py-2" />
          <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" name="popular" /> Popular</label>
          <button type="submit" className="md:col-span-4 py-3 rounded-lg bg-primary text-white font-semibold">Save</button>
        </form>
      </div>
      <div className="card p-4">
        <h2 className="text-lg font-semibold text-slate-900">Existing tools</h2>
        <div className="divide-y divide-slate-200 mt-3">
          {tools.map((tool) => (
            <div key={tool.id} className="py-2 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-800">{tool.slug}</div>
                <div className="text-sm text-slate-600">Category: {tool.category}</div>
              </div>
              <div className="text-sm text-slate-600">{tool.popular ? 'Popular' : ''}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
