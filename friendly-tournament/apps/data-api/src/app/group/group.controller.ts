import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Headers } from "@nestjs/common/decorators";
import { GroupService } from "./group.service";
import { IGroup } from "@friendly-tournament/data/models";
import { JwtPayload } from "jsonwebtoken";

@Controller('Group')
export class GroupController{
    constructor(private groupService: GroupService){
    }

    // @Get()
    // async getIdFromHeader(@Headers() header){
    //     console.log(header.authorization)
    //     const base64Payload = header.authorization.split('.')[1];
    //     const payloadBuffer = Buffer.from(base64Payload, 'base64');
    //     const updatedJwtPayload: JwtPayload = JSON.parse(payloadBuffer.toString()) as JwtPayload;

    //     console.log(updatedJwtPayload.id)
    // }
    @Get('findAll')
    async findAll() : Promise<IGroup[]>{
        return this.groupService.findAll();
    }

    @Get('find/:id')
    async find(@Param('id') id: string) : Promise<IGroup>{
        return this.groupService.findById(id);
    }

    @Post('create')
    async create(@Body() group: Partial<IGroup>, @Headers() header) : Promise<IGroup>{
        const userId = this.groupService.getIdFromHeader(header);
        return this.groupService.create(group, userId);
    }

    @Put('edit/:id')
    async update(@Param('id') id: string, @Body() changes: Partial<IGroup>) : Promise<IGroup>{
        return this.groupService.update(id, changes);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: string) : Promise<IGroup>{
        return this.groupService.delete(id);
    }
}