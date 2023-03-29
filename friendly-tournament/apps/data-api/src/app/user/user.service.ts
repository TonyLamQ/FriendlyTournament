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

  getIdFromHeader(@Headers() header): string {
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

  async getFriends(id: string): Promise<IUser[]> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException(`User with ${id} not found`);
    return user.Friends;
  }
  async leave(userId: string): Promise<IUser> {
    const user = await this.userModel.findById(userId);
    if (user) {
      const group = await this.groupModel.findById(user.CurrentGroup);
      if(!group) throw new NotFoundException(`Group with id ${user.CurrentGroup} not found`);

      for (let i = 0; i < group.Users.length; i++) {
        if (group.Users[i]._id.toString() == user._id.toString()) {
          group.Users.splice(i, 1);
        }
      }
      group.save();
      user.CurrentGroup = null;
      user.save();
      return user.toObject({ versionKey: false });
    }
  }

  async befriend(userId:string, sendToUserId:string) : Promise<IUser>{
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException(`User with ${userId} not found`);
    const sendToUser = await this.userModel.findById(sendToUserId);
    if (!sendToUser) throw new NotFoundException(`User with ${sendToUserId} not found`);

    if (user.Friends.includes(sendToUser)) throw new ConflictException(`User with ${sendToUserId} already followed`);

    user.Friends.push(sendToUser);
    user.save();
    return user.toObject({ versionKey: false });
  }

  async unfriend(userId:string, unfriendUserId:string): Promise<IUser>{
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException(`User with ${userId} not found`);
    const unfriendUser = await this.userModel.findById(unfriendUserId);
    if (!unfriendUser) throw new NotFoundException(`User with ${unfriendUserId} not found`);

    if (user.Friends.includes(unfriendUser)) {
      user.Friends.splice(user.Friends.indexOf(unfriendUser), 1);
    }
    user.save();
    return user.toObject({ versionKey: false });
  }
}