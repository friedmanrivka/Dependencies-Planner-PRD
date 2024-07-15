
export interface Request {
    id: number,
    title: string,
    requesterGroup?: number,
    description: string,
    priority: number,
    finalDecision: number,
    planned: string,
    comments: string,
    date: Date,
    affectedGroupsList: JSON,
    JiraLink: string,
    requestgroupid: number;
}