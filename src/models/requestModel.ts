import {group} from './groupModel';
export interface Request{
    id:string,
    title: string,
    requesterGroup:group,
    description:string,
    priority:priority,
    finalDecision:boolean,
    planned:string,
    comments:string,
    date:Date,
    affectedGroupsList:group[],
    JiraLink:string


}
export type priority='Critical' | 'High' | 'Low';