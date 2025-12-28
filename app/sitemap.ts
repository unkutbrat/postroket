import { MetadataRoute } from 'next';
import { locales } from '@/src/i18n/config';
import { toolDefinitions } from '@/src/data/tools';
import { seedJobs } from '@/src/data/seed';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://postroket.com';
  const staticPaths = locales.flatMap((locale) => [
    { url: `${base}/${locale}`, lastModified: new Date() },
    { url: `${base}/${locale}/tools`, lastModified: new Date() },
    { url: `${base}/${locale}/jobs`, lastModified: new Date() },
    { url: `${base}/${locale}/docs`, lastModified: new Date() }
  ]);

  const toolPaths = toolDefinitions.flatMap((tool) =>
    locales.map((locale) => ({
      url: `${base}/${locale}/tools/${tool.slug}`,
      lastModified: new Date()
    }))
  );

  const jobPaths = seedJobs.flatMap((job) =>
    locales.map((locale) => ({
      url: `${base}/${locale}/jobs/${job.slug}`,
      lastModified: new Date()
    }))
  );

  return [...staticPaths, ...toolPaths, ...jobPaths];
}
