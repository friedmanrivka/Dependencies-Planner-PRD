import {Group} from './groupModel';
export interface Request{
    id:string,
    title: string,
    requesterGroup:Group,
    description:string,
    priority:priority,
    finalDecision:boolean,
    planned:string,
    comments:string,
    date:Date,
    affectedGroupsList:JSON,
    JiraLink:string


}
export type priority='Critical' | 'High' | 'Low';