import { IGroup } from "./IGroup";
import { IUser } from "./IUser";

export class ITournament{
    _id?: string;
    Name: string;
    Game: string;
    RewardPrize: number= 10;
    Date: Date | undefined;
    Creator: IUser;
    Groups: IGroup[] | undefined;

}