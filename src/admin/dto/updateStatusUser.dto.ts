import { IsEnum } from "class-validator";
import { UserStatus } from "src/common/enums/status.enums";




export class UpdateStatusUserDto{

    @IsEnum(UserStatus)
    status!: UserStatus
}