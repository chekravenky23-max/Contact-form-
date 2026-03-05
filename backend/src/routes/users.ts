import { Router, Request, Response } from 'express';
import prisma from '../prisma';

const router = Router();

// Register a new user
router.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, activity_type } = req.body;

        if (!name || !email) {
            res.status(400).json({ message: 'Missing name or email' });
            return;
        }

        // Check if user already exists
        let user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    name,
                    email,
                    activity_type: activity_type || null,
                },
            });
        } else {
            // Update activity_type if provided
            if (activity_type && user.activity_type !== activity_type) {
                user = await prisma.user.update({
                    where: { id: user.id },
                    data: { activity_type },
                });
            }
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Failed to register' });
    }
});

export default router;
