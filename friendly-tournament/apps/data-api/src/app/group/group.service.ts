import { Injectable, NotFoundException } from '@nestjs/common';
import { IGroup, IInvitation, IUser } from '@friendly-tournament/data/models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Headers } from "@nestjs/common/decorators";
import { JwtPayload } from "jsonwebtoken";

@Injectable()
export class GroupService {

  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
    @InjectModel('Group') private groupModel: Model<IGroup>) { }

  getIdFromHeader(@Headers() header): any {
    const base64Payload = header.authorization.split('.')[1];
    const payloadBuffer = Buffer.from(base64Payload, 'base64');
    const updatedJwtPayload: JwtPayload = JSON.parse(payloadBuffer.toString()) as JwtPayload;

    return (updatedJwtPayload.id)
  }
  
  async findAll(): Promise<IGroup[]> {
    return await this.groupModel.find();
  }

  async findById(id: string): Promise<IGroup> {
    const Group = await this.groupModel.findById(id);
    return Group;
  }

  async create(group: Partial<IGroup>, userId: string): Promise<IGroup> {
    const newGroup = new this.groupModel(group);
    await newGroup.save();

    const currentUser = await this.userModel.findById(userId);
    //remove user from old group
    if (currentUser != null) {
      if (currentUser.CurrentGroup != null) {
        const group = this.groupModel.findById(currentUser.CurrentGroup._id);
        for (let i = 0; i < (await group).Users.length; i++) {
          if ((await group).Users[i]._id == currentUser._id) {
            (await group).Users.splice(i, 1);
          }
        }
        (await group).save();
      }
      //add user to new group
      currentUser.CurrentGroup = newGroup;
      await currentUser.save();

      return newGroup.toObject({ versionKey: false });
    } else {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
  }

  async update(id: string, changes: Partial<IGroup>): Promise<IGroup> {
    const group = await this.groupModel.findById(id);
    if (group) {
      group.set(changes);
      await group.save();
      return group.toObject({ versionKey: false });
    }
    throw new NotFoundException(`Group with id ${id} not found`);
  }

  async delete(id: string): Promise<IGroup> {
    const group = await this.groupModel.findById(id);
    if (group) {
      await group.delete();
      return group.toObject({ versionKey: false });
    }
    throw new NotFoundException(`Group with id ${id} not found`);
  }

  //invitations --------------------------------------------
  async invite(userId: number, groupId: number, message: string) {
    const currentGroup = await this.groupModel.findById(groupId);
    const sendToUser = await this.userModel.findById(userId);

    const newInvite: IInvitation = {
      User: sendToUser,
      Group: currentGroup,
      Message: message,
      sendDate: new Date()
    };

    currentGroup.Invites.push(newInvite);
    currentGroup.save();

    sendToUser.GroupInvites.push(newInvite);
    sendToUser.save();

    return currentGroup.toObject({ versionKey: false });

  }
}