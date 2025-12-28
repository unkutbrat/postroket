import { PaymentProvider } from '@prisma/client';
import { prisma } from '@/src/lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function AdminSettingsPage() {
  const site = await prisma.siteSettings.upsert({ where: { id: 1 }, update: {}, create: {} });
  const payment = await prisma.paymentSettings.upsert({ where: { id: 1 }, update: {}, create: {} });

  async function saveSite(formData: FormData) {
    'use server';
    await prisma.siteSettings.update({
      where: { id: 1 },
      data: {
        siteName: String(formData.get('siteName') || ''),
        domain: String(formData.get('domain') || ''),
        contactEmail: String(formData.get('contactEmail') || ''),
        contactPhone: String(formData.get('contactPhone') || '')
      }
    });
    revalidatePath('/admin/settings');
  }

  async function savePayment(formData: FormData) {
    'use server';
    await prisma.paymentSettings.update({
      where: { id: 1 },
      data: {
        provider: formData.get('provider') as PaymentProvider,
        razorpayKey: String(formData.get('razorpayKey') || ''),
        razorpaySecret: String(formData.get('razorpaySecret') || ''),
        stripeKey: String(formData.get('stripeKey') || ''),
        stripeSecret: String(formData.get('stripeSecret') || ''),
        currency: String(formData.get('currency') || 'INR')
      }
    });
    revalidatePath('/admin/settings');
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
      <form action={saveSite} className="card p-5 grid grid-cols-1 md:grid-cols-2 gap-3">
        <input name="siteName" defaultValue={site.siteName} placeholder="Site name" className="border border-slate-200 rounded-lg px-3 py-2" />
        <input name="domain" defaultValue={site.domain} placeholder="Domain" className="border border-slate-200 rounded-lg px-3 py-2" />
        <input name="contactEmail" defaultValue={site.contactEmail ?? ''} placeholder="Contact email" className="border border-slate-200 rounded-lg px-3 py-2" />
        <input name="contactPhone" defaultValue={site.contactPhone ?? ''} placeholder="Contact phone" className="border border-slate-200 rounded-lg px-3 py-2" />
        <button className="md:col-span-2 py-3 rounded-lg bg-primary text-white font-semibold">Save site settings</button>
      </form>

      <form action={savePayment} className="card p-5 grid grid-cols-1 md:grid-cols-2 gap-3">
        <select name="provider" defaultValue={payment.provider} className="border border-slate-200 rounded-lg px-3 py-2">
          {Object.values(PaymentProvider).map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <input name="currency" defaultValue={payment.currency} placeholder="Currency" className="border border-slate-200 rounded-lg px-3 py-2" />
        <input name="razorpayKey" defaultValue={payment.razorpayKey ?? ''} placeholder="Razorpay key (placeholder)" className="border border-slate-200 rounded-lg px-3 py-2" />
        <input name="razorpaySecret" defaultValue={payment.razorpaySecret ?? ''} placeholder="Razorpay secret (placeholder)" className="border border-slate-200 rounded-lg px-3 py-2" />
        <input name="stripeKey" defaultValue={payment.stripeKey ?? ''} placeholder="Stripe key (placeholder)" className="border border-slate-200 rounded-lg px-3 py-2" />
        <input name="stripeSecret" defaultValue={payment.stripeSecret ?? ''} placeholder="Stripe secret (placeholder)" className="border border-slate-200 rounded-lg px-3 py-2" />
        <button className="md:col-span-2 py-3 rounded-lg bg-primary text-white font-semibold">Save payment settings</button>
      </form>
    </div>
  );
}
