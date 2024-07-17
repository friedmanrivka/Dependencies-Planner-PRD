
export interface Request {
    id: number,
    title: string,
    description: string,
    planned: string,
    datetime: Date,
    comment: string,
    JiraLink: string,
    priority_id: number,
    finalDecision: number,
   productmanagerid: number,
    // affectedGroupsList: number,
    requestgroupid: number;
}