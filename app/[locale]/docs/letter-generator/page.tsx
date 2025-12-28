import { SectionHeader } from '@/src/components/cards';
import LetterGenerator from './letters';

export default function LetterGeneratorPage({ params }: { params: { locale: string } }) {
  return (
    <div className="space-y-6">
      <SectionHeader title="Letter generator" description="Create offer, experience, salary and leave letters." />
      <LetterGenerator locale={params.locale} />
    </div>
  );
}
