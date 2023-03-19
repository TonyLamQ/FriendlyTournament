import { Observable, of } from 'rxjs';
import { IGroup, IInvitation, ITournament, IUser } from '@friendly-tournament/data/models';
// import { Tournament, TournamentDocument } from './tournament.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Headers } from '@nestjs/common/decorators';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
    @InjectModel('Group') private groupModel: Model<IGroup>,
    @InjectModel('Invite') private inviteModel: Model<IInvitation>) {
  }

  getIdFromHeader(@Headers() header): any {
    const base64Payload = header.authorization.split('.')[1];
    const payloadBuffer = Buffer.from(base64Payload, 'base64');
    const updatedJwtPayload: JwtPayload = JSON.parse(payloadBuffer.toString()) as JwtPayload;

    return (updatedJwtPayload.id)
  }

  async findAll(): Promise<IUser[]> {
    return this.userModel.find();
  }

  async findById(id: string): Promise<IUser> {
    const user = await this.userModel.findById(id);
    return user.toObject({versionKey: false});
  }

  async getInvites(id: string): Promise<IInvitation[]> {
    const user = await this.userModel.findById(id);
    if(user.CurrentGroup != null){
      throw new ConflictException("User is already in a group");
    }
    return user.GroupInvites;
  }

  async inviteResponse(userId: string, response: boolean, inviteId: string) {
    const invite = await this.inviteModel.findById(inviteId);
    const currentGroup = await this.groupModel.findById(invite.Group._id)
    const currentUser = await this.userModel.findById(userId)

    if(currentUser.CurrentGroup != null){
      throw new ConflictException("User is already in a group");
    }
    //is invite for this user?
      if(invite.User._id === userId)
      //if true
        if(response){
          console.log("invite accepted")
          currentGroup.Users.push(currentUser)
          currentGroup.save();
          return currentGroup.toObject({ versionKey: false });
        } else {
          console.log("invite declined")
          currentUser.GroupInvites.splice(currentUser.GroupInvites.indexOf(invite), 1)
          currentUser.save();
          this.inviteModel.findByIdAndDelete(invite._id)
          return currentGroup.toObject({ versionKey: false });
        }

    console.log("invite not for this user");
    throw new ConflictException("Invite not for this user");
  }
}