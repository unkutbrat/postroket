import { JobCard, SectionHeader } from '@/src/components/cards';
import { BannerAdPlacement } from '@/src/components/ads';
import { getJobs } from '@/src/data/store';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function JobsPage({ params }: { params: { locale: string } }) {
  const jobs = await getJobs(24);
  const t = await getTranslations('jobs');

  return (
    <div className="space-y-6">
      <SectionHeader
        title={t('title')}
        description={t('subtitle')}
        action={<Link href={`/${params.locale}/jobs/post`} className="text-primary text-sm font-semibold">{t('postJob')}</Link>}
      />
      <BannerAdPlacement placement="top" locale={params.locale} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <JobCard key={job.slug + job.companyName} job={job} locale={params.locale} />
        ))}
      </div>
    </div>
  );
}
