import { Request, Response } from 'express';
import GroupRepo from '../repositories/groupRepo';

  export const getRequestorGroup = async (req: Request, res: Response): Promise<void> => {
    console.log('controller')
    try {
      const productGroup = await GroupRepo.getAllGroup();
      res.json(productGroup);
    } catch (error) {
      console.error('Error fetching requestor names:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
