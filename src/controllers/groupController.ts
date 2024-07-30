import { Request, Response } from 'express'
import GroupRepo from '../repositories/groupRepo';

  export const getRequestorGroup = async (req: Request, res: Response): Promise<void> => {
    console.log('controller')
    try {
      const group = await GroupRepo.getAllGroup();
      const namesArray= group.map(g => g.name);
      res.json(namesArray);
    } catch (error) {
      console.error('Error fetching requestor names:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  export const getAllGroups = async (req: Request, res: Response): Promise<void> => {
    console.log('controller')
    try {
      const group = await GroupRepo.getAllGroup();
      res.json(group);
    } catch (error) {
      console.error('Error fetching get groups:', error);
      res.status(500).send('Internal Server Error');
    }
  };
 


  export const addGroup = async (req: Request, res: Response): Promise<void> => {
    try {
      const { groupName } = req.body;
      await GroupRepo.addGroup(groupName);
      res.status(201).send('Group added successfully');
    } catch (err) {
      console.error('Error adding group:', err);
      res.status(500).send('Internal Server Error');
    }
  };


  export const deleteGroupByName = async (req: Request, res: Response): Promise<void> => {
    const { groupName } = req.body;
    try {
        await GroupRepo.deleteGroupByName(groupName);
        res.status(200).send('Group deleted successfully');
    } catch (error) {
        console.error('Controller: Error deleting group:', error);
        res.status(500).send('Internal Server Error');
    }
  };

  