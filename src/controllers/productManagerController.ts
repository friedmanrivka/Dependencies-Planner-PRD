import { Request, Response } from 'express';
import ProductManagerRepo from '../repositories/productManagerRepo';



export const getRequestorNames = async (req: Request, res: Response): Promise<void> => {
    console.log('controller')
    try {
      const productManagerNames = await ProductManagerRepo.getAllProductManagerNames();
      res.json(productManagerNames);
    } catch (error) {
      console.error('Error fetching requestor names:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
