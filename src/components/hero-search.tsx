'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { toolDefinitions } from '@/src/data/tools';
import { seedJobs } from '@/src/data/seed';

export function HeroSearch({ locale, placeholder }: { locale: string; placeholder: string }) {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    const tools = toolDefinitions
      .filter((tool) => tool.titles.en.toLowerCase().includes(q) || tool.description.en.toLowerCase().includes(q))
      .map((tool) => ({ type: 'tool', title: tool.titles[locale] ?? tool.titles.en, href: `/${locale}/tools/${tool.slug}` }));
    const jobs = seedJobs
      .filter((job) => job.title.toLowerCase().includes(q) || job.companyName.toLowerCase().includes(q))
      .map((job) => ({ type: 'job', title: `${job.title} • ${job.companyName}`, href: `/${locale}/jobs/${job.slug}` }));
    return [...tools, ...jobs].slice(0, 6);
  }, [query, locale]);

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white shadow-card border border-slate-100">
        <Search className="w-5 h-5 text-primary" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full outline-none text-slate-800 placeholder:text-slate-400"
        />
      </div>
      {results.length > 0 && (
        <div className="absolute mt-2 w-full bg-white border border-slate-100 rounded-2xl shadow-card overflow-hidden z-10">
          {results.map((res, idx) => (
            <Link key={idx} href={res.href} className="block px-4 py-3 hover:bg-slate-50 text-sm">
              <span className="uppercase text-[11px] text-primary mr-2">{res.type}</span>
              {res.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
