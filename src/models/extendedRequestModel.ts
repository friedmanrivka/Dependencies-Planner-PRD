import { Request } from './requestModel';

export interface ExtendedRequest extends Request {
    requestorGroup: string;

}