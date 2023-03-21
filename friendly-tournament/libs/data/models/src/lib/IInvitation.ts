import { Types } from "mongoose";
import { IGroup } from "./IGroup";
import { IUser } from "./IUser";

export interface IInvitation {
    _id?: string,
    User: IUser;
    Group: IGroup;
    Message: string;
    sendDate: Date;
}