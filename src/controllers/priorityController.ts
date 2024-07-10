import { Request, Response } from 'express';
import priorityRepo from '../repositories/priorityRepo'
export const getAllPriority = async (req: Request, res: Response): Promise<void> => {
    console.log('controller');
    try {
        const priority = await priorityRepo.getAllPriority();
        const priorityArray = priority.map(req => req.name);  // Change 'req.priority' to 'req.name'
        res.json(priorityArray);
        console.log(priorityArray);
    } catch (error) {
        console.error('Error fetching descriptions:', error);
        res.status(500).send('Internal Server Error');
    }
};