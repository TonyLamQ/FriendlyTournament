import { Injectable, NotFoundException } from '@nestjs/common';
import { IGroup, IInvitation, IUser } from '@friendly-tournament/data/models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GroupService {

  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
    @InjectModel('Group') private groupModel: Model<IGroup>) { }


  async findAll(): Promise<IGroup[]> {
    return await this.groupModel.find();
  }

  async findById(id: string): Promise<IGroup> {
    const Group = await this.groupModel.findById(id);
    return Group;
  }

  async create(group: Partial<IGroup>): Promise<IGroup> {
    const newGroup = new this.groupModel(group);
    await newGroup.save();
    return newGroup.toObject({ versionKey: false });
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