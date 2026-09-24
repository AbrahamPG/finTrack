import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { TransactionsRepository } from "./transactions.repository";
import { CreateTransactionDto } from "./dtos/create-transaction.dto";
import { UserRepository } from "src/users/user.repository";
import { CategoriesRepository } from "src/categories/categories.repository";
import { UpdateTransactionDto } from "./dtos/update-transaction.dto";



@Injectable()
export class TransactionsService{

    constructor(
        private readonly transactionsRepository: TransactionsRepository,
        private readonly userRepository: UserRepository,
        private readonly categoryRepository: CategoriesRepository
    ){}

    

    async create(dto: CreateTransactionDto, userId: number){
        const user = await this.userRepository.findById(userId)
        if( !user) throw new BadRequestException('Logueese porfavor, usuario no encontrado')
        const category = await this.categoryRepository.findByIdAndUser(dto.categoryId, userId)
        if(!category) throw new NotFoundException('Category does not exist for this user')

        const transaction = await this.transactionsRepository.createTransaction(
            {
                amount: dto.amount,
                type: dto.type,
                description: dto.description,
                date: new Date (dto.date),
                user,
                category
            }
        )
        
        //CREAMOS UNA COPIA SOLO PARA MOSTRAR LO QUE DEVOLVEMOS
        return {
            id: transaction.id,
            amount: transaction.amount,
            type: transaction.type,
            description: transaction.description,
            date: transaction.date,
            user: {
                id: transaction.user.id,
            },
            category: transaction.category,
        };


    }

    async getAllByUser(userId: number){
        return await this.transactionsRepository.findAllByUser(userId)
    }


    async findByIdAndUser(transactionId: number, userId: number){
        const transaction = await this.transactionsRepository.findByIdAndUser(transactionId, userId)
        if(!transaction) throw new NotFoundException('Transaction does not exist for this User')

        return transaction
    }


    async update(transactionId: number, dto:UpdateTransactionDto, userId: number){

        const existTransaction = await this.transactionsRepository.findByIdAndUser(transactionId,userId)
        if(!existTransaction) throw new NotFoundException('Transaction does not exist for this User') 
            
        if(dto.amount) existTransaction.amount = dto.amount
        if(dto.type !== undefined){
            existTransaction.type = dto.type
        }
        if(dto.date){
            existTransaction.date = new Date(dto.date)
        }
        if(dto.description) existTransaction.description= dto.description
        if(dto.categoryId !== undefined) {
            const existCategory = await this.categoryRepository.findByIdAndUser(dto.categoryId,userId)
            if(!existCategory) throw new NotFoundException('Category does not exist for this User')
            existTransaction.category = existCategory
        }

        return this.transactionsRepository.saveTransaction(existTransaction)
    }


    async delete(transactionId: number, userId:number){
        const transaction = await this.transactionsRepository.findByIdAndUser(transactionId, userId)
        if(!transaction) throw new NotFoundException('Transaction does not exit for this user')

        await this.transactionsRepository.remove(transaction)

        return {
            message: 'Transaction removed successfully'
        }
    }




}