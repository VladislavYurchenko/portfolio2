import { AxiosResponse } from "axios";
import PROTECTED_API from "..";
import { Problem, ServerResponce } from "../../types/ServerResponce";
import { User } from "../../types/UserTypes";

export class UserResponce extends ServerResponce {
  data!: User | Problem;
}

export default class UserRequests {
  static async changeName(name: string | null): Promise<AxiosResponse<UserResponce>> {
    return PROTECTED_API.put("/user/newname", { name: name });
  }
  static async changeEmail(email: string): Promise<AxiosResponse<UserResponce>> {
    return PROTECTED_API.put("/user/newemail", { email });
  }
  static async changePassword(oldPassword: string, newPassword: string): Promise<AxiosResponse<UserResponce>> {
    return PROTECTED_API.put("/user/newpassword", { oldPassword, newPassword });
  }
  static async deleteAccount(password: string): Promise<AxiosResponse<UserResponce>> {
    return PROTECTED_API.post("/user/delete", { password });
  }
}
