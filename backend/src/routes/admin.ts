import { Router, Request, Response } from 'express';
import prisma from '../prisma';

const router = Router();

// Get admin dashboard stats
router.get('/dashboard', async (req: Request, res: Response): Promise<void> => {
    try {
        const totalUsers = await prisma.user.count();

        // Get recent activities
        const recentActivities = await prisma.practiceActivity.findMany({
            take: 10,
            orderBy: { completedAt: 'desc' },
            include: {
                user: {
                    select: { name: true, email: true }
                }
            }
        });

        // Get all users
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { activities: true }
                }
            }
        });

        res.status(200).json({
            totalUsers,
            totalActivities: await prisma.practiceActivity.count(),
            users,
            recentActivities
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ message: 'Failed to fetch dashboard stats' });
    }
});

export default router;
