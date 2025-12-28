export const dynamic = 'force-dynamic';

import { AnalyticsScript } from '@/src/components/analytics-script';
import { SiteHeader } from '@/src/components/site-header';
import { locales } from '@/src/i18n/config';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();

  async function signOutAction() {
    'use server';
    await signOut();
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 min-h-screen">
          <div className="w-full bg-white border-b border-slate-200 flex items-center justify-between px-6 py-3">
            <div>
              <div className="text-sm text-slate-500">Signed in as</div>
              <div className="font-semibold text-slate-800">{user.name} • {user.role}</div>
            </div>
            <form action={signOutAction}>
              <button type="submit" className="px-3 py-2 rounded-lg bg-slate-900 text-white text-sm">Sign out</button>
            </form>
          </div>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
