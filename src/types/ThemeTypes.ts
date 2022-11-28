export enum ThemeActionsTypes {
  TOGGLE_THEME = "TOGGLE_THEME",
  SET_LIGHT_THME = "SET_LIGHT_THME",
  SET_DARK_THME = "SET_DARK_THME",
}
export enum ThemeTypes {
  DARK = "DARK",
  LIGHT = "LIGHT",
  MINT = "MINT",
}

export const DefaultTheme = ThemeTypes.DARK;
export const DefaultPreviousTheme = ThemeTypes.LIGHT;
export interface ThemeState {
  theme: ThemeTypes;
  previousTheme: ThemeTypes;
}

interface SetDarkThemeAction {
  type: ThemeActionsTypes.SET_DARK_THME;
}
interface SetLightThemeAction {
  type: ThemeActionsTypes.SET_LIGHT_THME;
}
interface ToggleThemeAction {
  type: ThemeActionsTypes.TOGGLE_THEME;
}

export type ThemeAction = SetDarkThemeAction | SetLightThemeAction | ToggleThemeAction;
