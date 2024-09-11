import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Middleware לבדיקה אם המשתמש הוא אדמין
const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ error: 'No token provided, authentication failed' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        // בדיקה אם המשתמש הוא אדמין
        if (decodedToken && decodedToken.isAdmin) {
            next();  // המשך לפונקציה הבאה (העמוד המוגן)
        } else {
            return res.status(403).json({ error: 'Access denied. Admins only.' });
        }
    } catch (error) {
        return res.status(400).json({ error: 'Invalid or expired token' });
    }
};

export default checkAdmin;
