// import { Request } from './requestModel';
// import {AffectedGroup }from "./affectedGroupModel"

// export interface ExtendedRequest extends Request {
//     requestorGroup: string;
//     affectedGroupsList{
//         groupname: string;
//         statusname: string;
//     }[];

// }

// import { Request } from './requestModel';

// export interface ExtendedRequest extends Request {
//     requestorGroup: string,
//     critical: string;
//     decision: string,
//     affectedGroupsList: {
//         groupname: string;
//         statusname: string;
//     }[];
// }
// import { Request } from './requestModel';

// export interface ExtendedRequest extends Request {
//     productmanagername: string;
//     critical: string;
//     decision: string;
//     affectedGroupsList: {
//         groupid?: number;
//         groupname: string;
//         statusname: string;
//     }[];
// }
// import { Request } from './requestModel';

// export interface ExtendedRequest extends Request {
//     productmanagername: string;
//     critical: string;
//     decision: string;
//     affectedGroupsList: {
//         groupname: string;
//         statusname: string;
//     }[];
// }

import { Request } from './requestModel';

export interface ExtendedRequest extends Request {
    productmanagername: string;
    critical: string;
    decision: string;
    affectedGroupsList: {
        groupname: string;
        statusname: string;
    }[];
}
