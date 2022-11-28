import { Dispatch } from "react";
import { ThemeAction, ThemeActionsTypes } from "../../types/ThemeTypes";

export const toggleTheme = () => {
  return async (dispatch: Dispatch<ThemeAction>) => {
    try {
      dispatch({ type: ThemeActionsTypes.TOGGLE_THEME });
    } catch (error: any) {
      console.error(error);
    }
  };
};
