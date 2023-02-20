import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { User } from "./user.schema";
import { UserService } from "./user.service";


@Controller('User')
export class UserController{
    constructor(private userService: UserService){
    }

    @Get('findAll')
    async findAll(){
        return this.userService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id:string){
        return this.userService.findById(id);
    }
}