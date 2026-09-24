import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionsController } from './transactions.controller';
import { TransactionsRepository } from './transactions.repository';
import { TransactionsService } from './transactions.service';
import { UsersModule } from 'src/users/users.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
    imports:[
        UsersModule,
        CategoriesModule,
        TypeOrmModule.forFeature([
            TransactionEntity
        ])
    ],
    controllers:[
        TransactionsController
    ],
    providers:[
        TransactionsRepository,
        TransactionsService
    ]
})
export class TransactionsModule {}
