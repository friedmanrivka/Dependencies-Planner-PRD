import {Group} from './groupModel';
import { Priority } from './priorityModel';
export interface Request{
    id:string,
    title: string,
    requesterGroup?:Group,
    description:string,
    priority:Priority,
    finalDecision:boolean,
    planned:string,
    comments:string,
    date:Date,
    affectedGroupsList:JSON,
    JiraLink:string,
    requestgroupid:number;


}
