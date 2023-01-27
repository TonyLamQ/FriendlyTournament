import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { GroupService } from "./group.service";
import { IGroup } from "@friendly-tournament/data/models";

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

    @Post('create')
    async create(@Body() group: Partial<IGroup>) : Promise<IGroup>{
        return this.groupService.create(group);
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