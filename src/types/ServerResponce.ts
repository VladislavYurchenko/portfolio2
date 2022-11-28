import { ProblemsType } from "./ProblemsTypes";

export class Problem {
  problem!: ProblemsType;
}

export class ServerResponce {
  status: boolean;
  message: string | null;
  data: any | null | Problem;
  constructor(status: boolean, message: string | null, data: any | null | Problem) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
