import { Request, Response } from 'express';
import ProductManagerRepo from '../repositories/productManagerRepo';
import ProductManagerService from '../services/productManagerService';


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

  export const addProductManagerController = async (req: Request, res: Response): Promise<void> => {
    try {
       
        // const { email } = req.query;
        const {email, productmanagername } = req.body;
        await ProductManagerService.addProductManager( email as string,productmanagername);
        res.status(201).send('Product manager added successfully');
    } catch (error) {
        console.error('Controller: Error adding product manager:', error);
        res.status(500).send('Internal Server Error');
    }
};