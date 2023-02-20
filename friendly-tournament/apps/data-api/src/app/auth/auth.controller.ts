import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { Auth } from "./auth.schema";
import { AuthService } from "./auth.service";


@Controller('Auth')
export class AuthController{
    constructor(private authService: AuthService){
    }

    @Post('register')
    async register(@Body() credentials: Partial<Auth>){
        try {
            await this.authService.register(credentials.UserName, credentials.hash, credentials.Email);
    
            return {
                id: await this.authService.create(credentials),
            };
        } catch (e) {
            throw new HttpException('Username invalid', HttpStatus.BAD_REQUEST);
        }
    }

    @Post('login')
    async login(@Body() credentials: Partial<Auth>){
        try {
            return {
                token: await this.authService.generateToken(credentials.UserName, credentials.hash)
            };
        } catch (e) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }
}