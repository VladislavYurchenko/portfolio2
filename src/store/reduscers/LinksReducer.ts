import { LinksAction, LinksActionsTypes, LinksState } from "../../types/LinksTypes";

const initialState: LinksState = {
  links: new Map(),
  preload: 0,
  currentLink: null,
};
export const LinksReducer = (state = initialState, action: LinksAction): LinksState => {
  switch (action.type) {
    case LinksActionsTypes.GET_LINKS:
      return { links: action.links, preload: 0, currentLink: null };
    case LinksActionsTypes.PRELOAD:
      return { ...state, preload: action.preload };
    case LinksActionsTypes.SELECT_LINK:
      return { ...state, currentLink: action.link };
    case LinksActionsTypes.ADD_LINK:
      state.links.set(action.link.id, action.link);
      return { ...state };
    case LinksActionsTypes.UPDATE_LINK:
      state.links.set(action.link.id, action.link);
      return { ...state, currentLink: null };
    case LinksActionsTypes.DELETE_LINK:
      state.links.delete(action.link.id);
      return { ...state };
    default:
      return state;
  }
};
