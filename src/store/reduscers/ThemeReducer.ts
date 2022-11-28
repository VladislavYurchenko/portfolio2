import { DefaultPreviousTheme, DefaultTheme, ThemeAction, ThemeActionsTypes, ThemeState, ThemeTypes } from "../../types/ThemeTypes";

const initialState: ThemeState = {
  theme: getTheme().theme,
  previousTheme: getTheme().pTheme,
};

export const ThemeReducer = (state = initialState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case ThemeActionsTypes.SET_DARK_THME:
      setTheme(ThemeTypes.DARK);
      sevePreviosTheme(state.theme);
      return { theme: ThemeTypes.DARK, previousTheme: state.theme };
    case ThemeActionsTypes.SET_LIGHT_THME:
      setTheme(ThemeTypes.LIGHT);
      sevePreviosTheme(state.theme);
      return { theme: ThemeTypes.LIGHT, previousTheme: state.theme };
    case ThemeActionsTypes.TOGGLE_THEME:
      setTheme(state.previousTheme);
      sevePreviosTheme(state.theme);
      return { theme: state.previousTheme, previousTheme: state.theme };
    default:
      return state;
  }
};

function getTheme(): { theme: ThemeTypes; pTheme: ThemeTypes } {
  if (localStorage.getItem("THEME") && localStorage.getItem("PREVIOS_THEME")) {
    setTheme(localStorage.getItem("THEME") as ThemeTypes);
    return { theme: localStorage.getItem("THEME") as ThemeTypes, pTheme: localStorage.getItem("PREVIOS_THEME") as ThemeTypes };
  } else {
    setTheme(DefaultTheme);
    return { theme: DefaultTheme, pTheme: DefaultPreviousTheme };
  }
}

function setTheme(theme: ThemeTypes): void {
  document.body.className = "";
  document.body.classList.add(theme);
  localStorage.setItem("THEME", theme);
}

function sevePreviosTheme(theme: ThemeTypes): void {
  localStorage.setItem("PREVIOS_THEME", theme);
}
