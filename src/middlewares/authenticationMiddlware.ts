import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload; 
}

export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.cookies.authToken;

    console.log('Middleware: Checking for token in cookies');

    if (token) {
        console.log('Middleware: Token found, verifying...');
        jwt.verify(token, process.env.JWT_SECRET as string, (err: jwt.VerifyErrors | null, user: string | JwtPayload | undefined) => {
            if (err) {
                console.error('Middleware: Token verification failed', err);
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            req.user = user;

            console.log('Middleware: Token verified successfully');

            // בדיקת הרשאת Admin במידת הצורך
            if (user && typeof user !== 'string' && user.isAdmin === true) {
                console.log('Middleware: User is admin, access granted');
                next();
            } else {
                console.warn('Middleware: User is not admin, access denied');
                res.status(403).json({ success: false, message: 'Forbidden: Admins only' });
            }
        });
    } else {
        console.warn('Middleware: No token found in cookies');
        res.status(401).json({ success: false, message: 'Token missing' });
    }
};
