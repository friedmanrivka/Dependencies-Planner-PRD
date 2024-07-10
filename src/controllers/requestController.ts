import { Request, Response } from 'express';
import RequestRepo from '../repositories/requestRepo';



export const getAllDescriptions = async (req: Request, res: Response): Promise<void> => {
    console.log('controller');
    try {
        const descriptions = await RequestRepo.getAllDescriptions();
        res.json(descriptions);  // Return the entire array of objects
    } catch (error) {
        console.error('Error fetching descriptions:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const getAllTitles = async (req: Request, res: Response): Promise<void> => {
    console.log('controller');
    try {
        const titels = await RequestRepo.getAllTitels();
        const titelsArray = titels.map(req => req.title);
        res.json(titelsArray);
    } catch (error) {
        console.error('Error fetching titels:', error);
        res.status(500).send('Internal Server Error');
    }
};


    
 

