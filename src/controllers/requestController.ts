import { Request, Response } from 'express';
import RequestRepo from '../repositories/requestRepo';



export const getAllRequst = async (req: Request, res: Response): Promise<void> => {
    console.log('controller');
    try {
        const descriptions = await RequestRepo.getAllRequst();
        res.json(descriptions);  
    } catch (error) {
        console.error('Error fetching descriptions:', error);
        res.status(500).send('Internal Server Error');
    }
};
export const getAllfilterRequests = async (req: Request, res: Response): Promise<void> => {
    console.log('controller');
    try {
        const { involvedGroup, requestorGroup, requestorName } = req.query;
        const filteredRequests = await RequestRepo.getAllfilterRequests(involvedGroup as string, requestorGroup as string, requestorName as string);
        res.json(filteredRequests);  
    } catch (error) {
        console.error('Error fetching filtered requests:', error);
        res.status(500).send('Internal Server Error');
    }
};


// export const getAllTitles = async (req: Request, res: Response): Promise<void> => {
//     console.log('controller');
//     try {
//         const titels = await RequestRepo.getAllTitels();
//         const titelsArray = titels.map(req => req.title);
//         res.json(titelsArray);
//     } catch (error) {
//         console.error('Error fetching titels:', error);
//         res.status(500).send('Internal Server Error');
//     }
// };


    
 

