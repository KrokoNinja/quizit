import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

// Declare globalThis to avoid TypeScript errors related to global typing
declare global {
  var prismaGlobal: PrismaClient | undefined;
}

if (process.env.NODE_ENV === 'production') {
  // In production, always create a new PrismaClient instance
  prisma = new PrismaClient();
} else {
  // In development, reuse the PrismaClient instance if it exists, or create a new one
  if (!global.prismaGlobal) {
    global.prismaGlobal = new PrismaClient();
  }
  prisma = global.prismaGlobal;
}

export default prisma;