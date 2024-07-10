import { Request, Response } from 'express';
import ProductManagerRepo from '../repositories/productManagerRepo';



export const getRequestorNames = async (req: Request, res: Response): Promise<void> => {
    console.log('controller')
    try {
      const productManagerNames = await ProductManagerRepo.getAllProductManagerNames();
     
      const namesArray = productManagerNames.map(pm => pm.productmanagername);
      res.json(namesArray);
    } catch (error) {
      console.error('Error fetching requestor names:', error);
      res.status(500).send('Internal Server Error');
    }
  };



