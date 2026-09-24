import { Role } from "src/common/enums/role.enums";





export interface AuthenticatedUser {
  userId: number;
  role: Role;
}