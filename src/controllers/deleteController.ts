import { Request, Response } from 'express';
import ProductManagerService from '../services/productManagerService';

export const deleteRequest = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);
        await ProductManagerService.deleteRequest(id);
        res.status(200).send('Request deleted successfully');
    } catch (error) {
        console.error('Error Request manager:', error);
        res.status(500).send('Internal Server Error');
    }
};
