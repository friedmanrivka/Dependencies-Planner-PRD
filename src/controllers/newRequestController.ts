import { Request, Response } from 'express';
import { AddDetails } from '../repositories/newRequestRepo';
import GroupRepo from '../repositories/groupRepo'; // Import the default exported class`
import { pool } from '../config/db'; // Assuming you have a pool instance configured

export const CreateDetailsRequest = async (req: Request, res: Response): Promise<void> => {
    const { title, requestgroupid, description, JiraLink, priority, requestorGroup, productmanageremail } = req.body;

    if (!title) {
        res.status(400).send({ error: 'Title is required' });
        return;
    }
    if (!description) {
        res.status(400).send({ error: 'Description is required' });
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

    // Fetch all groups
    const allGroups = await GroupRepo.getAllGroup(); // Call the static method on the imported class

    // Find the group by name
    const group = allGroups.find((g: any) => g.name === requestorGroup);

    if (!group) {
        res.status(400).json({ message: 'Invalid requestor group' });
        return;
    }

    // Fetch product manager by email
    const productManagerResult = await pool.query('SELECT email FROM productmanager WHERE email = $1', [productmanageremail]);

    if (productManagerResult.rowCount === 0) {
        res.status(400).json({ message: 'Invalid product manager email' });
        return;
    }
    const priorityResult = await pool.query('SELECT id FROM priority WHERE critical = $1', [priority]);

    if (priorityResult.rowCount === 0) {
        res.status(400).json({ message: 'Invalid priority' });
        return;
    }

    const priorityId = priorityResult.rows[0].id;

    try {
        const newRequest = await AddDetails(title, group.id, description, JiraLink, priorityId, productmanageremail);
        res.status(201).send(newRequest);
    } catch (error) {
        console.error('Error adding request details:', error);
        res.status(500).send({ error: 'Error adding request details' });
    }
};
