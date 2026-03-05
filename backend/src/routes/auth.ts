import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../prisma';

const router = Router();

// Admin login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ message: 'Missing username or password' });
            return;
        }

        const admin = await prisma.admin.findUnique({
            where: { username },
        });

        if (!admin) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const isValid = await bcrypt.compare(password, admin.password);
        if (!isValid) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        // Since this is a simple app, we can just return success without JWT if desired, 
        // or return a basic token/flag.
        res.status(200).json({ message: 'Login successful', adminId: admin.id });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
