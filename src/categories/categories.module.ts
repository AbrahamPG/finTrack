import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CategoriesRepository } from './categories.repository';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports:[
        TypeOrmModule.forFeature([
            CategoryEntity
        ]),
        UsersModule
    ],
    controllers: [
        CategoriesController
    ],
    providers:[
        CategoriesRepository,
        CategoriesService
    ],
    exports:[
        CategoriesRepository
    ]
})
export class CategoriesModule {}
