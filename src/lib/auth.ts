import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';
import { ensureSeedAdmin } from './seedAdmin';
import { defaultPermissions, TeamPermission } from './permissions';
import { UserRole } from '@prisma/client';
import crypto from 'crypto';

const SESSION_COOKIE = 'postroket-session';
const SESSION_DURATION_DAYS = 7;

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Record<TeamPermission, boolean>;
};

export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await prisma.session.findUnique({ where: { sessionToken: token } });
  if (!session || session.expires < new Date()) {
    cookieStore.delete(SESSION_COOKIE);
    return null;
  }

  const user = await prisma.internalUser.findUnique({ where: { id: session.userId } });
  if (!user || !user.active) {
    cookieStore.delete(SESSION_COOKIE);
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    permissions: user.permissions as Record<TeamPermission, boolean>
  };
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect('/admin/login');
  return user;
}

export async function requirePermission(permission: TeamPermission) {
  const user = await requireUser();
  if (user.role === UserRole.OWNER_ADMIN || user.role === UserRole.ADMIN) return user;
  if (!user.permissions?.[permission]) {
    redirect('/admin/login');
  }
  return user;
}

export async function signIn(email: string, password: string) {
  await ensureSeedAdmin();
  const user = await prisma.internalUser.findUnique({ where: { email } });
  if (!user || !user.active) {
    throw new Error('Invalid credentials');
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error('Invalid credentials');

  const token = crypto.randomBytes(24).toString('hex');
  const expires = new Date();
  expires.setDate(expires.getDate() + SESSION_DURATION_DAYS);

  await prisma.session.create({ data: { sessionToken: token, userId: user.id, expires } });
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', expires });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    permissions: user.permissions as Record<TeamPermission, boolean>
  };
}

export async function signOut() {
  const cookieStore = cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    await prisma.session.deleteMany({ where: { sessionToken: token } });
  }
  cookieStore.delete(SESSION_COOKIE);
}

export async function createUser({
  email,
  name,
  password,
  role,
  permissions
}: {
  email: string;
  name: string;
  password: string;
  role: UserRole;
  permissions?: Record<TeamPermission, boolean>;
}) {
  const hash = await bcrypt.hash(password, 10);
  return prisma.internalUser.create({
    data: {
      email,
      name,
      passwordHash: hash,
      role,
      permissions: permissions ?? defaultPermissions(),
      active: true
    }
  });
}
