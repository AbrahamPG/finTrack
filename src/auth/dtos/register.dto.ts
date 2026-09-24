import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"




export class RegisterDto {

    @MinLength(3)
    @MaxLength(20)
    @IsString()
    username! : string

    @IsEmail()
    email!: string 

    @IsString()
    @MinLength(8)
    @MaxLength(72)
    password!: string

}