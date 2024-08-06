import { AddDetails } from '../repositories/newRequestRepo';
import GroupRepo from '../repositories/groupRepo';
import { pool } from '../config/db';
import { Request as RequestModel } from '../models/requestModel';
import sendSlackMessage from './sendSlackMessege';
export default class RequestService {
    static async createDetailsRequest(
        title: string,
        description: string | undefined,
        JiraLink: string,
        priority: string,
        requestorGroup: string,
        productmanageremail: string,
        affectedGroupList: string[],
        planned: string
    ): Promise<{ request: RequestModel, productManagerName: string }> {
        
        const allGroups = await GroupRepo.getAllGroup();
        const group = allGroups.find(g => g.name === requestorGroup);

        if (!group) {
            throw new Error('Invalid requestor group');
        }

        const productManagerResult = await pool.query('SELECT email, productmanagername FROM productmanager WHERE email = $1', [productmanageremail]);

        if (productManagerResult.rowCount === 0) {
            throw new Error('Invalid product manager email');
        }

        const productManagerId = productManagerResult.rows[0].email;
        const productManagerName = productManagerResult.rows[0].productmanagername;

        const priorityResult = await pool.query('SELECT id FROM priority WHERE critical = $1', [priority]);

        if (priorityResult.rowCount === 0) {
            throw new Error('Invalid priority');
        }

        const priorityId = priorityResult.rows[0].id;
        const affectedGroupIds = affectedGroupList.map(groupName => {
            const group = allGroups.find(g => g.name === groupName);
            if (!group) {
                throw new Error(`Invalid group name: ${groupName}`);
            }
            return group.id;
        });

        const newRequest = await AddDetails(title, group.id, description || '', JiraLink, priorityId, productManagerId, affectedGroupIds, planned);

        // Send notification to Slack
        const message = `New request created: ${title}`;
        await sendSlackMessage(message);
        return {
            request: newRequest,
            productManagerName: productManagerName,
        };
    }
}
