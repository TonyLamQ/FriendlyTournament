import { Observable, of } from 'rxjs';
import { IGroup, IInvitation, ITournament, IUser } from '@friendly-tournament/data/models';
// import { Tournament, TournamentDocument } from './tournament.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Headers } from '@nestjs/common/decorators';
import { JwtPayload } from 'jsonwebtoken';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
    @InjectModel('Group') private groupModel: Model<IGroup>,
    private neoService: Neo4jService) {
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
    return user.toObject({ versionKey: false });
  }

  async getFriends(id: string): Promise<IUser[]> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException(`User with ${id} not found`);
    return user.Friends;
  }

  async befriend(userId: string, sendToUserId: string): Promise<IUser> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException(`User with ${userId} not found`);
    const sendToUser = await this.userModel.findById(sendToUserId);
    if (!sendToUser) throw new NotFoundException(`User with ${sendToUserId} not found`);
    if (user._id.toString() == sendToUser._id.toString()) throw new ConflictException(`You can't befriend yourself`);

    let isFriend = false;
    for (let i = 0; i < user.Friends.length; i++) {
      if (user.Friends[i]._id.toString() == sendToUser._id.toString()) {
        isFriend = true;
      }
    }

    if (isFriend) throw new ConflictException(`You are already friends with ${sendToUser.UserName}`);

    user.Friends.push(sendToUser);
    user.save();

    await this.neoService.write(`
    MATCH (u:User {userId: $userId}), (f:User {userId: $sUserId})
    CREATE (u)-[:ISFRIENDS]->(f) `, {
      userId: userId.toString(),
      sUserId: sendToUser._id.toString()
    })
    return user.toObject({ versionKey: false });
  }

  async unfriend(userId: string, unfriendUserId: string): Promise<IUser> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException(`User with ${userId} not found`);

    const unfriendUser = await this.userModel.findById(unfriendUserId);
    if (!unfriendUser) throw new NotFoundException(`User with ${unfriendUserId} not found`);

    let isFriend = false;
    for (let i = 0; i < user.Friends.length; i++) {
      if (user.Friends[i]._id.toString() == unfriendUser._id.toString()) {
        isFriend = true;
      }
    }
    if (!isFriend) throw new ConflictException(`You are not friends with ${unfriendUser.UserName}`);

    user.Friends.splice(user.Friends.indexOf(unfriendUser), 1);
    user.save();

    await this.neoService.write(`
      MATCH (u:User {userId: $userId})-[c:ISFRIENDS]->(f:User {userId: $fUserId})
      DELETE c`,{
      userId: userId.toString(),
      fUserId: unfriendUser._id.toString()
    })
    return user.toObject({ versionKey: false });
  }
}