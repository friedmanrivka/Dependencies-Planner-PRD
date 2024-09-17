import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        // בדיקה אם המשתמש הוא אדמין
        if (decoded && (decoded as any).isAdmin) {
            next();  // המשתמש הוא אדמין, אפשר להמשיך
        } else {
            res.status(403).json({ error: 'Access denied. Admin rights required' });
        }
    } catch (err) {
        res.status(400).json({ error: 'Invalid or expired token' });
    }
};
