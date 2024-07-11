// import { Request } from '../models/requestModel';
// import { Group } from '../models/groupModel';

// export const mapRequestsToGroups = (requests: Request[], groups: Group[]): any[] => {
//     const groupMap = new Map<number, Group>();
//     groups.forEach(group => groupMap.set(group.id, group));

//     return requests.map(request => {
//         const group = groupMap.get(request.gtoupid);
//         return {
//             ...request,
//             requesterGroup: group ? { id: group.id, productmanagername: group.productmanagername } : null
//         };
//     });
// };
