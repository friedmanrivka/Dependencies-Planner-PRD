import { Request, Response } from 'express';
import RequestRepo from '../repositories/requestRepo';
import {} from '../models/extendedRequestModel'

export const getAllRequest = async (req: Request, res: Response): Promise<void> => {
    console.log('Controller: Entering getAllRequest method');
    try {
        const descriptions = await RequestRepo.getAllRequest();
        console.log('Controller: Descriptions fetched successfully:', JSON.stringify(descriptions, null, 2));
        res.json(descriptions);
    } catch (error) {
        console.error('Controller: Error fetching descriptions:', error);
        res.status(500).send('Internal Server Error');
    }
};

// export const updateFinalDecision = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const id = parseInt(req.params.id, 10); 
//         const finalDecision = req.body.finalDecision; 
//         if (isNaN(id) ) {
//             res.status(400).send('Invalid id or finalDecision');
//             return;
//         }
//         await RequestRepo.updateFinalDecision(id, finalDecision);
//         res.status(200).send('Final decision updated successfully');
//     } catch (error) {
//         console.error('Error updating final decision:', error);
//         res.status(500).send('Internal Server Error');
//     }

    
// };


export const updateFinalDecision = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10); 
        const finalDecision = req.body.finalDecision; 
        const jiraLink = req.body.jiraLink; 
        const comment = req.body.comment; 

        if (isNaN(id) || !finalDecision) {
            res.status(400).send('Invalid id or finalDecision');
            return;
        }

        // Validate based on finalDecision
        if (finalDecision === 'inQ' && !jiraLink) {
            res.status(400).send('Jira Link is mandatory when final decision is "In Q"');
            return;
        }

        if (finalDecision === 'notInQ' && !comment) {
            res.status(400).send('Comment is required when final decision is "Not in Q"');
            return;
        }

        // Perform the update
        await RequestRepo.updateFinalDecision(id, finalDecision);

        // Update Jira Link if provided
        if (jiraLink) {
            await RequestRepo.updateRequestJira(id, jiraLink);
        }

        // Update comment if provided
        if (comment) {
            await RequestRepo.updateRequestComment(id, comment);
        }

        res.status(200).send('Final decision updated successfully');
    } catch (error) {
        console.error('Error updating final decision:', error);
        res.status(500).send('Internal Server Error');
    }
};


export const updateDescription = async (req: Request, res: Response): Promise<void> => {
    console.log('Controller: Entering updateDescription method');
    const { requestId, description } = req.body;

    try {
        await RequestRepo.updateDescription(requestId, description);
        console.log('Controller: Description updated successfully');
        res.status(200).json({ message: 'Description updated successfully' });
    } catch (error) {
        console.error('Controller: Error updating description:', error);
        res.status(500).send('Internal Server Error');
    }
};
export const updateRequestTitle = async (req: Request, res: Response): Promise<void> => {
    console.log('Controller: Entering updateRequestTitle method');
    const { requestId, title } = req.body;

    try {
        await RequestRepo.updateRequestTitle(requestId, title);
        console.log('Controller: Title updated successfully');
        res.status(200).json({ message: 'Title updated successfully' });
    } catch (error) {
        console.error('Controller: Error updating title:', error);
        res.status(500).send('Internal Server Error');
    }
};



export const updateRequestComment = async (req: Request, res: Response): Promise<void> => {
    console.log('Controller: Entering updateRequestComment method');
    const { requestId, comment } = req.body;

    try {
        await RequestRepo.updateRequestComment(requestId, comment);
        console.log('Controller: Comment updated successfully');
        res.status(200).json({ message: 'Comment updated successfully' });
    } catch (error) {
        console.error('Controller: Error updating comment:', error);
        res.status(500).send('Internal Server Error');
    }
};
export const updateRequestJira = async (req: Request, res: Response): Promise<void> => {
    console.log('Controller: Entering updateRequestJira method');
    const { requestId, jira } = req.body;

    try {
        await RequestRepo.updateRequestJira(requestId, jira);
        console.log('Controller: jira updated successfully');
        res.status(200).json({ message: 'Jira updated successfully' });
    } catch (error) {
        console.error('Controller: Error updating jira:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const updateRequestProductManager = async (req: Request, res: Response): Promise<void> => {
    console.log('Controller: Entering updateRequestProductManager method');
    const { requestId, productManagerName } = req.body;

    try {
        await RequestRepo.updateRequestProductManager(requestId, productManagerName);
        console.log('Controller: Product Manager updated successfully');
        res.status(200).json({ message: 'Product Manager updated successfully' });
    } catch (error) {
        console.error('Controller: Error updating Product Manager:', error);
        res.status(500).send('Internal Server Error');
    }
};
export const updateRequestorGroup = async (req: Request, res: Response): Promise<void> => {
    console.log('Controller: Entering updateRequestorGroup method');
    const { requestId, groupName } = req.body;

    try {
        await RequestRepo.updateRequestProductManager(requestId, groupName);
        console.log('Controller: Product Manager updated successfully');
        res.status(200).json({ message: 'Product Manager updated successfully' });
    } catch (error) {
        console.error('Controller: Error updating Product Manager:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const updatePriority= async (req: Request, res: Response): Promise<void> => {
    console.log('Controller: Entering updatePriority method');
     try {
        const { requestId, priorityName} = req.body;
        await RequestRepo. updatePriority(requestId, priorityName);
        console.log('Controller: priority updated successfully');
        res.status(200).json({ message: ' priority updated successfully' });
    } catch (error) {
        console.error('Controller: Error updating  priority:', error);
        res.status(500).send('Internal Server Error');
    }
};

// export const updateIdDrag = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const id = parseInt(req.params.id, 10); // Ensure id is parsed as a number
//         const id2 = parseInt(req.params.id, 10); // Ensure id is parsed as a number
//         if (isNaN(id)|| isNaN(id2)) {
//             res.status(400).send('Invalid id or updateIdDrag');
//             return;
//         }
//         await RequestRepo.updateIdDrag(id,id2);
//         res.status(200).send('IdDrag updated successfully');
//     } catch (error) {
//         console.error('Error updating IdDrag:', error);
//         res.status(500).send('Internal Server Error');
//     }
// }

