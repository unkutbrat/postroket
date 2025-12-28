import Link from 'next/link';
import { LanguageSwitcher } from './language-switcher';
import { Search } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export async function SiteHeader({ locale }: { locale: string }) {
  const tNav = await getTranslations('nav');

  return (
    <header className="w-full border-b border-slate-100 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href={`/${locale}`} className="flex items-center gap-2 font-semibold text-slate-900 text-lg">
          <span className="text-primary">Postroket</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4 text-sm text-slate-700">
          <Link href={`/${locale}/tools`} className="hover:text-primary">{tNav('tools')}</Link>
          <Link href={`/${locale}/jobs`} className="hover:text-primary">{tNav('jobs')}</Link>
          <Link href={`/${locale}/docs`} className="hover:text-primary">{tNav('docs')}</Link>
          <Link href="/admin" className="hover:text-primary">{tNav('admin')}</Link>
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full border border-slate-200 bg-slate-50 text-sm text-slate-600">
            <Search className="w-4 h-4" />
            <span>{tNav('search')}</span>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
