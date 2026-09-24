import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AuthenticatedUser } from "src/auth/interfaces/authenticated-user.interface";
import { CreateTransactionDto } from "./dtos/create-transaction.dto";
import { UpdateTransactionDto } from "./dtos/update-transaction.dto";



@Controller('transactions')
export class TransactionsController {


    constructor(
        private readonly transactionsService: TransactionsService
    ){}




    @Post()
    @UseGuards(JwtAuthGuard)
    create(
        @Req() request: Request & {user: AuthenticatedUser},
        @Body() dto: CreateTransactionDto
    ){
        return this.transactionsService.create(
            dto,
            request.user.userId
        )
    }


    @Get()
    @UseGuards(JwtAuthGuard)
    getAll(
        @Req() request: Request & {user: AuthenticatedUser}
    ){
        return this.transactionsService.getAllByUser(
            request.user.userId
        )
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findByIdAndUser(
        @Param('id', ParseIntPipe)  id: number,
        @Req() request: Request & {user: AuthenticatedUser}
    ){
        return this.transactionsService.findByIdAndUser(
            id,
            request.user.userId
        )
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(
        @Param('id', ParseIntPipe) id:number,
        @Body() dto: UpdateTransactionDto,
        @Req() request: Request & {user: AuthenticatedUser}
    ){
        return this.transactionsService.update(
            id,
            dto,
            request.user.userId
        )
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    delete(
        @Param('id', ParseIntPipe) id:number,
        @Req() request:Request & {user: AuthenticatedUser}
    ){
        return this.transactionsService.delete(
            id,
            request.user.userId
        )
    }




}