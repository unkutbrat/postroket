import { prisma } from '@/src/lib/prisma';
import { createUser } from '@/src/lib/auth';
import { UserRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export default async function AdminUsersPage() {
  const users = await prisma.internalUser.findMany({ orderBy: { createdAt: 'desc' } });

  async function addUser(formData: FormData) {
    'use server';
    const email = String(formData.get('email'));
    const name = String(formData.get('name'));
    const password = String(formData.get('password'));
    const role = formData.get('role') as UserRole;
    await createUser({ email, name, password, role });
    revalidatePath('/admin/users');
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Users & roles</h1>
      <form action={addUser} className="card p-5 grid grid-cols-1 md:grid-cols-4 gap-3">
        <input name="email" placeholder="Email" required className="border border-slate-200 rounded-lg px-3 py-2" />
        <input name="name" placeholder="Name" required className="border border-slate-200 rounded-lg px-3 py-2" />
        <input name="password" placeholder="Password" required className="border border-slate-200 rounded-lg px-3 py-2" type="password" />
        <select name="role" className="border border-slate-200 rounded-lg px-3 py-2">
          {Object.values(UserRole).map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        <button className="md:col-span-4 py-3 rounded-lg bg-primary text-white font-semibold">Create user</button>
      </form>
      <div className="card p-4 space-y-2">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between border border-slate-200 rounded-lg px-3 py-2">
            <div>
              <div className="font-semibold text-slate-800">{user.name}</div>
              <div className="text-sm text-slate-600">{user.email} • {user.role}</div>
            </div>
            <div className="text-xs text-slate-500">{user.active ? 'Active' : 'Inactive'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
