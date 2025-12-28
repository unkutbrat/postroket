'use client';

import { useState } from 'react';
import { toolDefinitions } from '@/src/data/tools';
import { formatCurrency } from '@/src/lib/utils';

export function Calculator({ locale, slug }: { locale: string; slug: string }) {
  const def = toolDefinitions.find((t) => t.slug === slug);
  const [form, setForm] = useState<Record<string, any>>({});
  const [result, setResult] = useState<Record<string, any> | null>(null);

  if (!def) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const computed = def.compute(form);
    setResult(computed);
  }

  function renderResult() {
    if (!result) return null;
    return (
      <div className="card p-4 space-y-2 bg-slate-50 border border-primary/20">
        <div className="text-sm font-semibold text-slate-800">Results</div>
        {Object.entries(result).map(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            return (
              <details key={key} className="rounded-lg border border-slate-200 p-3">
                <summary className="cursor-pointer text-sm font-semibold">{key}</summary>
                <pre className="text-xs text-slate-600 mt-2 whitespace-pre-wrap">{JSON.stringify(value, null, 2)}</pre>
              </details>
            );
          }
          return (
            <div key={key} className="flex items-center justify-between text-sm">
              <span className="text-slate-600">{key}</span>
              <span className="font-semibold text-slate-900">
                {typeof value === 'number' ? formatCurrency(value, locale === 'en' ? 'en-IN' : `${locale}-IN`) : String(value)}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="card p-5 space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {def.inputs.map((input) => (
          <div key={input.key} className="space-y-1">
            <label className="text-sm text-slate-700">{input.label}</label>
            {input.type === 'checkbox' ? (
              <input
                type="checkbox"
                checked={Boolean(form[input.key])}
                onChange={(e) => setForm({ ...form, [input.key]: e.target.checked })}
              />
            ) : input.type === 'select' ? (
              <select
                className="w-full border border-slate-200 rounded-lg px-3 py-2"
                value={form[input.key] ?? ''}
                onChange={(e) => setForm({ ...form, [input.key]: e.target.value })}
              >
                {(input.options ?? []).map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="number"
                step="0.01"
                className="w-full border border-slate-200 rounded-lg px-3 py-2"
                value={form[input.key] ?? ''}
                onChange={(e) => setForm({ ...form, [input.key]: e.target.value })}
              />
            )}
          </div>
        ))}
        <button type="submit" className="w-full py-3 rounded-lg bg-primary text-white font-semibold">
          Calculate
        </button>
      </form>
      {renderResult()}
    </div>
  );
}
