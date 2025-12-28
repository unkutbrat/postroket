import { prisma } from '@/src/lib/prisma';
import { PaymentStatus, JobStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export default async function AdminJobsPage() {
  const jobs = await prisma.jobPost.findMany({ orderBy: { createdAt: 'desc' } });

  async function updateStatus(formData: FormData) {
    'use server';
    const id = String(formData.get('id'));
    const status = formData.get('status') as JobStatus;
    await prisma.jobPost.update({ where: { id }, data: { status, publishedAt: status === JobStatus.PUBLISHED ? new Date() : null } });
    revalidatePath('/admin/jobs');
  }

  async function markPaid(formData: FormData) {
    'use server';
    const id = String(formData.get('id'));
    await prisma.jobPost.update({ where: { id }, data: { paymentStatus: PaymentStatus.PAID } });
    revalidatePath('/admin/jobs');
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Jobs moderation</h1>
      <div className="card p-4 space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="border border-slate-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-900">{job.title}</div>
                <div className="text-sm text-slate-600">{job.companyName} • {job.locationCity}</div>
              </div>
              <div className="text-xs px-2 py-1 rounded-full bg-slate-100">{job.status}</div>
            </div>
            <div className="text-xs text-slate-600 mt-2">Payment: {job.paymentStatus}</div>
            <form action={updateStatus} className="flex items-center gap-2 mt-3">
              <input type="hidden" name="id" value={job.id} />
              <select name="status" defaultValue={job.status} className="border border-slate-200 rounded-lg px-2 py-1 text-sm">
                {Object.values(JobStatus).map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <button type="submit" className="px-3 py-2 rounded-lg bg-primary text-white text-sm">Update</button>
            </form>
            {job.paymentStatus !== PaymentStatus.PAID && (
              <form action={markPaid} className="mt-2">
                <input type="hidden" name="id" value={job.id} />
                <button className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm">Mark paid</button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
