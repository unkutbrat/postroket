import { SectionHeader } from '@/src/components/cards';
import ResumeBuilder from './resume';

export default function ResumeBuilderPage({ params }: { params: { locale: string } }) {
  return (
    <div className="space-y-6">
      <SectionHeader title="Resume builder" description="Craft a simple resume and export as PDF." />
      <ResumeBuilder locale={params.locale} />
    </div>
  );
}
