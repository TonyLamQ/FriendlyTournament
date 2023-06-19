import { Injectable, NotFoundException } from '@nestjs/common';
import { IGroup, IInvitation, ITournament, IUser } from '@friendly-tournament/data/models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Headers } from "@nestjs/common/decorators";
import { JwtPayload } from "jsonwebtoken";
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class GroupService {

  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
    @InjectModel('Group') private groupModel: Model<IGroup>,
    @InjectModel('Invite') private inviteModel: Model<IInvitation>,
    @InjectModel('Tournament') private tournamentModel: Model<ITournament>) { }

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

  async leave(userId: string): Promise<IGroup> {
    const user = await this.userModel.findById(userId);
    if (user) {
      const group = await this.groupModel.findById(user.CurrentGroup);
      if (!group) throw new NotFoundException(`Group with id ${user.CurrentGroup} not found`);

      if (group.Users.length == 1) {
        const tournaments: ITournament[] = await this.tournamentModel.find();
        let canLeave = true;
        for (let i = 0; i < tournaments.length; i++) {
          for (let j = 0; j < tournaments[i].Groups.length; j++) {
            if (tournaments[i].Groups[j]._id.toString() == group._id.toString()) {
              canLeave = false;
            }
          }
        }
        if (!canLeave) {
          throw new BadRequestException(`Cannot leave group with id ${group._id} because it is in a tournament`);
        }
      }
      
      for (let i = 0; i < group.Users.length; i++) {
        if (group.Users[i]._id.toString() == user._id.toString()) {
          group.Users.splice(i, 1);
        }
      }

      if (group.Users.length == 0) {
        await group.delete();
      } else {
        group.save();
      }
      user.CurrentGroup = null;
      user.save();
      return group.toObject({ versionKey: false });
    }
  }

  async create(group: Partial<IGroup>, userId: string): Promise<IGroup> {
    group.CreatedDate = new Date();
    const currentUser = await this.userModel.findById(userId);
    if(currentUser == null || currentUser == undefined){
      throw new BadRequestException(`User not found`);
    }
    if (currentUser.CurrentGroup != null && currentUser.CurrentGroup[0] != undefined && currentUser.CurrentGroup != undefined) {
      throw new BadRequestException(`User with id ${userId} is already in a group`);
    }

    const newGroup = new this.groupModel(group);
    //remove user from old group
    if (currentUser != null) {
      if (currentUser.CurrentGroup != null && currentUser.CurrentGroup[0] != undefined && currentUser.CurrentGroup != undefined) {
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
      try {
        newGroup.save();
      } catch (e) {
        throw new BadRequestException(`Group with name ${group.Name} already exists`);
      }


      return newGroup.toObject({ versionKey: false });
    } else {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
  }

  async update(id: string, userId: string, changes: Partial<IGroup>): Promise<IGroup> {
    const group = await this.groupModel.findById(id);

    if (userId == null || userId == undefined) {
      throw new BadRequestException(`User not logged in`);
    }

    if (group.Users[0]._id.toString() != userId) {
      throw new BadRequestException(`User with id ${userId} is not the owner of this group`);
    }

    if (group.Name != changes.Name) {
      throw new BadRequestException(`Group names cannot be changed.`);
    }
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
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const tournaments: ITournament[] = await this.tournamentModel.find();
    let canDelete = true;
    for (let i = 0; i < tournaments.length; i++) {
      for (let j = 0; j < tournaments[i].Groups.length; j++) {
        if (tournaments[i].Groups[j]._id.toString() == group._id.toString()) {
          canDelete = false;
        }
      }
    }
    if (!canDelete) {
      throw new BadRequestException(`Cannot delete group with id ${group._id} because it is in a tournament`);
    }

    if (user._id.toString() == group.Users[0]._id.toString()) {
      if (group) {
        //remove group from users
        for (let i = 0; i < group.Users.length; i++) {
          let gUser = await this.userModel.findById(group.Users[i]._id)
          gUser.CurrentGroup = null;
          gUser.save();
        }

        for (let i = 0; i < group.Invites.length; i++) {
          let invite = await this.inviteModel.findById(group.Invites[i]._id);
          invite.delete();
        }

        await group.delete();
        return group.toObject({ versionKey: false });
      } else {
        throw new NotFoundException(`Group with id ${id} not found`);
      }
    } else {
      throw new BadRequestException(`User with id ${userId} is not the owner of this group`);
    }
  }
}