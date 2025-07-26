import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Cameras
  const cameras = await prisma.camera.createMany({
    data: [
      { name: 'Shop Floor A', location: 'Ground Floor', videoStream: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop' },
      { name: 'Vault', location: 'Basement', videoStream: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop' },
      { name: 'Entrance', location: 'Main Gate', videoStream: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop' },
    ],
  });

  // Fetch created cameras
  const allCameras = await prisma.camera.findMany();

  // Helper to get cameraId by name
  const getCameraId = (name: string) => allCameras.find((c: { id: number; name: string; location: string }) => c.name === name)?.id!;

  // 24-hour window
  const now = new Date();
  const hoursAgo = (h: number) => new Date(now.getTime() - h * 60 * 60 * 1000);

  // Create Incidents
  await prisma.incident.createMany({
    data: [
      // Shop Floor A
      { cameraId: getCameraId('Shop Floor A'), type: 'Unauthorised Access', tsStart: hoursAgo(1), tsEnd: hoursAgo(0.9), thumbnailUrl: '/file.svg', resolved: false },
      { cameraId: getCameraId('Shop Floor A'), type: 'Face Recognised', tsStart: hoursAgo(3), tsEnd: hoursAgo(2.8), thumbnailUrl: '/logo.png', resolved: true },
      { cameraId: getCameraId('Shop Floor A'), type: 'Gun Threat', tsStart: hoursAgo(5), tsEnd: hoursAgo(4.7), thumbnailUrl: '/window.svg', resolved: false },
      { cameraId: getCameraId('Shop Floor A'), type: 'Face Recognised', tsStart: hoursAgo(7), tsEnd: hoursAgo(6.8), thumbnailUrl: '/globe.svg', resolved: true },
      // Vault
      { cameraId: getCameraId('Vault'), type: 'Gun Threat', tsStart: hoursAgo(2), tsEnd: hoursAgo(1.7), thumbnailUrl: '/vercel.svg', resolved: false },
      { cameraId: getCameraId('Vault'), type: 'Unauthorised Access', tsStart: hoursAgo(4), tsEnd: hoursAgo(3.8), thumbnailUrl: '/file.svg', resolved: true },
      { cameraId: getCameraId('Vault'), type: 'Face Recognised', tsStart: hoursAgo(6), tsEnd: hoursAgo(5.8), thumbnailUrl: '/logo.png', resolved: false },
      { cameraId: getCameraId('Vault'), type: 'Gun Threat', tsStart: hoursAgo(8), tsEnd: hoursAgo(7.7), thumbnailUrl: '/window.svg', resolved: true },
      // Entrance
      { cameraId: getCameraId('Entrance'), type: 'Unauthorised Access', tsStart: hoursAgo(1.5), tsEnd: hoursAgo(1.3), thumbnailUrl: '/globe.svg', resolved: false },
      { cameraId: getCameraId('Entrance'), type: 'Face Recognised', tsStart: hoursAgo(3.5), tsEnd: hoursAgo(3.3), thumbnailUrl: '/vercel.svg', resolved: true },
      { cameraId: getCameraId('Entrance'), type: 'Gun Threat', tsStart: hoursAgo(5.5), tsEnd: hoursAgo(5.3), thumbnailUrl: '/file.svg', resolved: false },
      { cameraId: getCameraId('Entrance'), type: 'Unauthorised Access', tsStart: hoursAgo(7.5), tsEnd: hoursAgo(7.3), thumbnailUrl: '/logo.png', resolved: true },
    ],
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 