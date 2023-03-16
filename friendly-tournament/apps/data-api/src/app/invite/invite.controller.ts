import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Headers } from "@nestjs/common/decorators";
import { IGroup } from "@friendly-tournament/data/models";
import { JwtPayload } from "jsonwebtoken";
import { inviteService } from "./invite.service";

@Controller('Invite')
export class InviteController{
    constructor(private inviteService: inviteService){
    }

    @Post()
    async invite(receivingUserId:string, @Headers() header, message:string) : Promise<IGroup>{
        const userId = this.inviteService.getIdFromHeader(header);
        return this.inviteService.invite(receivingUserId, userId, message);
    }
}