import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator"





export class UpdateUserDto{
    
    @IsOptional()
    @MinLength(3)
    @MaxLength(20)
    @IsString()
    username?: string
    
    @IsOptional()
    @IsString()
    @IsEmail()
    email?: string
}