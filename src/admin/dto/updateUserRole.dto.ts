import { IsEnum, IsString } from "class-validator";
import { Role } from "src/common/enums/role.enums";





export class UpdateUserRoleDto{

    @IsEnum(Role)
    role!: Role
}