import { Group } from './groupModel';
import { Priority } from './priorityModel';
export interface Request {
    id: number,
    title: string,
    requesterGroup?: Group,
    description: string,
    priority: Priority,
    finalDecision: number,
    planned: string,
    comments: string,
    date: Date,
    affectedGroupsList: JSON,
    JiraLink: string,
    requestgroupid: number;
}