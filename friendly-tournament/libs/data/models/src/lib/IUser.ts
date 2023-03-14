import { IGroup } from "./IGroup";
import { IInvitation } from "./IInvitation";

export class IUser{
    Email:string;
    UserName:string;
    HasAGroup: boolean;
    BirthDate: Date;
    GroupInvites: IInvitation[];
    CurrentGroup: IGroup;
}