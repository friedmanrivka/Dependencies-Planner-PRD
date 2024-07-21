import { Request, Response } from 'express';
import RequestRepo from '../repositories/requestRepo';
import {} from '../models/extendedRequestModel'



// export const getAllRequst = async (req: Request, res: Response): Promise<void> => {
//     console.log('controller');
//     try {
//         const descriptions = await RequestRepo.getAllRequest();
//         res.json(descriptions);
//     } catch (error) {
//         console.error('Error fetching descriptions:', error);
//         res.status(500).send('Internal Server Error');
//     }
// };
// import { Request, Response } from 'express';
// import RequestRepo from '../repositories/requestRepo';
// import {} from '../models/extendedRequestModel';

export const getAllRequest = async (req: Request, res: Response): Promise<void> => {
    console.log('Controller: Entering getAllRequest method');
    try {
        const descriptions = await RequestRepo.getAllRequest();
        console.log('Controller: Descriptions fetched successfully:', JSON.stringify(descriptions, null, 2));
        res.json(descriptions);
    } catch (error) {
        console.error('Controller: Error fetching descriptions:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const updateFinalDecision = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10); // Ensure id is parsed as a number
        const finalDecision = req.body.finalDecision; // Ensure finalDecision is parsed as a number
        if (isNaN(id) ) {
            res.status(400).send('Invalid id or finalDecision');
            return;
        }
        await RequestRepo.updateFinalDecision(id, finalDecision);
        res.status(200).send('Final decision updated successfully');
    } catch (error) {
        console.error('Error updating final decision:', error);
        res.status(500).send('Internal Server Error');
    }
}