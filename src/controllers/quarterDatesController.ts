import { Request, Response } from 'express';
import QuarterRepo from '../repositories/quarterDatesRepo';

// export const setCurrentQuarter = async (req: Request, res: Response) => {
//   try {
//     const { year, quarter } = req.body;

   

//     const currentQuarter = await QuarterRepo.setCurrentQuarter(year, quarter);
//     return res.status(200).json({ message: 'Current quarter set successfully', currentQuarter });
//   } catch (error) {
//     console.error('Controller: Error setting current quarter:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };
export const setCurrentQuarter = async (req: Request, res: Response) => {
  try {
    // Extract year, quarter, and isCurrent from the request body
    const { year, quarter, isCurrent } = req.body;

    console.log(`Setting current quarter: ${year} ${quarter}, isCurrent: ${isCurrent}`);

    // Update the current quarter in the database using the repository
    const currentQuarter = await QuarterRepo.setCurrentQuarter(year, quarter, isCurrent);

    // Send a success response
    return res.status(200).json({ message: 'Current quarter set successfully', currentQuarter });
  } catch (error) {
    console.error('Controller: Error setting current quarter:', error);
    // Send an error response in case of failure
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCurrentQuarter = async (req: Request, res: Response) => {
  try {
    // Fetch current quarters from the repository
    const currentQuarters = await QuarterRepo.getQuarter();

    // Check if there are any current quarters returned
    if (!currentQuarters || currentQuarters.length === 0) {
      return res.status(404).json({ message: 'No current quarters found.' });
    }

    // Return the current quarters as a plain array response
    return res.status(200).json(currentQuarters);
  } catch (error) {
    console.error('Controller: Error fetching current quarters:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getQ = async (req: Request, res: Response) => {
  try {
    const currentQuarter = await QuarterRepo.getQ();

    if (!currentQuarter) {
      return res.status(404).send('No current quarter found.');
    }
 // Return the current quarter as a plain string
    return res.status(200).send(currentQuarter);
  } catch (error) {
    console.error('Controller: Error fetching current quarter:', error);
    return res.status(500).send('Internal server error');
  }
};