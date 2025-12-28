import { SectionHeader } from '@/src/components/cards';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function DocsLanding({ params }: { params: { locale: string } }) {
  const t = await getTranslations('docs');
  return (
    <div className="space-y-6">
      <SectionHeader title={t('title')} description={t('subtitle')} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DocCard href={`/${params.locale}/docs/invoice-generator`} title={t('invoice')} />
        <DocCard href={`/${params.locale}/docs/resume-builder`} title={t('resume')} />
        <DocCard href={`/${params.locale}/docs/letter-generator`} title={t('letter')} />
      </div>
    </div>
  );
}

function DocCard({ href, title }: { href: string; title: string }) {
  return (
    <Link href={href} className="card p-5 hover:shadow-lg transition-shadow">
      <div className="text-sm text-primary uppercase mb-2">Tool</div>
      <div className="text-lg font-semibold text-slate-900">{title}</div>
    </Link>
  );
}
