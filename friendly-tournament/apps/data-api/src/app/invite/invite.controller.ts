import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Headers } from "@nestjs/common/decorators";
import { IGroup, IInvitation, IInviteResponse } from "@friendly-tournament/data/models";
import { JwtPayload } from "jsonwebtoken";
import { inviteService } from "./invite.service";

@Controller('Invite')
export class InviteController{
    constructor(private inviteService: inviteService){
    }

    @Get('Invites')
    async getInvites(@Headers() header) : Promise<IInvitation[]>{
        const userId = this.inviteService.getIdFromHeader(header);
        return this.inviteService.getInvites(userId);
    }

    @Post()
    async invite(@Body() invite:Partial<IInvitation>, @Headers() header) : Promise<IInvitation>{
        const userId = this.inviteService.getIdFromHeader(header);
        return this.inviteService.invite(invite.User._id, userId, invite.Message);
    }

    @Post('inviteResponse')
    async inviteResponse(@Headers() header, @Body() value:Partial<IInviteResponse>){
        return this.inviteService.inviteResponse(this.inviteService.getIdFromHeader(header), value.response, value._id);
    }
}