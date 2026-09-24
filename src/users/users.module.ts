import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/users.entity';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        UsersModule
    ],
    providers: [
        UserRepository,
        UsersService,
    ],
    exports: [
        UserRepository
    ],
    controllers:[
        UsersController
    ]
})
export class UsersModule {}
