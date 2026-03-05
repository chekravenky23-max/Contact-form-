import { Router, Request, Response } from 'express';
import prisma from '../prisma';

const router = Router();

// Track a practice activity
router.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, activityName } = req.body;

        if (!userId || !activityName) {
            res.status(400).json({ message: 'Missing userId or activityName' });
            return;
        }

        const activity = await prisma.practiceActivity.create({
            data: {
                userId,
                activityName,
            },
        });

        res.status(201).json(activity);
    } catch (error) {
        console.error('Error logging activity:', error);
        res.status(500).json({ message: 'Failed to log activity' });
    }
});

export default router;
