import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Headers } from "@nestjs/common/decorators";
import { IGroup, IInvitation } from "@friendly-tournament/data/models";
import { JwtPayload } from "jsonwebtoken";
import { inviteService } from "./invite.service";

@Controller('Invite')
export class InviteController{
    constructor(private inviteService: inviteService){
    }

    @Post()
    async invite(@Body() invite:Partial<IInvitation>, @Headers() header) : Promise<IInvitation>{
        const userId = this.inviteService.getIdFromHeader(header);
        return this.inviteService.invite(invite.User._id, userId, invite.Message);
    }
}