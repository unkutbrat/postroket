import { SectionHeader } from '@/src/components/cards';
import InvoiceBuilder from './invoice';

export default function InvoiceGeneratorPage({ params }: { params: { locale: string } }) {
  return (
    <div className="space-y-6">
      <SectionHeader title="Invoice generator" description="Create GST-ready invoices and export as PDF." />
      <InvoiceBuilder locale={params.locale} />
    </div>
  );
}
