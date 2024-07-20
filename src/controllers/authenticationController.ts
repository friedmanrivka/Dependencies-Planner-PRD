// productManagerController.js
import { Request, Response } from 'express';
import  AuthenticationRepo from '../repositories/authenticationRepo'

export const checkEmail = async (req: Request, res: Response): Promise<void> => {
    console.log('controller');
    try {
        const { email } = req.body;
       const exists = await AuthenticationRepo.getProductManagerByEmail(email);
        console.log(`Email exists: ${exists}`); // Debugging output
        res.json({ exists });
    } catch (error) {
        console.error('Error checking email:', error);
        res.status(500).send('Internal Server Error');
    }
};
