import { ToolCard, SectionHeader } from '@/src/components/cards';
import { getTools } from '@/src/data/store';
import { getTranslations } from 'next-intl/server';

export const revalidate = 60;

export default async function ToolsPage({ params }: { params: { locale: string } }) {
  const tools = await getTools();
  const t = await getTranslations('tools');

  return (
    <div className="space-y-6">
      <SectionHeader title={t('title')} description={t('subtitle')} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} locale={params.locale} />
        ))}
      </div>
    </div>
  );
}
