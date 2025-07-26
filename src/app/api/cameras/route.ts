import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const cameras = await prisma.camera.findMany();
  return NextResponse.json(cameras);
}