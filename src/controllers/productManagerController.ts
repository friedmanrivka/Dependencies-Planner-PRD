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

export const addGroupToManager = async (req: Request, res: Response): Promise<void> => {
  console.log('Controller: Entering addGroupToManager method');

  try {
    const { email, groupName } = req.body; // Destructure email and groupName from request body

    // Call the repository function to add the group to the manager
    await ProductManagerRepo.addGroupToManager(email, groupName);

    console.log('Controller: Group ID added successfully');
    res.status(200).json({ message: 'Group ID added successfully' });
  } catch (error) {
    console.error('Controller: Error adding group ID:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const removeGroupFromManager = async (req: Request, res: Response): Promise<void> => {
  console.log('Controller: Entering removeGroupFromManager method');

  try {
    const { email, groupName } = req.body; // Destructure email and groupName from request body

    // Call the repository function to remove the group from the manager
    await ProductManagerRepo.removeGroupFromManager(email, groupName);

    console.log('Controller: Group ID removed successfully');
    res.status(200).json({ message: 'Group ID removed successfully' });
  } catch (error) {
    console.error('Controller: Error removing group ID:', error);
    res.status(500).send('Internal Server Error');
  }
};
