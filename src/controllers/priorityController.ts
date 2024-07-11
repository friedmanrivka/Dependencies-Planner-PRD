import { Request, Response } from 'express';
import priorityRepo from '../repositories/priorityRepo';
import { Priority } from '../models/priorityModel';
export const getAllPriority = async (req: Request, res: Response): Promise<void> => {
    console.log('controller');
    try {
        const priority = await priorityRepo.getAllPriority();
        const priorityArray = priority.map(req => req.critical);  // Change 'req.priority' to 'req.name'
        res.json(priorityArray);
        console.log(priorityArray);
    } catch (error) {
        console.error('Error fetching descriptions:', error);
        res.status(500).send('Internal Server Error');
    }
};

// import { Request, Response } from 'express';
// import priorityRepo from '../repositories/priorityRepo';
// import { Priority } from '../models/priorityModel';

// export  class PriorityController {
//     static async getAllPriority(req: Request, res: Response) {
//         try {
//             const priorities: Priority[] = await priorityRepo.getAllPriority();
//             res.json(priorities);
//         } catch (err) {
//             console.error('Error in getAllPriorities controller:', err);
//             res.status(500).send('Internal Server Error');
//         }
//     }
// }


