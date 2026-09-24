import { Body, Controller, Get, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import type { Request } from "express";
import { AuthenticatedUser } from "src/auth/interfaces/authenticated-user.interface";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";



@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService : UsersService
    ){}



    @Get('me')
    @UseGuards(JwtAuthGuard)
    getme(
        @Req() request: Request & {user: AuthenticatedUser}
    ){
        return this.usersService.getme(request.user.userId)
    }

    @Patch('me')
    @UseGuards(JwtAuthGuard)
    updatedMe(
        @Body() dto: UpdateUserDto,
        @Req() request: Request & {user:AuthenticatedUser}
    ){
        return this.usersService.updateMe(
            request.user.userId,
            dto
        )
    }


    @Patch('me/password')
    @UseGuards(JwtAuthGuard)
    updatedPassword(
        @Req() request: Request & {user:AuthenticatedUser},
        @Body() dto: ChangePasswordDto
    ){
        return this.usersService.changePassword(
            request.user.userId,
            dto
        )
    }




}