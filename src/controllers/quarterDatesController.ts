import { quarter1, quarter2, quarter3, quarter4 } from '../config/constants';
import { Request, Response } from 'express';
export const getQuarterDates = (req: Request, res: Response): void => {
    try {
        const quarters = [
            quarter1,
            quarter2,
            quarter3,
            quarter4
        ];
        res.json(quarters);
    } catch (error) {
        console.error('Error fetching quarter dates:', error);
        res.status(500).send('Internal Server Error');
    }
};