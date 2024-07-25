import { Request, Response } from 'express';
import { AddDetails } from '../repositories/newRequestRepo';
import GroupRepo from '../repositories/groupRepo';
import { pool } from '../config/db';

export const CreateDetailsRequest = async (req: Request, res: Response): Promise<void> => {
    const { title, description, JiraLink, priority, requestorGroup, productmanageremail, affectedGroupList, planned } = req.body;

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
    if (!Array.isArray(affectedGroupList) || affectedGroupList.length === 0) {
        res.status(400).send({ error: 'Affected group list is required and should be a non-empty array' });
        return;
    }
    if (!planned) {
        res.status(400).send({ error: 'Planned quarter is required' });
        return;
    }

    try {
        const allGroups = await GroupRepo.getAllGroup();
        const group = allGroups.find(g => g.name === requestorGroup);

        if (!group) {
            res.status(400).json({ message: 'Invalid requestor group' });
            return;
        }

        const productManagerResult = await pool.query('SELECT email, productmanagername FROM productmanager WHERE email = $1', [productmanageremail]);

        if (productManagerResult.rowCount === 0) {
            res.status(400).json({ message: 'Invalid product manager email' });
            return;
        }

        const productManagerId = productManagerResult.rows[0].email;
        const productManagerName = productManagerResult.rows[0].productmanagername;

        const priorityResult = await pool.query('SELECT id FROM priority WHERE critical = $1', [priority]);

        if (priorityResult.rowCount === 0) {
            res.status(400).json({ message: 'Invalid priority' });
            return;
        }

        const priorityId = priorityResult.rows[0].id;
        const affectedGroupIds = affectedGroupList.map(groupName => {
            const group = allGroups.find(g => g.name === groupName);
            if (!group) {
                throw new Error(`Invalid group name: ${groupName}`);
            }
            return group.id;
        });

        const newRequest = await AddDetails(title, group.id, description, JiraLink, priorityId, productManagerId, affectedGroupIds, planned);

        res.status(201).json({
            ...newRequest,
            productManagerName: productManagerName,
        });
    } catch (error) {
        console.error('Error adding request details:', error);
        res.status(500).send({ error: 'Error adding request details' });
    }
};
