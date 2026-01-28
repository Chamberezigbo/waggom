import { prisma } from '../src/config/prisma.js';
import * as bcrypt from 'bcrypt';



async function main() {
  const email = 'waggom@admin.com';
  const password = 'ChangeMe123!'; // Change if needed
  const hashed = await bcrypt.hash(password, 10);

  await prisma.admin.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashed,
    },
  });

  console.log('✅ Admin seeded:', email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());