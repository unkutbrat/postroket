import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'File missing' }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  await mkdir(uploadsDir, { recursive: true });
  const extension = file.name.split('.').pop();
  const filename = `${randomUUID()}.${extension}`;
  const filepath = path.join(uploadsDir, filename);
  await writeFile(filepath, buffer);
  return NextResponse.json({ url: `/uploads/${filename}` });
}
