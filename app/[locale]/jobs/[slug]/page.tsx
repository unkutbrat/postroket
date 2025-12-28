import { BannerAdPlacement } from '@/src/components/ads';
import { SectionHeader } from '@/src/components/cards';
import { getJobBySlug } from '@/src/data/store';
import { formatCurrency } from '@/src/lib/utils';
import { notFound } from 'next/navigation';

export default async function JobDetail({ params }: { params: { locale: string; slug: string } }) {
  const job = await getJobBySlug(params.slug);
  if (!job) notFound();
  const jobLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    hiringOrganization: {
      '@type': 'Organization',
      name: job.companyName
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.locationCity,
        addressRegion: job.locationState,
        addressCountry: 'IN'
      }
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: {
        '@type': 'QuantitativeValue',
        minValue: job.salaryMin,
        maxValue: job.salaryMax,
        unitText: 'YEAR'
      }
    },
    validThrough: job.publishedAt ? new Date(job.publishedAt).toISOString() : undefined
  };

  return (
    <div className="space-y-6">
      <SectionHeader title={job.title} description={`${job.companyName} • ${job.locationCity}, ${job.locationState}`} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="card p-5 space-y-2">
            <div className="text-sm text-slate-600">Salary</div>
            <div className="font-semibold text-slate-900">
              {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}
            </div>
            <div className="text-sm text-slate-600">Experience: {job.experienceMin}-{job.experienceMax} years</div>
            <div className="text-sm text-slate-700 whitespace-pre-wrap">{job.description}</div>
          </div>
          <BannerAdPlacement placement="in-content" locale={params.locale} />
        </div>
        <div className="space-y-4">
          <div className="card p-4 space-y-2">
            <div className="text-sm text-slate-600">Contact email</div>
            <div className="font-semibold text-slate-900">{job.contactEmail}</div>
            <div className="text-sm text-slate-600">Contact phone</div>
            <div className="font-semibold text-slate-900">{job.contactPhone}</div>
          </div>
          <BannerAdPlacement placement="sidebar" locale={params.locale} />
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobLd) }} />
    </div>
  );
}
