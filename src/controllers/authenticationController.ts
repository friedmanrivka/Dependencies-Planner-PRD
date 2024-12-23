import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import ProductManagerService from '../services/authenticationService';
import dotenv from 'dotenv';
dotenv.config();
export const checkUserDetails = async (req: Request, res: Response): Promise<void> => {
   console.log('Controller: Entering checkUserDetails method');
    try {
        const { email } = req.body;
        console.log('email',email);

        const { exists, isAdmin } = await ProductManagerService.checkUserDetails(email);
      if(exists){
        console.log('Controller: Email exists, isAdmin:', isAdmin);
        const jwtSecret = process.env.JWT_SECRET ;

        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        const token=jwt.sign(
            {email,isAdmin},
            jwtSecret,
            {expiresIn:'3h'}
        );
        res.cookie('authToken', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
           secure: false ,
            sameSite: 'lax',
        });
        res.json({success:true});
      }
      else{
        res.status(401).json({success:false,message:'Email not found'});
      }
      
    } catch (error) {
        console.error('Error checking user details:', error);
        res.status(500).send('Internal Server Error');
    }
};
