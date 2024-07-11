import { Status } from "./statusModel";
import { TSize } from "./tSizeModel";
export  default interface AffectedGroupModel {
    id: number;
    requestId: number;
    status: Status;
    tShirtsize:TSize;
}
