import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '@/src/lib/utils';
import { BannerAdPlacement } from './ads';

export function ToolCard({ locale, tool }: { locale: string; tool: any }) {
  return (
    <Link href={`/${locale}/tools/${tool.slug}`} className="card p-4 flex flex-col gap-2 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase text-slate-500">{tool.category}</div>
        <ArrowUpRight className="w-4 h-4 text-primary" />
      </div>
      <div className="font-semibold text-lg text-slate-900">{tool.titles?.[locale] ?? tool.titles?.en ?? tool.title}</div>
      <p className="text-sm text-slate-600">{tool.description?.[locale] ?? tool.description?.en}</p>
    </Link>
  );
}

export function JobCard({ locale, job }: { locale: string; job: any }) {
  const slugPath = job.id ? `${job.slug}-${job.id}` : job.slug;
  return (
    <Link href={`/${locale}/jobs/${slugPath}`} className="card p-4 flex flex-col gap-3 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between text-xs text-primary uppercase">
        {job.featured ? 'Featured' : 'Open'}
        <ArrowUpRight className="w-4 h-4" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
        <p className="text-sm text-slate-600">{job.companyName}</p>
      </div>
      <div className="text-sm text-slate-600">
        {job.locationCity}, {job.locationState}
      </div>
      <div className="text-sm text-slate-700">{formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}</div>
    </Link>
  );
}

export function SectionHeader({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        {description && <p className="text-sm text-slate-600 mt-1">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function AdsRow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <BannerAdPlacement placement="top" />
      <BannerAdPlacement placement="in-content" />
      <BannerAdPlacement placement="footer" />
    </div>
  );
}
