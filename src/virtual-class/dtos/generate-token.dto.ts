import { UserRole } from "../../user/schema/user";

export interface GenerateTokenDTO {
  className: string;
  role: UserRole;
  classId: string;
}
