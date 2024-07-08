export  default interface AffectedGroup {
    id: number;
    requestId: number;
    status: Status;
    tShirtsize:TShirtsize;


}
export type TShirtsize = 'small' | 'medium' | 'large';
export type Status='Pending Response'|'InQueue'|'notInQueue'