import { IEntry } from "./IEntry";
import { IInvitation } from "./IInvitation";
import { IUser } from "./IUser";

export class IGroup{
    _id?: string;
    Name: string;
    CreatedDate: Date | undefined;
    Entries: IEntry[] | undefined;
    Invites: IInvitation[] | undefined;
    Users: IUser[] | undefined;
}