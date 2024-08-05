import { Request, Response } from 'express';
import RequestService from '../services/newRequestService';

export const CreateDetailsRequest = async (req: Request, res: Response): Promise<void> => {
    const { title, description, JiraLink, priority, requestorGroup, productmanageremail, affectedGroupList, planned } = req.body;
    console.log('Received request data:', req.body); 
    if (!title) {
        res.status(400).send({ error: 'Title is required' });
        return;
    }
    if (!JiraLink) {
        res.status(400).send({ error: 'JiraLink is required' });
        return;
    }
    if (!priority) {
        res.status(400).send({ error: 'Priority is required' });
        return;
    }
    if (!requestorGroup) {
        res.status(400).send({ error: 'Requestor group is required' });
        return;
    }
    if (!productmanageremail) {
        res.status(400).send({ error: 'Product Manager Email is required' });
        return;
    }
    if (!Array.isArray(affectedGroupList) || affectedGroupList.length === 0) {
        res.status(400).send({ error: 'Affected group list is required and should be a non-empty array' });
        return;
    }
    if (!planned) {
        res.status(400).send({ error: 'Planned quarter is required' });
        return;
    }

    try {
        const { request, productManagerName } = await RequestService.createDetailsRequest(title, description, JiraLink, priority, requestorGroup, productmanageremail, affectedGroupList, planned);
        res.status(201).json({
            ...request,
            productManagerName: productManagerName,
        });
    } catch (error) {
        console.error('Error adding request details:', error);
        res.status(500).send({ error: 'Error adding request details' });
    }
};
