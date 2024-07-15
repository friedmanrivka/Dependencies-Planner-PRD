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
export const updateFinalDecision = async (req: Request, res: Response): Promise<void> => {
    console.log('controller');
    try {
        const id = parseInt(req.params.id, 10); // Ensure id is parsed as a number
        const finalDecision = parseInt(req.body.finalDecision, 10); // Ensure finalDecision is parsed as a number
        if (isNaN(id) || isNaN(finalDecision)) {
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





