import { Request } from '../models/requestModel';
import { Group } from '../models/groupModel';
import { ExtendedRequest } from '../models/extendedRequestModel';
export const mapRequestsToGroups = (requests: Request[], groups: Group[]): any[] => {
    const groupMap = new Map<number, string>();
    groups.forEach(group => {
        console.log(`Mapping group id ${group.id} to name ${group.name}`);
        groupMap.set(group.id, group.name);
    });
    return requests.map(request => {
        const groupName = groupMap.get(request.requestgroupid);
        console.log(`Mapping request id ${request.id} with groupid ${request.requestgroupid} to group ${groupName}`);
        const { requestgroupid, ...rest } = request;
        return {
            ...rest,
            requestorGroup: groupName || 'Unknown Group' // Add the group name to the request
        };
    });
};

