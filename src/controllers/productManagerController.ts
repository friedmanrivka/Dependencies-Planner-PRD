import { Request, Response } from 'express';
import ProductManagerRepo from '../repositories/productManagerRepo';



export const getRequestorNames = async (req: Request, res: Response): Promise<void> => {
    console.log('controller')
    try {
      const productManagerNames = await ProductManagerRepo.getAllProductManagerNames();
      console.log(productManagerNames)
      const namesArray = productManagerNames.map(pm => pm.productmanagername);
      res.json(namesArray);
    } catch (error) {
      console.error('Error fetching requestor names:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  export const getProductManagerEmails = async (req: Request, res: Response): Promise<void> => {
    console.log('controller')
    try {
      const productManagerEmails = await ProductManagerRepo.getAllProductManagerEmails();
      console.log(productManagerEmails)
      const emailsArray = productManagerEmails.map(pm => pm.email);
      res.json(emailsArray);
    } catch (error) {
      console.error('Error fetching requestor emails:', error);
      res.status(500).send('Internal Server Error');
    }
  };