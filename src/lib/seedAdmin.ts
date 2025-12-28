import bcrypt from 'bcryptjs';
import { UserRole } from '@prisma/client';
import { defaultPermissions } from './permissions';
import { prisma } from './prisma';

export async function ensureSeedAdmin() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  const name = process.env.SEED_ADMIN_NAME || 'Owner Admin';

  if (!email || !password) {
    console.warn('Seed admin skipped: env vars missing');
    return;
  }

  const existing = await prisma.internalUser.findFirst({ where: { role: UserRole.OWNER_ADMIN } });
  if (existing) return;

  const hash = await bcrypt.hash(password, 10);
  await prisma.internalUser.create({
    data: {
      email,
      passwordHash: hash,
      name,
      role: UserRole.OWNER_ADMIN,
      permissions: defaultPermissions(),
      active: true
    }
  });
  console.log('Seed admin created from environment variables');
}
