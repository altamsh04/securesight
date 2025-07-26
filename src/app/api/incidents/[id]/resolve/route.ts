import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Context {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, context: Context) {
  const { id } = await context.params;
  const numId = Number(id);
  if (isNaN(numId)) {
    return NextResponse.json({ error: 'Invalid incident id' }, { status: 400 });
  }

  // Get current resolved status
  const incident = await prisma.incident.findUnique({ where: { id: numId } });
  if (!incident) {
    return NextResponse.json({ error: 'Incident not found' }, { status: 404 });
  }

  const updated = await prisma.incident.update({
    where: { id: numId },
    data: { resolved: !incident.resolved },
  });
  return NextResponse.json(updated);
}