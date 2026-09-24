import { UserRepository } from "src/users/user.repository";
import { RegisterDto } from "./dtos/register.dto";
import { UserEntity } from "src/users/entities/users.entity";
import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthResponseDto } from "./dtos/auth-response.dto";
import { LoginDto } from "./dtos/login.dto";




@Injectable()
export class AuthService{

    constructor(
        private readonly userRepository : UserRepository,
        private readonly jwtService : JwtService,
        private readonly configService: ConfigService,
    ){}



    async register(dto: RegisterDto):Promise<AuthResponseDto>{

        const emailNormal = dto.email.toLowerCase().trim()
        const usernameNormal = dto.username.toLowerCase().trim()


        const user = await this.userRepository.findByEmail(emailNormal)
        const existingUsername = await this.userRepository.findByUsername(usernameNormal)

        if(user) throw new  ConflictException('User exist with this email!!')
        if(existingUsername) throw new ConflictException('User exist with this username')

        const hashedPassword = await bcrypt.hash(dto.password,10)

        const newUser = await this.userRepository.create({
            username: usernameNormal,
            email: emailNormal,
            password: hashedPassword
        })

        return this.generateTokens(newUser)
    }

    async login(dto: LoginDto){
        const emailNormal = dto.email.toLowerCase().trim()

        const user = await this.userRepository.findByEmail(emailNormal)

        if (!user) throw new UnauthorizedException('INVALID CREDENTIALS')
        //COMPARAR CONTRASEÑAS
        const passwordValid = await bcrypt.compare(
            dto.password,
            user.password
        )
        
        if(!passwordValid) throw new UnauthorizedException('INVALID CREDENTIALS')

        return this.generateTokens(user)


    }





    //NUESTRO GENERADOR DE TOKENS CON PAYLOAD DE ID Y ROL DE USUARIO
    private async generateTokens ( user: UserEntity): Promise<AuthResponseDto>{
        const accessToken = await this.jwtService.signAsync({
        sub: user.id,
        role: user.role,
        },
        {
            expiresIn: '15m'
        }
        );

        const refreshSecret = this.configService.get<string>(
        'auth.refreshSecret',
        );

        const refreshToken = await this.jwtService.signAsync(
        {
            sub: user.id,
            role: user.role,
        },
        {
            secret: refreshSecret,
            expiresIn: '7d',
        },
        );

        const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

        user.refreshTokenHash = refreshTokenHash;

        await this.userRepository.save(user);

        return {
        accessToken,
        refreshToken,
        };
    }


}











