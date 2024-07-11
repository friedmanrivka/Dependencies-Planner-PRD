import { Request, Response } from 'express';
import FinalDesicionRepo from '../repositories/filnalDesicionRepo'


export const getAllFinalDesicion = async (req: Request, res: Response): Promise<void> => {
    console.log('controller');
    try {
        const finalDecision = await FinalDesicionRepo.getAllFinalDesicion();
        console.log(finalDecision);  // Debugging output for the array of objects
        const finalDecisionArray = finalDecision.map(item => item.decision); 
        console.log(finalDecisionArray); 
     res.json(finalDecisionArray);
    } catch (error) {
        console.error('Error fetching descriptions:', error);
        res.status(500).send('Internal Server Error');
    }
};

// export const getAllFinalDesicion = async (req: Request, res: Response): Promise<void> => {
//     console.log('controller');
//     try {
//         const finalDecision = await FinalDesicionRepo.getAllFinalDesicion();
//         const finalDecisionArray = finalDecision.map(req => req.name); 
//    console.log(finalDecisionArray)
//         res.json(finalDecisionArray);
     
//     } catch (error) {
//         console.error('Error fetching descriptions:', error);
//         res.status(500).send('Internal Server Error');
//     }
// };