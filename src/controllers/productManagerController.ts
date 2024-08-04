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
       
      const email = req.params.email;
      const { productManagerName } = req.body;
  
      await ProductManagerService.addProductManager(email, productManagerName);
        res.status(201).send('Product manager added successfully');
    } catch (error) {
        console.error('Controller: Error adding product manager:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const deleteProductManagerByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const {email} = req.params;
     
      await ProductManagerService.deleteProductManagerByEmail(email);
      res.status(200).send('Product manager deleted successfully');
  } catch (error) {
      console.error('Controller: Error deleting product manager:', error);
      res.status(500).send('Internal Server Error');
  }
};

export const getAllProductManagers = async (req: Request, res: Response): Promise<void> => {
  try {
      const productManagers = await ProductManagerService.getAllProductManagers();
      res.status(200).json(productManagers);
  } catch (error) {
      console.error('Error fetching product managers:', error);
      res.status(500).send('Internal Server Error');
  }
};

export const updateProductManagerName = async (req: Request, res: Response): Promise<void> => {
  try {
    const email = req.params.email;
    const { productManagerName } = req.body;

    await ProductManagerService.updateProductManagerName(email, productManagerName);
    res.status(200).send('Product manager name updated successfully');
  } catch (error) {
    console.error('Controller: Error updating product manager name:', error);
    res.status(500).send('Internal Server Error');
  }
  
};

export const addAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const email = req.params.email;
    const { productManagerName } = req.body;

    await ProductManagerService.addAdmin(email, productManagerName);
    res.status(200).send('Product manager name updated successfully');
  } catch (error) {
    console.error('Controller: Error updating product manager name:', error);
    res.status(500).send('Internal Server Error');
  }
  
};