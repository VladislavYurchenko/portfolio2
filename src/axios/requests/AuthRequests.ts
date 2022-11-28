import { AxiosResponse } from "axios";
import PROTECTED_API from "..";
import { Problem, ServerResponce } from "../../types/ServerResponce";
import { User } from "../../types/UserTypes";

export class LoginResponce extends ServerResponce {
  data!: User | Problem;
}

export default class AuthRequests {
  static async registration(email: string, password: string, name?: string): Promise<AxiosResponse<LoginResponce>> {
    return PROTECTED_API.post("/registration", { email, password, name });
  }
  static async login(email: string, password: string): Promise<AxiosResponse<LoginResponce>> {
    return PROTECTED_API.post("/login", { email, password });
  }
  static async refresh(): Promise<AxiosResponse<LoginResponce>> {
    return PROTECTED_API.get("/refresh");
  }
  static async logout(): Promise<AxiosResponse<LoginResponce>> {
    return PROTECTED_API.post("/logout");
  }
}
