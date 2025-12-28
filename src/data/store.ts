import { prisma } from '@/src/lib/prisma';
import { toolDefinitions } from './tools';
import { seedJobs, seedToolBodies } from './seed';
import { locales } from '@/src/i18n/config';

export async function getTools() {
  const dbTools = await prisma.tool.findMany({
    include: { contents: true }
  });
  if (dbTools.length === 0) {
    return toolDefinitions.map((tool) => ({
      ...tool,
      contents: locales.map((locale) => ({
        locale,
        title: tool.titles[locale],
        description: tool.description[locale],
        bodyPath: `/content/tools/${locale}/${tool.slug}.mdx`
      }))
    }));
  }
  return dbTools.map((tool) => {
    const def = toolDefinitions.find((t) => t.slug === tool.slug);
    return { ...tool, titles: def?.titles ?? {}, description: def?.description ?? {} };
  });
}

export async function getToolBySlug(slug: string) {
  const dbTool = await prisma.tool.findUnique({ where: { slug }, include: { contents: true, faqs: true } });
  const def = toolDefinitions.find((t) => t.slug === slug);
  if (dbTool) {
    return { ...def, ...dbTool };
  }
  return def;
}

export async function getJobs(limit = 12) {
  const jobs = await prisma.jobPost.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' },
    take: limit
  });
  if (jobs.length === 0) return seedJobs;
  return jobs;
}

export async function getJobBySlug(slug: string) {
  const segments = slug.split('-');
  const maybeId = segments[segments.length - 1];
  if (maybeId && maybeId.length > 10) {
    const job = await prisma.jobPost.findUnique({ where: { id: maybeId } });
    if (job) return job;
    slug = segments.slice(0, -1).join('-');
  }
  const job = await prisma.jobPost.findFirst({ where: { slug } });
  if (job) return job;
  return seedJobs.find((j) => j.slug === slug);
}

export async function upsertSeedTools() {
  for (const tool of toolDefinitions) {
    const existing = await prisma.tool.findUnique({ where: { slug: tool.slug } });
    if (!existing) {
      const created = await prisma.tool.create({
        data: {
          slug: tool.slug,
          category: tool.category,
          popular: Boolean(tool.popular),
          order: tool.order ?? 0
        }
      });
      for (const locale of Object.keys(tool.titles)) {
        await prisma.toolContent.create({
          data: {
            toolId: created.id,
            locale,
            title: tool.titles[locale],
            description: tool.description[locale],
            bodyPath: `/content/tools/${locale}/${tool.slug}.mdx`
          }
        });
        const faqs = tool.faqs[locale] ?? [];
        for (let i = 0; i < faqs.length; i++) {
          await prisma.toolFAQ.create({
            data: {
              toolId: created.id,
              locale,
              question: faqs[i].question,
              answer: faqs[i].answer,
              order: i
            }
          });
        }
      }
    }
  }
}

export async function upsertSeedJobs() {
  for (const job of seedJobs) {
    const exists = await prisma.jobPost.findFirst({ where: { slug: job.slug } });
    if (!exists) {
      await prisma.jobPost.create({ data: job });
    }
  }
}
