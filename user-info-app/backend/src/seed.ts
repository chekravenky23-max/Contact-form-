import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const username = 'admin';
    const password = 'password123';

    // Hardcode the hash to ensure consistency across re-seeds
    // This is the hash for "password123" using bcrypt round 10
    const hashedPassword = await bcrypt.hash(password, 10);

    // Use update instead of just upsert to force override the password if it exists
    const admin = await prisma.admin.upsert({
        where: { username },
        update: {
            password: hashedPassword
        },
        create: {
            username,
            password: hashedPassword,
        },
    });

    console.log('Admin user seeded:', { username: admin.username, passwordHash: admin.password });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
