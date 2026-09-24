import { Body, Controller, Get, Param, ParseEnumPipe, ParseIntPipe, Patch, Query, UseGuards } from "@nestjs/common"
import { AdminService } from "./admin.service";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Role } from "src/common/enums/role.enums";
import { UpdateUserRoleDto } from "./dto/updateUserRole.dto";
import { UpdateStatusUserDto } from "./dto/updateStatusUser.dto";


@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController{


    constructor(
        private readonly adminService: AdminService
    ){}


    @Get('users')
    @Roles(Role.admin)
    getUsers(
        @Query('role', new ParseEnumPipe(Role, {optional:true})) role?:Role
    ){
        if(role === undefined)
            return this.adminService.getUsers()
        
        return this.adminService.getUsersByRole(role)
    }


    @Get('users/:id')
    getUserById(
        @Param('id', ParseIntPipe) id:number
    ){
        return this.adminService.getUserById(id)
    }

    @Patch('users/:id/role')
    updateRoleForUser(
        @Param('id', ParseIntPipe) id:number,
        @Body() dto:UpdateUserRoleDto
    ){
        return this.adminService.updateRoleForUser(id, dto.role)
    }


    @Patch('users/:id/status')
    updateStatusForUser(
        @Param('id', ParseIntPipe) id:number,
        @Body() dto:UpdateStatusUserDto
    ){
        return this.adminService.updateStatusForUser(id, dto.status)
    }




}