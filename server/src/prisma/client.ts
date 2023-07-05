import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgres://10855854685:rDMB9fecj4iQ@ep-divine-river-801745.us-east-2.aws.neon.tech/arbocontrol?pgbouncer=true&connect_timeout=10",
    },
  },
});