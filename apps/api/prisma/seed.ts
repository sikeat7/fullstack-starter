import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Hash password for demo user
  const hashedPassword = await bcrypt.hash('Password123!', 12);

  // Create demo admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      isActive: true,
      emailVerifiedAt: new Date(),
    },
  });

  console.log('✅ Admin user created:', adminUser.email);

  // Create demo regular user
  const regularUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.USER,
      isActive: true,
      emailVerifiedAt: new Date(),
    },
  });

  console.log('✅ Regular user created:', regularUser.email);

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
