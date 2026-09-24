import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { TransactionEntity } from "./entities/transaction.entity";
import { InjectRepository } from "@nestjs/typeorm";



@Injectable()
export class TransactionsRepository {

    constructor(
        @InjectRepository(TransactionEntity)
        private readonly repository: Repository<TransactionEntity>
    ){}


    findAllByUser(userId: number):Promise<TransactionEntity[]>{
        return this.repository.find({
            where: {
                user:{
                    id: userId
                }
            }
        })
    }


    findByIdAndUser(transactionId: number, userId: number):Promise<TransactionEntity | null>{
        return this.repository.findOne({
            where: {
                id: transactionId,
                user: {
                    id: userId
                }
            }
        })
    }


    createTransaction(data:Partial<TransactionEntity>):Promise<TransactionEntity>{
        const transaction = this.repository.create(data)
        return this.repository.save(transaction)
    }


    saveTransaction(data:Partial<TransactionEntity>):Promise<TransactionEntity>{
        return this.repository.save(data)
    }

    async remove(transaction:TransactionEntity):Promise<void>{
        await this.repository.remove(transaction)
    }





}