import { Injectable, NotFoundException } from '@nestjs/common';
import { IGroup, IInvitation, IUser } from '@friendly-tournament/data/models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Headers } from "@nestjs/common/decorators";
import { JwtPayload } from "jsonwebtoken";
import { BadRequestException } from '@nestjs/common/exceptions';

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

    const currentUser = await this.userModel.findById(userId);
    //remove user from old group
    if (currentUser != null) {
      if (currentUser.CurrentGroup != null) {
        const group = await this.groupModel.findById(currentUser.CurrentGroup._id);
        for (let i = 0; i < group.Users.length; i++) {
          if (group.Users[i]._id == currentUser._id) {
            group.Users.splice(i, 1);
          }
        }
        group.save();
      }
      //add group for user
      currentUser.CurrentGroup = newGroup;
      await currentUser.save();

      //add user to group
      newGroup.Users.push(currentUser);
      newGroup.save();

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

  async delete(id: string, userId: string): Promise<IGroup> {
    const group = await this.groupModel.findById(id);
    const user = await this.userModel.findById(userId);
    if (user._id.toString() == group.Users[0]._id.toString()) {
      if (group) {
        //remove group from users
        for (let i = 0; i < group.Users.length; i++) {
          let gUser = await this.userModel.findById(group.Users[i]._id)
          gUser.CurrentGroup = null;
          gUser.save();
        }
        await group.delete();
        return group.toObject({ versionKey: false });
      } else {
        throw new NotFoundException(`Group with id ${id} not found`);
      }
    } else {
      throw new NotFoundException(`No permission to delete this group`);
    }
  }
}