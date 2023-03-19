import { Types } from "mongoose";
import { IGroup } from "./IGroup";
import { IUser } from "./IUser";

export interface IInvitation {
    _id?: string,
    User: Types.ObjectId | IUser;
    Group: Types.ObjectId | IGroup;
    Message: string;
    sendDate: Date;
}