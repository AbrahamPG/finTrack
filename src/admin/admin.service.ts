import { Injectable, NotFoundException} from "@nestjs/common";
import { Role } from "src/common/enums/role.enums";
import { UserStatus } from "src/common/enums/status.enums";
import { UserEntity } from "src/users/entities/users.entity";
import { UserRepository } from "src/users/user.repository";


@Injectable()
export class AdminService{


    constructor(
        private readonly userRepository : UserRepository
    ){}


    async getUsers(){
        const users = await this.userRepository.getAll()

        const responseUsers = users.map(user => this.toResponseUser(user))
        return responseUsers
    }

    async getUserById(userId:number){
        const user = await this.userRepository.findById(userId)
        if(!user) throw new NotFoundException('User not found')

        return this.toResponseUser(user)
    }


    async updateRoleForUser(userId: number, newRole:Role){
        const user = await this.userRepository.findById(userId)
        if(!user) throw new NotFoundException('USER NOT FOUND')

        user.role = newRole

        await this.userRepository.save(user)
        return this.toResponseUser(user)
    }

    async updateStatusForUser(userId: number, newStatus:UserStatus){
        const user = await this.userRepository.findById(userId)
        if(!user) throw new NotFoundException('USER NOT FOUND')

        user.status = newStatus

        await this.userRepository.save(user)
        return this.toResponseUser(user)
    }



    async getUsersByRole(role: Role){
        return this.userRepository.getUsersByRole(role)
    }






    private toResponseUser(user:UserEntity){
        const {id, email, username, role, status, deletionScheduledAt} = user
        return {
            id,
            email,
            username,
            role,
            status,
            deletionScheduledAt
        }
    }



}