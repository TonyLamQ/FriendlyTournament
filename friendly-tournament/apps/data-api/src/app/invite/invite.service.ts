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
    @InjectModel('Group') private groupModel: Model<IGroup>,
    @InjectModel('Invite') private inviteModel: Model<IInvitation>) { }

  getIdFromHeader(@Headers() header): any {
    const base64Payload = header.authorization.split('.')[1];
    const payloadBuffer = Buffer.from(base64Payload, 'base64');
    const updatedJwtPayload: JwtPayload = JSON.parse(payloadBuffer.toString()) as JwtPayload;

    return (updatedJwtPayload.id)
  }

  //invitations --------------------------------------------
  async invite(sendToUserId: string, SendId: string, message: string): Promise<IInvitation> {

    if(sendToUserId == SendId) throw new BadRequestException("You can't invite yourself");
    const sendUser = await this.userModel.findById(SendId);

    if(sendUser.CurrentGroup == null) throw new BadRequestException("You are not in a group");
    const currentGroup = await this.groupModel.findById(sendUser.CurrentGroup._id);

    const sendToUser = await this.userModel.findById(sendToUserId);
    if(sendToUser.CurrentGroup != null) throw new BadRequestException("User is already in a group");
    let inviteExists = false;

    if(sendToUser){
      if(sendToUser.GroupInvites.length == 0 || sendToUser.GroupInvites == null || sendToUser.GroupInvites == undefined){
        inviteExists = false
      } else {
        for(let groupInvite of sendToUser.GroupInvites){
          for(let invite of currentGroup.Invites){
            if(groupInvite._id.toString() === invite._id.toString()){
              inviteExists = true;
            }
          }
        }
      }
    if(inviteExists == false){ 
        const newInvite = await this.inviteModel.create({
          User: sendToUser,
          Group: currentGroup,
          Message: message,
          sendDate: new Date()  
        });
        newInvite.save();

        currentGroup.Invites.push(newInvite);
        currentGroup.save();

        sendToUser.GroupInvites.push(newInvite);
        sendToUser.save();
          
        return newInvite.toObject({ versionKey: false });
        } else {
            throw new BadRequestException("Invite already exists");
        }
    } else {
      throw new BadRequestException("User not found");
    }
  }
}