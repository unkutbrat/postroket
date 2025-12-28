import { prisma } from '@/src/lib/prisma';
import { redirect } from 'next/navigation';
import { slugify } from '@/src/lib/utils';
import { PaymentProvider, PaymentStatus, JobStatus } from '@prisma/client';

export default function PostJobPage({ params }: { params: { locale: string } }) {
  async function createJob(formData: FormData) {
    'use server';
    const title = String(formData.get('title') || '');
    const companyName = String(formData.get('companyName') || '');
    const description = String(formData.get('description') || '');
    const locationCity = String(formData.get('locationCity') || '');
    const locationState = String(formData.get('locationState') || '');
    const salaryMin = Number(formData.get('salaryMin') || 0);
    const salaryMax = Number(formData.get('salaryMax') || salaryMin);
    const experienceMin = Number(formData.get('experienceMin') || 0);
    const experienceMax = Number(formData.get('experienceMax') || experienceMin);
    const contactEmail = String(formData.get('contactEmail') || '');
    const contactPhone = String(formData.get('contactPhone') || '');
    const featured = Boolean(formData.get('featured'));
    const slug = slugify(title).slice(0, 40);
    await prisma.jobPost.create({
      data: {
        slug,
        companyName,
        title,
        description,
        locationCity,
        locationState,
        salaryMin,
        salaryMax,
        experienceMin,
        experienceMax,
        contactEmail,
        contactPhone,
        featured,
        status: JobStatus.PENDING,
        paymentStatus: featured ? PaymentStatus.NEEDS_CONFIRMATION : PaymentStatus.UNPAID,
        paymentProvider: PaymentProvider.MANUAL
      }
    });
    redirect(`/${params.locale}/jobs`);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Post a job</h1>
        <p className="text-sm text-slate-600 mt-1">Jobs go to pending approval. Featured listings require a one-time payment confirmation.</p>
      </div>
      <form action={createJob} className="card p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput name="title" label="Job title" required />
          <TextInput name="companyName" label="Company name" required />
        </div>
        <TextInput name="description" label="Description" required textarea />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput name="locationCity" label="City" required />
          <TextInput name="locationState" label="State" required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput name="salaryMin" label="Salary min" type="number" required />
          <TextInput name="salaryMax" label="Salary max" type="number" required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput name="experienceMin" label="Experience min (years)" type="number" required />
          <TextInput name="experienceMax" label="Experience max (years)" type="number" required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput name="contactEmail" label="Contact email" type="email" required />
          <TextInput name="contactPhone" label="Contact phone" required />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" name="featured" /> Make this a featured listing (one-time payment)
        </label>
        <button type="submit" className="w-full py-3 rounded-lg bg-primary text-white font-semibold">Submit for approval</button>
      </form>
    </div>
  );
}

function TextInput({
  label,
  name,
  type = 'text',
  required,
  textarea
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-slate-700">{label}</label>
      {textarea ? (
        <textarea name={name} required={required} className="w-full border border-slate-200 rounded-lg px-3 py-2 h-24" />
      ) : (
        <input name={name} type={type} required={required} className="w-full border border-slate-200 rounded-lg px-3 py-2" />
      )}
    </div>
  );
}
