import { Injectable, NotFoundException } from '@nestjs/common';
import { IGroup, IInvitation, IUser } from '@friendly-tournament/data/models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Headers } from "@nestjs/common/decorators";
import { JwtPayload } from "jsonwebtoken";
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class inviteService {

  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
    @InjectModel('Group') private groupModel: Model<IGroup>) { }

  getIdFromHeader(@Headers() header): any {
    const base64Payload = header.authorization.split('.')[1];
    const payloadBuffer = Buffer.from(base64Payload, 'base64');
    const updatedJwtPayload: JwtPayload = JSON.parse(payloadBuffer.toString()) as JwtPayload;

    return (updatedJwtPayload.id)
  }

  //invitations --------------------------------------------
  async invite(sendToUserId: string, SendId: string, message: string) {
    if(sendToUserId == SendId) throw new BadRequestException("You can't invite yourself");
    const sendUser = await this.userModel.findById(SendId);
    const currentGroup = await this.groupModel.findById(sendUser.CurrentGroup._id);
    const sendToUser = await this.userModel.findById(sendToUserId);
    let inviteExists = false;
    if(sendToUser){

      for(let groupInvite of sendToUser.GroupInvites){
        if(groupInvite.Group._id == currentGroup._id){
            inviteExists = true;
        }
      }
      
    if(!inviteExists){
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
        } else {
            throw new BadRequestException("Invite already exists");
        }
    } else {
      throw new BadRequestException("User not found");
    }
  }
}