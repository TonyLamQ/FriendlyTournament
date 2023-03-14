import { Observable, of } from 'rxjs';
import { IGroup, IInvitation, ITournament, IUser } from '@friendly-tournament/data/models';
// import { Tournament, TournamentDocument } from './tournament.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
    @InjectModel('Group') private groupModel: Model<IGroup>) {
  }

  async findAll(): Promise<IUser[]> {
    return this.userModel.find();
  }

  async findById(id: string): Promise<IUser> {
    const user = await this.userModel.findById(id);
    return user.toObject({versionKey: false});
  }

  async inviteResponse(userId: string, response: boolean, groupId: string) {
    const currentGroup = await this.groupModel.findById(groupId)
    const currentUser = await this.userModel.findById(userId)

    currentGroup.Invites.forEach(invite => {
      if(invite.User._id === userId)
        if(response){
          console.log("invite accepted")
          currentGroup.Users.push(currentUser)
          currentGroup.save();
          return currentGroup.toObject({ versionKey: false });
        }
    });
    console.log("invite declined")
    return currentGroup.toObject({ versionKey: false });
  }
}