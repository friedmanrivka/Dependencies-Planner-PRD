// src/controllers/productManagerController.ts

import { Request, Response } from 'express';
import ProductManagerService from '../services/authenticationService';

export const checkUserDetails = async (req: Request, res: Response): Promise<void> => {
    console.log('Controller: Entering checkUserDetails method rivky friedman');
    try {
        const { email } = req.body;
        const { exists, isAdmin } = await ProductManagerService.checkUserDetails(email);
        console.log(`Email exists: ${exists}, Is Admin: ${isAdmin}`); 
        res.json({ exists, isAdmin });
    } catch (error) {
        console.error('Error checking user details:', error);
        res.status(500).send('Internal Server Error');
    }
};
