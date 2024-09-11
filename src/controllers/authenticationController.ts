import jwt from 'jsonwebtoken'
import { Request, Response } from 'express';
import ProductManagerService from '../services/authenticationService';
import dotenv from 'dotenv';
dotenv.config();
export const checkUserDetails = async (req: Request, res: Response): Promise<void> => {
  console.log('Controller: Entering checkUserDetails method rivky friedman');
    try {
        const { email } = req.body;
        console.log(process.env.JWT_SECRET);
        const { exists, isAdmin } = await ProductManagerService.checkUserDetails(email);
        if(exists) {
            const token = jwt.sign({ email, isAdmin }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
            res.cookie('token',token,{httpOnly:true,secure:true,sameSite:'strict'});
            res.status(200).json({message:'User authenticated successfully'});
        } else {
            res.status(401).json({message:'Email not found'});
        }

    } catch (error) {
        console.error('Error checking user details:', error);
        res.status(500).send('Internal Server Error');
    }
};
