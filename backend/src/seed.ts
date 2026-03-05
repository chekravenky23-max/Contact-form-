import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const adminUsername = 'admin';
    const adminPassword = 'password123'; // Default password

    const existingAdmin = await prisma.admin.findUnique({
        where: { username: adminUsername },
    });

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await prisma.admin.create({
            data: {
                username: adminUsername,
                password: hashedPassword,
            },
        });
        console.log(`Admin user created: ${adminUsername} / ${adminPassword}`);
    } else {
        console.log('Admin user already exists.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
