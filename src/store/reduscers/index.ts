import { combineReducers } from "redux";
import { AuthReducer } from "./AuthReducer";
import { LinksReducer } from "./LinksReducer";
import { NotificationsReduser } from "./NotificationsReducer";
import { ThemeReducer } from "./ThemeReducer";
import { UserReducer } from "./UserReducer";

export const rootReducer = combineReducers({ auth: AuthReducer, user: UserReducer, links: LinksReducer, theme: ThemeReducer, notification: NotificationsReduser });
export type RootState = ReturnType<typeof rootReducer>;
