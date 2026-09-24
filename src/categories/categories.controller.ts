import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dtos/create-category.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AuthenticatedUser } from "src/auth/interfaces/authenticated-user.interface";
import type { Request } from "express";
import { UpdateCategoryDto } from "./dtos/update-category.dto";




@Controller('categories')
export class CategoriesController {


    constructor(
        private readonly categoriesService: CategoriesService
    ){}


    @Post()
    @UseGuards(JwtAuthGuard)
    create(
        @Req() request: Request & {user: AuthenticatedUser} ,
        @Body() dto: CreateCategoryDto
    ){
        return this.categoriesService.create(
            request.user.userId,
            dto,
        )
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    getAll(
        @Req() request: Request & {user: AuthenticatedUser} 
    ){
        return this.categoriesService.getAllCategoriesByUser(request.user.userId)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getOwnCategories(
        @Param('id', ParseIntPipe) id: number,
        @Req() request: Request & {user: AuthenticatedUser}
    ){
        return this.categoriesService.findByIdAndUser(id, request.user.userId)
    }


    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(
        @Param('id', ParseIntPipe) id: number, 
        @Req() request: Request & {user: AuthenticatedUser},
        @Body() dto: UpdateCategoryDto
    ){
        return this.categoriesService.update(id, request.user.userId, dto)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    delete(
        @Param('id', ParseIntPipe) id: number, 
        @Req() request: Request & {user: AuthenticatedUser},
    ){
        return this.categoriesService.remove(id, request.user.userId)
    }



}