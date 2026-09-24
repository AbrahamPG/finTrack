import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import * as bcrypt from 'bcrypt';




@Injectable()
export class UsersService{

    constructor(
        private readonly userRepository: UserRepository
    ){}


    async getme(userId: number){

        const user = await this.userRepository.findById(userId)

        if(!user) throw new NotFoundException('User not found')

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    }



    async updateMe(userId: number, dto: UpdateUserDto){

        const user = await this.userRepository.findById(userId)
        if(!user) throw new NotFoundException('USER NOT FOUND')

        if(dto.email){

            const emailNormal = dto.email.toLowerCase().trim()
            const existingEmail = await this.userRepository.findByEmail(emailNormal)

            if(existingEmail && existingEmail.id !== userId){
                throw new ConflictException('Email already in use')
            }
            user.email = emailNormal
        }

        if(dto.username){

            const usernameNormal = dto.username.toLowerCase().trim()
            const existingUsername = await this.userRepository.findByUsername(usernameNormal)

            if(existingUsername && existingUsername.id !== userId ){
                throw new ConflictException('Username already in use')
            }
            user.username = usernameNormal
        }

        const updatedUser = await this.userRepository.save(user)
        
        return {
            id: updatedUser.id,
            username: updatedUser.username,
            email: updatedUser.email,
            role: updatedUser.role,
            status: updatedUser.status,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
        }


    }


    async changePassword(userId: number, dto: ChangePasswordDto){

        const user = await this.userRepository.findById(userId)
        if (!user) throw new NotFoundException('USER NOT FOUND')

        const passwordValid = await bcrypt.compare(
            dto.currentPassword,
            user.password,
        )

        if(!passwordValid) throw new UnauthorizedException('Current password is incorrect')

        const hashedPassword = await bcrypt.hash(dto.newPassword,10)

        user.password = hashedPassword
        await this.userRepository.save(user)

        return {
            "message" : 'Password updated Successfully'
        }
    }






}