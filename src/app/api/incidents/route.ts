import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const resolvedParam = searchParams.get('resolved');
  const resolved = resolvedParam === null ? null : resolvedParam === 'true';
  const where = resolved === null ? {} : { resolved };

  const incidents = await prisma.incident.findMany({
    where,
    orderBy: { tsStart: 'desc' },
    include: { camera: true },
  });
  return NextResponse.json(incidents);
} 