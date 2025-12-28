'use client';

import { letterTemplates } from '@/src/data/seed';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { useState } from 'react';

const DEFAULT_TEMPLATE =
  letterTemplates[0] ?? ({
    slug: 'default',
    title: { en: 'Letter' },
    body: { en: '' },
  } as any);

export default function LetterGenerator({ locale }: { locale: string }) {
  const [template, setTemplate] = useState(DEFAULT_TEMPLATE);
  const [recipient, setRecipient] = useState('Dear Candidate,');
  const [footer, setFooter] = useState('Regards,\nPostroket HR');

  async function download() {
    const doc = await PDFDocument.create();
    const page = doc.addPage([595, 842]);
    const font = await doc.embedFont(StandardFonts.Helvetica);

    const draw = (text: string, x: number, y: number, size = 12) =>
      page.drawText(text, { x, y, size, font, color: rgb(0.1, 0.1, 0.1) });

    const title =
      (template.title as Record<string, string>)?.[locale] ??
      (template.title as any)?.en ??
      'Letter';

    const body =
      (template.body as Record<string, string>)?.[locale] ??
      (template.body as any)?.en ??
      '';

    draw(title, 50, 780, 18);
    draw(recipient, 50, 750);
    draw(body, 50, 730);
    draw(footer, 50, 680);

    const pdfBytes = await doc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${template.slug}-${locale}.pdf`;
    link.click();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card p-5 space-y-3">
        <label className="text-sm text-slate-600">Template</label>
        <select
          value={template.slug}
          onChange={(e) =>
            setTemplate(
              letterTemplates.find((t) => t.slug === e.target.value) ??
                DEFAULT_TEMPLATE
            )
          }
          className="w-full border border-slate-200 rounded-lg px-3 py-2"
        >
          {letterTemplates.map((t) => (
            <option key={t.slug} value={t.slug}>
              {(t.title as Record<string, string>)?.[locale] ?? (t.title as any)?.en ?? 'Letter'}
            </option>
          ))}
        </select>

        <label className="text-sm text-slate-600">Recipient line</label>
        <input
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full border border-slate-200 rounded-lg px-3 py-2"
        />

        <label className="text-sm text-slate-600">Footer</label>
        <textarea
          value={footer}
          onChange={(e) => setFooter(e.target.value)}
          className="w-full border border-slate-200 rounded-lg px-3 py-2 h-20"
        />
      </div>

      <div className="card p-5 space-y-3">
        <div className="text-sm text-slate-700 whitespace-pre-wrap">
          {(template.body as Record<string, string>)?.[locale] ?? (template.body as any)?.en ?? ''}
        </div>
        <button
          onClick={download}
          className="w-full py-3 rounded-lg bg-primary text-white font-semibold"
        >
          Export PDF
        </button>
      </div>
    </div>
  );
}
