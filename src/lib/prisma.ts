import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import Database from "better-sqlite3";

// 1. Initialize the Prisma adapter with your database URL
const adapter = new PrismaBetterSqlite3({ 
  url: process.env.DATABASE_URL || "file:./dev.db" 
})

// 2. Pass the adapter to your Prisma Client instance
const prisma = new PrismaClient({ adapter })

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;