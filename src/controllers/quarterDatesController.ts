import { Request, Response } from 'express';
import QuarterRepo from '../repositories/quarterDatesRepo';

export const setCurrentQuarter = async (req: Request, res: Response) => {
  try {
    const { year, quarter } = req.body;

   

    const currentQuarter = await QuarterRepo.setCurrentQuarter(year, quarter);
    return res.status(200).json({ message: 'Current quarter set successfully', currentQuarter });
  } catch (error) {
    console.error('Controller: Error setting current quarter:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCurrentQuarter = async (req: Request, res: Response) => {
  try {
    const currentQuarters = await QuarterRepo.getCurrentQuarter();
    if (currentQuarters.length === 0) {
      return res.status(404).json({ message: 'No current quarter found.' });
    }
    
    // Return the array of current quarters directly
    return res.status(200).json(currentQuarters);
  } catch (error) {
    console.error('Controller: Error fetching current quarters:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};