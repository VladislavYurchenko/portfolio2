export enum AuthActionsTypes {
  AUTHORIZATION = "AUTHORIZATION",
  UNAUTHORIZATION = "UNAUTHORIZATION",
  AUTHORIZATION_SUCCESS = "AUTHORIZATION_SUCCESS",
  AUTHORIZATION_ERROR = "AUTHORIZATION_ERROR",
  REGISTERATION = "REGISTERATION",
  REGISTERATION_SUCCESS = "REGISTERATION_SUCCESS",
  REGISTERATION_ERROR = "REGISTERATION_ERROR",
}

export interface AuthState {
  isAuth: boolean;
  loading: boolean;
  error: null | string;
}

interface AuthActionStart {
  type: AuthActionsTypes.AUTHORIZATION;
}
interface AuthSuccessAction {
  type: AuthActionsTypes.AUTHORIZATION_SUCCESS;
  isAuth: boolean;
}
interface AuthErrorAction {
  type: AuthActionsTypes.AUTHORIZATION_ERROR;
  error: any;
}
interface UnAuthAction {
  type: AuthActionsTypes.UNAUTHORIZATION;
  isAuth: boolean;
}

export type AuthAction = AuthActionStart | AuthSuccessAction | AuthErrorAction | UnAuthAction;
