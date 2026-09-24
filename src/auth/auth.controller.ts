import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dtos/register.dto";
import { LoginDto } from "./dtos/login.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { RolesGuard } from "./guards/roles.guard";
import { Roles } from "./decorators/roles.decorator";
import { Role } from "src/common/enums/role.enums";





@Controller('auth')
export class AuthController{

    constructor(
        private readonly authService : AuthService
    ){}


    @Post('register')
    register(
        @Body() dto: RegisterDto
    ){
        return this.authService.register(dto)
    }


    @Post('login')
    login(
        @Body() dto: LoginDto
    ){
        return this.authService.login(dto)
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    me(
        @Request() request:any
    ){
        return request.user
    }

    @Get('admin-test')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.admin)
    adminTest() {
    return {
        message: 'Welcome Admin 👑',
    };
    }




}