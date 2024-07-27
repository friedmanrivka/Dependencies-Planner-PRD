import { Request, Response, NextFunction } from "express";
import ProductManagerService from '../services/productManagerService';

export const validateDeleteRequest = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).send('Id must be a number');
    }
    if (id <= 0) {
        return res.status(400).send('Id must be a positive number');
    }

    try {
        const exists = await ProductManagerService.requestExists(id);
        if (!exists) {
            return res.status(404).send('Request with this Id does not exist');
        }
    } catch (error) {
        console.error('Error checking if request exists:', error);
        return res.status(500).send('Internal Server Error');
    }

    // Store validated data in res.locals
    res.locals.listData = { id };
    next();
};
