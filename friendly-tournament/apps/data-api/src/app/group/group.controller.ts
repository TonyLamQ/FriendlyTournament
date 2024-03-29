import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Headers, UseGuards } from "@nestjs/common/decorators";
import { GroupService } from "./group.service";
import { IGroup } from "@friendly-tournament/data/models";
import { JwtPayload } from "jsonwebtoken";
import { AuthGuard } from "../auth/auth.guard";

@Controller('Group')
export class GroupController{
    constructor(private groupService: GroupService){
    }

    @Get('findAll')
    async findAll() : Promise<IGroup[]>{
        return this.groupService.findAll();
    }

    @Get('find/:id')
    async find(@Param('id') id: string) : Promise<IGroup>{
        return this.groupService.findById(id);
    }

    @UseGuards(AuthGuard)
    @Post('create')
    async create(@Body() group: Partial<IGroup>, @Headers() header) : Promise<IGroup>{
        const userId = this.groupService.getIdFromHeader(header);
        return this.groupService.create(group, userId);
    }

    @Post('leave')
    async leave(@Headers() header) : Promise<IGroup>{
        const userId = this.groupService.getIdFromHeader(header);
        return this.groupService.leave(userId);
    }

    @Put('edit/:id')
    async update(@Param('id') id: string, @Body() changes: Partial<IGroup>, @Headers() header) : Promise<IGroup>{
        const userId = this.groupService.getIdFromHeader(header);
        return this.groupService.update(id, userId, changes);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: string, @Headers() header) : Promise<IGroup>{
        const userId = this.groupService.getIdFromHeader(header);
        return this.groupService.delete(id, userId);
    }
}