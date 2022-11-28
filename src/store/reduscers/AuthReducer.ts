import { AuthState, AuthActionsTypes, AuthAction } from "../../types/AuthTypes";

const initialState: AuthState = {
  isAuth: false,
  loading: false,
  error: null,
};

export const AuthReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionsTypes.AUTHORIZATION:
      return { loading: true, error: null, isAuth: false };
    case AuthActionsTypes.AUTHORIZATION_SUCCESS:
      return { loading: false, error: null, isAuth: true };
    case AuthActionsTypes.AUTHORIZATION_ERROR:
      return { loading: false, error: action.error, isAuth: false };
    case AuthActionsTypes.UNAUTHORIZATION:
      return { loading: false, error: null, isAuth: false };
    default:
      return state;
  }
};
