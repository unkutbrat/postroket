import { AnalyticsScript } from '@/src/components/analytics-script';
import { SiteHeader } from '@/src/components/site-header';
import { locales } from '@/src/i18n/config';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;
  if (!locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SiteHeader locale={locale} />
      <AnalyticsScript locale={locale} />
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </NextIntlClientProvider>
  );
}
