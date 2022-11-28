import { AxiosResponse } from "axios";
import { Dispatch } from "react";
import { LoginResponce } from "../../axios/requests/AuthRequests";
import UserRequests, { UserResponce } from "../../axios/requests/UserRequests";
import { AuthAction, AuthActionsTypes } from "../../types/AuthTypes";
import { ProblemsType } from "../../types/ProblemsTypes";
import { Problem } from "../../types/ServerResponce";
import { User, UserAction, UserActionsTypes } from "../../types/UserTypes";

export const changeName = (name: string | null) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionsTypes.CHANGE_NAME });
      const response: AxiosResponse<UserResponce> = await UserRequests.changeName(name);
      const responseData: LoginResponce = response.data;
      if (responseData.status) {
        const userData = responseData.data as User;
        localStorage.setItem("token", userData.accessToken);
        dispatch({ type: UserActionsTypes.CHANGE_NAME_SUCCESS, name: name });
      } else {
        const problemData = responseData.data as Problem;
        dispatch({ type: UserActionsTypes.CHANGE_NAME_ERROR, error: problemData.problem });
      }
    } catch (error: any) {
      dispatch({ type: UserActionsTypes.CHANGE_NAME_ERROR, error: "" });
    }
  };
};

export const changeEmail = (email: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionsTypes.CHANGE_EMAIL });
      const response: AxiosResponse<UserResponce> = await UserRequests.changeEmail(email);
      const responseData: LoginResponce = response.data;
      if (responseData.status) {
        const userData = responseData.data as User;
        localStorage.setItem("token", userData.accessToken);
        dispatch({ type: UserActionsTypes.CHANGE_EMAIL_SUCCESS, email: email });
      } else {
        const problemData = responseData.data as Problem;
        dispatch({ type: UserActionsTypes.CHANGE_EMAIL_ERROR, error: problemData.problem });
      }
    } catch (error: any) {
      dispatch({ type: UserActionsTypes.CHANGE_EMAIL_ERROR, error: "" });
    }
  };
};

export const changePassword = (oldPassword: string, newPassword: string, calback?: () => void) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionsTypes.CHANGE_PASSWORD });
      const response: AxiosResponse<UserResponce> = await UserRequests.changePassword(oldPassword, newPassword);
      const responseData: LoginResponce = response.data;
      if (responseData.status) {
        const userData = responseData.data as User;
        localStorage.setItem("token", userData.accessToken);
        dispatch({ type: UserActionsTypes.CHANGE_PASSWORD_SUCCESS });

        if (calback) calback();
      } else {
        const problemData = responseData.data as Problem;
        dispatch({ type: UserActionsTypes.CHANGE_PASSWORD_ERROR, error: problemData.problem });
      }
    } catch (error: any) {
      dispatch({ type: UserActionsTypes.CHANGE_PASSWORD_ERROR, error: ProblemsType.UNKNOWN_ERROR });
    }
  };
};

export const deleteUser = (password: string, calback?: () => void) => {
  return async (dispatch: Dispatch<AuthAction | UserAction>) => {
    try {
      dispatch({ type: UserActionsTypes.DELETE });
      if (!password) {
        dispatch({ type: UserActionsTypes.DELETE_ERROR, error: ProblemsType.INCORRECT_PASSWORD });
      }
      const response: AxiosResponse<UserResponce> = await UserRequests.deleteAccount(password);
      const responseData: LoginResponce = response.data;
      if (responseData.status) {
        dispatch({ type: UserActionsTypes.DELETE_SUCCESS });
        dispatch({ type: AuthActionsTypes.UNAUTHORIZATION, isAuth: false });
        dispatch({ type: UserActionsTypes.SET_USER, id: 0, email: "", name: null, isActivated: false, activationLink: "" });
        if (calback) calback();
      } else {
        const problemData = responseData.data as Problem;
        dispatch({ type: UserActionsTypes.DELETE_ERROR, error: problemData.problem });
      }
    } catch (error: any) {
      dispatch({ type: UserActionsTypes.DELETE_ERROR, error: ProblemsType.UNKNOWN_ERROR });
    }
  };
};

export const removeError = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    dispatch({ type: UserActionsTypes.REMOVE_ERROR });
  };
};
