import { prisma } from '../src/lib/prisma';
import { upsertSeedJobs, upsertSeedTools } from '../src/data/store';
import { glossaryTerms } from '../src/data/seed';
import { ensureSeedAdmin } from '../src/lib/seedAdmin';

async function main() {
  await ensureSeedAdmin();
  await upsertSeedTools();
  await upsertSeedJobs();
  for (const entry of glossaryTerms) {
    await prisma.glossaryEntry.upsert({
      where: { term_locale: { term: entry.term, locale: entry.locale } },
      update: { definition: entry.definition },
      create: { term: entry.term, definition: entry.definition, locale: entry.locale }
    });
  }
  console.log('Seed complete');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
