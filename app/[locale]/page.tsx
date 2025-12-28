import { AdsRow } from '@/src/components/cards';
import { BannerAdPlacement } from '@/src/components/ads';
import { HeroSearch } from '@/src/components/hero-search';
import { getTools, getJobs } from '@/src/data/store';
import { toolDefinitions } from '@/src/data/tools';
import { JobCard, SectionHeader, ToolCard } from '@/src/components/cards';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return {
    title: `Postroket • Finance tools, jobs, documents (${params.locale})`,
    description: 'Multilingual finance calculators, hiring board, and PDF generators.',
    alternates: {
      canonical: `https://postroket.com/${params.locale}`
    },
    openGraph: {
      title: 'Postroket',
      description: 'Finance tools, jobs, and document generators.',
      url: `https://postroket.com/${params.locale}`
    }
  };
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  const tHome = await getTranslations('home');
  const tools = await getTools();
  const jobs = await getJobs(6);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Postroket',
    url: `https://postroket.com/${params.locale}`,
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://postroket.com/${params.locale}/search?q={query}`,
      'query-input': 'required name=query'
    }
  };
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Postroket',
    url: 'https://postroket.com',
    logo: 'https://postroket.com/logo.png'
  };

  return (
    <div className="space-y-10">
      <section className="card p-8 md:p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-white to-accent/10 pointer-events-none" />
        <div className="relative space-y-6">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm uppercase tracking-wide text-primary">Postroket</p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">{tHome('heroTitle')}</h1>
            <p className="text-lg text-slate-700">{tHome('heroSubtitle')}</p>
          </div>
          <HeroSearch locale={params.locale} placeholder={tHome('searchPlaceholder')} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FeatureCard title={tHome('finance')} description="CTC to in-hand, HRA, PF, gratuity, EMI, GST." href={`/${params.locale}/tools`} />
            <FeatureCard title={tHome('jobs')} description="Search and publish roles with admin approvals." href={`/${params.locale}/jobs`} />
            <FeatureCard title={tHome('docs')} description="Invoices, resumes, and HR letters with PDF export." href={`/${params.locale}/docs`} />
          </div>
        </div>
      </section>

      <BannerAdPlacement placement="top" locale={params.locale} />

      <section className="space-y-4">
        <SectionHeader
          title={tHome('popularTools')}
          action={<Link href={`/${params.locale}/tools`} className="text-primary text-sm font-semibold">View all</Link>}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tools
            .sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0))
            .slice(0, 6)
            .map((tool) => (
              <ToolCard key={tool.slug} tool={tool} locale={params.locale} />
            ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          title={tHome('latestJobs')}
          action={<Link href={`/${params.locale}/jobs`} className="text-primary text-sm font-semibold">View all</Link>}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <JobCard key={job.slug + job.companyName} job={job} locale={params.locale} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader title="Document generators" description="Invoice, resume, and letter makers ready to export." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeatureCard title="Invoice generator" description="Line items, taxes, totals, logo upload." href={`/${params.locale}/docs/invoice-generator`} />
          <FeatureCard title="Resume builder" description="Profile, experience, skills with PDF." href={`/${params.locale}/docs/resume-builder`} />
          <FeatureCard title="Letter generator" description="Offer, experience, salary and leave letters." href={`/${params.locale}/docs/letter-generator`} />
        </div>
      </section>

      <AdsRow />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
    </div>
  );
}

function FeatureCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link href={href} className="card p-5 flex flex-col gap-2 hover:shadow-lg transition-shadow">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <p className="text-sm text-slate-600">{description}</p>
    </Link>
  );
}
