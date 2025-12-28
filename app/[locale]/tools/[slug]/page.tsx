import { BannerAdPlacement } from '@/src/components/ads';
import { SectionHeader } from '@/src/components/cards';
import { Calculator } from './Calculator';
import { getToolBySlug } from '@/src/data/store';
import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import { toolDefinitions } from '@/src/data/tools';

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }) {
  const tool = await getToolBySlug(params.slug);
  if (!tool) return {};
  const title = `${tool.titles?.[params.locale] ?? tool.titles?.en} • Postroket`;
  const description = tool.description?.[params.locale] ?? tool.description?.en;
  return {
    title,
    description,
    alternates: { canonical: `https://postroket.com/${params.locale}/tools/${tool.slug}` },
    openGraph: { title, description }
  };
}

export default async function ToolDetailPage({ params }: { params: { locale: string; slug: string } }) {
  const tool = await getToolBySlug(params.slug);
  if (!tool) notFound();
  const contentPath = path.join(process.cwd(), 'content', 'tools', params.locale, `${params.slug}.mdx`);
  const body = await fs.readFile(contentPath, 'utf8').catch(async () => {
    const fallback = path.join(process.cwd(), 'content', 'tools', 'en', `${params.slug}.mdx`);
    return fs.readFile(fallback, 'utf8');
  });
  const faqs = tool.faqs?.filter((f: any) => f.locale === params.locale) ?? (tool as any).faqs?.[params.locale] ?? [];
  const related = toolDefinitions.filter((t) => t.category === tool.category && t.slug !== tool.slug).slice(0, 3);
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq: any) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm uppercase text-primary">{tool.category}</p>
        <h1 className="text-2xl font-bold text-slate-900">{tool.titles?.[params.locale] ?? tool.titles?.en}</h1>
        <p className="text-slate-700">{tool.description?.[params.locale] ?? tool.description?.en}</p>
      </div>

      <BannerAdPlacement placement="top" locale={params.locale} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Calculator slug={params.slug} locale={params.locale} />
          <div className="card p-5 prose max-w-none prose-slate">
            <div className="text-sm uppercase text-primary mb-2">Explanation</div>
            <pre className="whitespace-pre-wrap text-sm text-slate-700">{body}</pre>
          </div>
          <div className="card p-5">
            <SectionHeader title="FAQs" />
            <div className="space-y-3 mt-3">
              {faqs.map((faq: any, idx: number) => (
                <details key={idx} className="rounded-lg border border-slate-200 p-3">
                  <summary className="font-semibold text-slate-800 cursor-pointer">{faq.question}</summary>
                  <p className="text-sm text-slate-700 mt-2">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <BannerAdPlacement placement="sidebar" locale={params.locale} />
          <div className="card p-4 space-y-3">
            <h3 className="font-semibold text-slate-800">Related tools</h3>
            <ul className="space-y-2 text-sm">
              {related.map((rel) => (
                <li key={rel.slug}>
                  <a href={`/${params.locale}/tools/${rel.slug}`} className="text-primary hover:underline">
                    {rel.titles[params.locale] ?? rel.titles.en}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <BannerAdPlacement placement="in-content" locale={params.locale} />
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </div>
  );
}
