import { signIn } from '@/src/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function AdminLoginPage() {
  async function loginAction(formData: FormData) {
    'use server';
    const email = String(formData.get('email') || '');
    const password = String(formData.get('password') || '');
    await signIn(email, password);
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <form action={loginAction} className="card max-w-md w-full p-8 space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Admin login</h1>
          <p className="text-sm text-slate-600 mt-1">Use your admin credentials to continue.</p>
        </div>
        <div className="space-y-2">
          <label className="block text-sm text-slate-700">Email</label>
          <input name="email" type="email" required className="w-full border border-slate-200 rounded-lg px-3 py-2" />
        </div>
        <div className="space-y-2">
          <label className="block text-sm text-slate-700">Password</label>
          <input name="password" type="password" required className="w-full border border-slate-200 rounded-lg px-3 py-2" />
        </div>
        <button type="submit" className="w-full py-3 rounded-lg bg-primary text-white font-semibold">Sign in</button>
        <p className="text-xs text-slate-500">Seed admin uses environment variables SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD.</p>
      </form>
    </div>
  );
}
