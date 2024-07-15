// import StatusRepo from "../repositories/statusRepo";
//  import { Request, Response } from 'express'
// export const getAllStatus = async (req: Request, res: Response): Promise<void> => {
//     console.log('controller');
//     try {
//         const status = await StatusRepo.getAllStatus();
//         console.log(status);  
      
//    res.json(status)
//     } catch (error) {
//         console.error('Error fetching descriptions:', error);
//         res.status(500).send('Internal Server Error');
//     }
// };

import { Request, Response } from 'express';
import StatusRepo from "../repositories/statusRepo";

export const getAllStatus = async (req: Request, res: Response): Promise<void> => {
    console.log('controller');
    try {
        const status = await StatusRepo.getAllStatus();
        console.log(status);  
        
        const statusArray = status.map(item => item.status); // ממיר את מערך האובייקטים למערך של ערכים בלבד
        console.log(statusArray);
        
        res.json(statusArray);
    } catch (error) {
        console.error('Error fetching descriptions:', error);
        res.status(500).send('Internal Server Error');
    }
};

