'use client';

import { localeLabels, locales } from '@/src/i18n/config';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const currentLocale = locales.includes(segments[1] as any) ? (segments[1] as string) : 'en';

  const withoutLocale = locales.includes(segments[1] as any) ? `/${segments.slice(2).join('/')}` : pathname;

  return (
    <div className="flex items-center gap-2">
      <Languages className="w-4 h-4 text-slate-600" />
      <div className="flex gap-1">
        {locales.map((locale) => (
          <Link
            key={locale}
            href={`/${locale}${withoutLocale === '/' ? '' : withoutLocale}`}
            className={`px-2 py-1 rounded-full text-sm border ${locale === currentLocale ? 'bg-primary text-white border-primary' : 'border-slate-200 bg-white'}`}
          >
            {localeLabels[locale]}
          </Link>
        ))}
      </div>
    </div>
  );
}
