import { ProblemsType } from "./ProblemsTypes";

export enum UserActionsTypes {
  SET_USER = "SET_USER",

  CHANGE_NAME = "CHANGE_NAME",
  CHANGE_NAME_SUCCESS = "CHANGE_NAME_SUCCESS",
  CHANGE_NAME_ERROR = "CHANGE_NAME_ERROR",

  CHANGE_EMAIL = "CHANGE_EMAIL",
  CHANGE_EMAIL_SUCCESS = "CHANGE_EMAIL_SUCCESS",
  CHANGE_EMAIL_ERROR = "CHANGE_EMAIL_ERROR",

  CHANGE_PASSWORD = "CHANGE_PASSWORD",
  CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS",
  CHANGE_PASSWORD_ERROR = "CHANGE_PASSWORD_ERROR",

  DELETE = "DELETE",
  DELETE_SUCCESS = "DELETE_SUCCESS",
  DELETE_ERROR = "DELETE_ERROR",

  REMOVE_ERROR = "REMOVE_ERROR",
}

export class User {
  id: number;
  name: string | null;
  email: string;
  isActivated: boolean;
  accessToken: string;
  refreshToken: string;
  activationLink: string;
  constructor(id: number, email: string, name: string | null, isActivated: boolean, accessToken: string, refreshToken: string, activationLink: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.isActivated = isActivated;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.activationLink = activationLink;
  }
}

interface Error {
  error: any;
}
interface Success {}
export interface UserState {
  id: number;
  name: string | null;
  email: string;
  isActivated: boolean;
  activationLink: string;
  error: ProblemsType;
}

interface SetUsersAction {
  type: UserActionsTypes.SET_USER;
  id: number;
  name: string | null;
  email: string;
  isActivated: boolean;
  activationLink: string;
}
interface ChangeNameAction {
  type: UserActionsTypes.CHANGE_NAME;
}
interface ChangeEmailAction {
  type: UserActionsTypes.CHANGE_EMAIL;
}
interface ChangePasswordAction {
  type: UserActionsTypes.CHANGE_PASSWORD;
}
interface DeleteAction {
  type: UserActionsTypes.DELETE;
}
interface ChangeNameErrorAction extends Error {
  type: UserActionsTypes.CHANGE_NAME_ERROR;
}
interface ChangeEmailErrorAction extends Error {
  type: UserActionsTypes.CHANGE_EMAIL_ERROR;
}
interface ChangePasswordErrorAction extends Error {
  type: UserActionsTypes.CHANGE_PASSWORD_ERROR;
  error: ProblemsType;
}
interface ChangeDeleteErrorAction extends Error {
  type: UserActionsTypes.DELETE_ERROR;
  error: ProblemsType;
}
interface ChangeNameSuccessAction extends Success {
  type: UserActionsTypes.CHANGE_NAME_SUCCESS;
  name: string | null;
}
interface ChangeEmailSuccessAction extends Success {
  type: UserActionsTypes.CHANGE_EMAIL_SUCCESS;
  email: string;
}
interface ChangePasswordSuccessAction extends Success {
  type: UserActionsTypes.CHANGE_PASSWORD_SUCCESS;
}
interface ChangeDeleteSuccessAction extends Success {
  type: UserActionsTypes.DELETE_SUCCESS;
}

interface RemoveErrorAction {
  type: UserActionsTypes.REMOVE_ERROR;
}
export type UserAction =
  | SetUsersAction
  | ChangeEmailAction
  | ChangeEmailErrorAction
  | ChangeEmailSuccessAction
  | ChangeNameAction
  | ChangeNameErrorAction
  | ChangeNameSuccessAction
  | ChangePasswordAction
  | ChangePasswordErrorAction
  | ChangePasswordSuccessAction
  | DeleteAction
  | ChangeDeleteErrorAction
  | ChangeDeleteSuccessAction
  | RemoveErrorAction;
