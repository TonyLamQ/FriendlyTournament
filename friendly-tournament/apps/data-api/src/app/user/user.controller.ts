import { IInvitation, IUser } from "@friendly-tournament/data/models";
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Headers } from "@nestjs/common/decorators";
import { User } from "./user.schema";
import { UserService } from "./user.service";


@Controller('User')
export class UserController {
    constructor(private userService: UserService) {
    }


    @Get('findAll')
    async findAll() {
        return this.userService.findAll();
    }

    @Get('profile')
    async getProfile(@Headers() header) {
        const user = this.userService.findById(this.userService.getIdFromHeader(header));
        return user;
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.userService.findById(id);
    }

    @Post('Friend/Add')
    async befriend(@Headers() header, @Body() id:string) {
        const userId = this.userService.getIdFromHeader(header);
        return this.userService.befriend(userId, id);
    }

    @Get('Friends')
    async getFriends(@Headers() header) {
        const userId = this.userService.getIdFromHeader(header);
        return this.userService.getFriends(userId);
    }

    @Post('leave')
    async leave(@Headers() header) : Promise<IUser>{
        const userId = this.userService.getIdFromHeader(header);
        return this.userService.leave(userId);
    }

    @Delete('Friend/Remove')
    async unfriend(@Headers() header, @Body() id:string) {
        const userId = this.userService.getIdFromHeader(header);
        return this.userService.unfriend(userId, id);
    }

}