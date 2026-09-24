import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/common/enums/role.enums";



@Injectable()
export class UserRepository {

    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>
    ){}


    findByEmail(email: string):Promise<UserEntity | null>{
        return this.repository.findOne({
            where: {email}
        })
    }

    findById(id: number):Promise<UserEntity | null>{
        return this.repository.findOne({
            where: {id}
        })
    }

    findByUsername(username: string):Promise<UserEntity | null>{
        return this.repository.findOne({
            where: {username}
        })
    }

    create(data: Partial<UserEntity>): Promise<UserEntity>{
        const user =  this.repository.create(data)
        return this.repository.save(user)
    }


    save(data:Partial<UserEntity>): Promise<UserEntity>{
        return this.repository.save(data)
    }

    getAll():Promise<UserEntity[]>{
        return this.repository.find()
    }

    getUsersByRole(userRole:Role):Promise<UserEntity[]>{
        return this.repository.find({
            where:{
                role: userRole
            }
        })
    }



}


