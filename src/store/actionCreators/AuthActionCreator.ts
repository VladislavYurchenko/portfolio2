import { Dispatch } from "react";
import { Problem } from "../../types/ServerResponce";
import { AuthAction, AuthActionsTypes } from "../../types/AuthTypes";
import { User, UserAction, UserActionsTypes } from "../../types/UserTypes";
import AuthRequests, { LoginResponce } from "../../axios/requests/AuthRequests";
import { AxiosResponse } from "axios";
import { API_URL } from "../../axios";
import { ProblemsType } from "../../types/ProblemsTypes";

export const auth = (dispatch: Dispatch<AuthAction | UserAction>, response: AxiosResponse<LoginResponce>): void => {
  const responseData: LoginResponce = response.data;
  if (responseData.status) {
    const userData = responseData.data as User;
    localStorage.setItem("token", userData.accessToken);
    dispatch({ type: AuthActionsTypes.AUTHORIZATION_SUCCESS, isAuth: true });
    dispatch({
      type: UserActionsTypes.SET_USER,
      id: userData.id,
      email: userData.email,
      name: userData.name,
      isActivated: userData.isActivated,
      activationLink: API_URL + "/user/activate/" + userData.activationLink,
    });
  } else {
    const problemData = responseData.data as Problem;
    if (problemData.problem === ProblemsType.BAD_TOKEN) {
      dispatch({ type: AuthActionsTypes.AUTHORIZATION_ERROR, error: ProblemsType._NP });
    } else {
      dispatch({ type: AuthActionsTypes.AUTHORIZATION_ERROR, error: problemData.problem });
    }
  }
};

export const registration = (email: string, password: string, name?: string) => {
  return async (dispatch: Dispatch<AuthAction | UserAction>): Promise<void> => {
    try {
      const response: AxiosResponse<LoginResponce> = await AuthRequests.registration(email, password, name);
      auth(dispatch, response);
    } catch (error: any) {
      dispatch({ type: AuthActionsTypes.AUTHORIZATION_ERROR, error: error.message });
    }
  };
};

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch<AuthAction | UserAction>): Promise<void> => {
    try {
      const response: AxiosResponse<LoginResponce> = await AuthRequests.login(email, password);
      auth(dispatch, response);
    } catch (error: any) {
      dispatch({ type: AuthActionsTypes.AUTHORIZATION_ERROR, error: error.message });
    }
  };
};

export const refresh = () => {
  return async (dispatch: Dispatch<AuthAction | UserAction>): Promise<void> => {
    try {
      dispatch({ type: AuthActionsTypes.AUTHORIZATION });
      const response: AxiosResponse<LoginResponce> = await AuthRequests.refresh();
      if (response.data) {
        auth(dispatch, response);
      } else {
        console.log("123");

        dispatch({ type: AuthActionsTypes.AUTHORIZATION_ERROR, error: ProblemsType.BAD_INTERNET_CONNECTION });
      }
    } catch (error: any) {
      dispatch({ type: AuthActionsTypes.AUTHORIZATION_ERROR, error: error.message });
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch<AuthAction | UserAction>): Promise<void> => {
    try {
      const response: AxiosResponse<LoginResponce> = await AuthRequests.logout();
      const responseData: LoginResponce = response.data;
      if (responseData.status) {
        dispatch({ type: AuthActionsTypes.UNAUTHORIZATION, isAuth: false });
        dispatch({ type: UserActionsTypes.SET_USER, id: 0, email: "", name: null, isActivated: false, activationLink: "" });
      } else {
        const problemData = responseData.data as Problem;
        dispatch({ type: AuthActionsTypes.AUTHORIZATION_ERROR, error: problemData.problem });
      }
    } catch (error: any) {
      dispatch({ type: AuthActionsTypes.AUTHORIZATION_ERROR, error: error.message });
    }
  };
};

export const setError = (error: string) => {
  return async (dispatch: Dispatch<AuthAction>): Promise<void> => {
    try {
      dispatch({ type: AuthActionsTypes.AUTHORIZATION_ERROR, error: error });
    } catch (error: any) {
      dispatch({ type: AuthActionsTypes.AUTHORIZATION_ERROR, error: error.message });
    }
  };
};
