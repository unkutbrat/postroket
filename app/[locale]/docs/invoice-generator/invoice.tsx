'use client';

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { useState } from 'react';

type Item = { description: string; quantity: number; price: number; tax: number };

export default function InvoiceBuilder({ locale }: { locale: string }) {
  const [seller, setSeller] = useState('Postroket Pvt Ltd\nMumbai, MH');
  const [buyer, setBuyer] = useState('Client name\nCity, State');
  const [items, setItems] = useState<Item[]>([{ description: 'Consulting', quantity: 1, price: 1000, tax: 18 }]);

  const addItem = () => setItems([...items, { description: '', quantity: 1, price: 0, tax: 18 }]);

  async function downloadPdf() {
    const doc = await PDFDocument.create();
    const page = doc.addPage([595, 842]);
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const drawText = (text: string, x: number, y: number, size = 12) => page.drawText(text, { x, y, size, font, color: rgb(0.1, 0.1, 0.1) });

    drawText('Invoice', 50, 800, 20);
    drawText('Seller:', 50, 770);
    drawText(seller, 50, 750);
    drawText('Buyer:', 320, 770);
    drawText(buyer, 320, 750);

    let y = 700;
    let subtotal = 0;
    items.forEach((item, index) => {
      const lineTotal = item.quantity * item.price;
      subtotal += lineTotal;
      drawText(`${index + 1}. ${item.description}`, 50, y);
      drawText(`${item.quantity} x ${item.price.toFixed(2)}`, 320, y);
      drawText(`₹${lineTotal.toFixed(2)}`, 460, y);
      y -= 20;
      const gst = (lineTotal * item.tax) / 100;
      drawText(`GST ${item.tax}%: ₹${gst.toFixed(2)}`, 50, y);
      y -= 20;
    });
    const gstTotal = items.reduce((sum, item) => sum + (item.quantity * item.price * item.tax) / 100, 0);
    const total = subtotal + gstTotal;
    drawText(`Subtotal: ₹${subtotal.toFixed(2)}`, 50, y - 10);
    drawText(`GST Total: ₹${gstTotal.toFixed(2)}`, 50, y - 30);
    drawText(`Grand Total: ₹${total.toFixed(2)}`, 50, y - 50, 14);

    const pdfBytes = await doc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice-${locale}.pdf`;
    link.click();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card p-5 space-y-4">
        <div>
          <label className="text-sm text-slate-600">Seller details</label>
          <textarea value={seller} onChange={(e) => setSeller(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 h-24" />
        </div>
        <div>
          <label className="text-sm text-slate-600">Buyer details</label>
          <textarea value={buyer} onChange={(e) => setBuyer(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 h-24" />
        </div>
        <button type="button" onClick={addItem} className="px-3 py-2 rounded-lg border border-dashed border-primary text-primary text-sm">
          Add item
        </button>
      </div>
      <div className="card p-5 space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="grid grid-cols-4 gap-3 items-center">
            <input
              placeholder="Description"
              className="col-span-2 border border-slate-200 rounded-lg px-3 py-2"
              value={item.description}
              onChange={(e) => setItems(items.map((it, i) => (i === idx ? { ...it, description: e.target.value } : it)))}
            />
            <input
              type="number"
              className="border border-slate-200 rounded-lg px-3 py-2"
              value={item.quantity}
              onChange={(e) => setItems(items.map((it, i) => (i === idx ? { ...it, quantity: Number(e.target.value) } : it)))}
            />
            <input
              type="number"
              className="border border-slate-200 rounded-lg px-3 py-2"
              value={item.price}
              onChange={(e) => setItems(items.map((it, i) => (i === idx ? { ...it, price: Number(e.target.value) } : it)))}
            />
            <input
              type="number"
              className="border border-slate-200 rounded-lg px-3 py-2"
              value={item.tax}
              onChange={(e) => setItems(items.map((it, i) => (i === idx ? { ...it, tax: Number(e.target.value) } : it)))}
            />
          </div>
        ))}
        <button onClick={downloadPdf} className="w-full py-3 rounded-lg bg-primary text-white font-semibold">
          Export PDF
        </button>
      </div>
    </div>
  );
}
