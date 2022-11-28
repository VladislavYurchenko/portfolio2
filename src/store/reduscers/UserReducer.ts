import { ProblemsType } from "../../types/ProblemsTypes";
import { UserAction, UserState, UserActionsTypes } from "../../types/UserTypes";

const initialState: UserState = {
  id: 0,
  email: "",
  isActivated: false,
  name: null,
  activationLink: "",
  error: ProblemsType._NP,
};
// export {};
export const UserReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionsTypes.SET_USER:
      return { id: action.id, email: action.email, isActivated: action.isActivated, name: action.name, activationLink: action.activationLink, error: ProblemsType._NP };
    case UserActionsTypes.CHANGE_NAME_ERROR:
      return { ...state, error: action.error };
    case UserActionsTypes.CHANGE_NAME_SUCCESS:
      return { ...state, name: action.name };
    case UserActionsTypes.CHANGE_EMAIL_ERROR:
      console.error(action.error);
      return { ...state, error: action.error };
    case UserActionsTypes.CHANGE_EMAIL_SUCCESS:
      return { ...state, email: action.email };
    case UserActionsTypes.CHANGE_PASSWORD:
      return { ...state };
    case UserActionsTypes.CHANGE_PASSWORD_ERROR:
      return { ...state, error: action.error };
    case UserActionsTypes.CHANGE_PASSWORD_SUCCESS:
      return { ...state, error: ProblemsType._NP };
    case UserActionsTypes.DELETE:
      return { ...state };
    case UserActionsTypes.DELETE_ERROR:
      return { ...state, error: action.error };
    case UserActionsTypes.DELETE_SUCCESS:
      return { ...state, error: ProblemsType._NP };
    case UserActionsTypes.REMOVE_ERROR:
      return { ...state, error: ProblemsType._NP };
    default:
      return state;
  }
};
