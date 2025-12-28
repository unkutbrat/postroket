'use client';

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { useState } from 'react';

export default function ResumeBuilder({ locale }: { locale: string }) {
  const [profile, setProfile] = useState({ name: 'Candidate Name', title: 'Product Specialist', summary: 'Driven professional with experience in tools and fintech.' });
  const [experience, setExperience] = useState([{ company: 'Postroket', role: 'Analyst', years: '2022-2024' }]);
  const [skills, setSkills] = useState('Excel, SQL, Communication');

  async function download() {
    const doc = await PDFDocument.create();
    const page = doc.addPage([595, 842]);
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const draw = (text: string, x: number, y: number, size = 12, bold = false) =>
      page.drawText(text, { x, y, size, font, color: rgb(0.1, 0.1, 0.1) });

    draw(profile.name, 50, 790, 20);
    draw(profile.title, 50, 770, 14);
    draw(profile.summary, 50, 740, 12);

    let y = 700;
    draw('Experience', 50, y, 14);
    y -= 20;
    experience.forEach((exp) => {
      draw(`${exp.role} • ${exp.company}`, 50, y);
      draw(exp.years, 50, y - 16);
      y -= 32;
    });

    draw('Skills', 50, y - 10, 14);
    draw(skills, 50, y - 30);

    const pdfBytes = await doc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `resume-${locale}.pdf`;
    link.click();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card p-5 space-y-3">
        <input
          className="w-full border border-slate-200 rounded-lg px-3 py-2"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          placeholder="Name"
        />
        <input
          className="w-full border border-slate-200 rounded-lg px-3 py-2"
          value={profile.title}
          onChange={(e) => setProfile({ ...profile, title: e.target.value })}
          placeholder="Title"
        />
        <textarea
          className="w-full border border-slate-200 rounded-lg px-3 py-2 h-24"
          value={profile.summary}
          onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
          placeholder="Summary"
        />
        <textarea
          className="w-full border border-slate-200 rounded-lg px-3 py-2 h-20"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Skills"
        />
      </div>
      <div className="card p-5 space-y-4">
        {experience.map((exp, idx) => (
          <div key={idx} className="grid grid-cols-3 gap-2">
            <input
              className="border border-slate-200 rounded-lg px-2 py-2"
              value={exp.company}
              onChange={(e) => setExperience(experience.map((x, i) => (i === idx ? { ...x, company: e.target.value } : x)))}
              placeholder="Company"
            />
            <input
              className="border border-slate-200 rounded-lg px-2 py-2"
              value={exp.role}
              onChange={(e) => setExperience(experience.map((x, i) => (i === idx ? { ...x, role: e.target.value } : x)))}
              placeholder="Role"
            />
            <input
              className="border border-slate-200 rounded-lg px-2 py-2"
              value={exp.years}
              onChange={(e) => setExperience(experience.map((x, i) => (i === idx ? { ...x, years: e.target.value } : x)))}
              placeholder="Years"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setExperience([...experience, { company: '', role: '', years: '' }])}
          className="px-3 py-2 rounded-lg border border-dashed border-primary text-primary text-sm"
        >
          Add experience
        </button>
        <button onClick={download} className="w-full py-3 rounded-lg bg-primary text-white font-semibold">
          Export PDF
        </button>
      </div>
    </div>
  );
}
