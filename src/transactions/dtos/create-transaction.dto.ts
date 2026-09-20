import { IsDate, IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, MinLength } from "class-validator"
import { TransactionType } from "src/common/enums/transaction.enums"



export class CreateTransactionDto {

    @IsPositive()
    @IsNumber()
    amount!:number

    @IsEnum(TransactionType)
    type!: TransactionType

    @IsString()
    @MinLength(3)
    @MaxLength(255)
    description!: string

    @IsInt()
    @IsPositive()
    categoryId!: number

    @IsDateString()
    date!:string

}