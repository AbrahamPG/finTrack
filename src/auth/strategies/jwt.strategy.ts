import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserStatus } from "src/common/enums/status.enums";
import { UserRepository } from "src/users/user.repository";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        configService : ConfigService,
        private readonly userRepository: UserRepository
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.getOrThrow<string>(
                'auth.accessSecret'
            )
        })
    }

    async validate(payload: {
        sub: number,
        role: string
    }){
        const user = await this.userRepository.findById(payload.sub)
        if(!user) throw new UnauthorizedException('User is not active')
        if (user.status !== UserStatus.active){
            throw new UnauthorizedException('User is not active')
        }
        
        return {
            userId: user.id,
            role: user.role,
            // userId: payload.sub,
            // role: payload.role
        }
    }
    






}