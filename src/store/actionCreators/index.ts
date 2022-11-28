import * as AuthActionCreator from "./AuthActionCreator";
import * as UserActionCreator from "./UserActionCreator";
import * as LinksActionCreator from "./LinksActionCreator";
import * as ThemeActionCreator from "./ThemeActionCreator";
import * as NotificationActionCreator from "./NotificationActionCreator";
const ActionCreator = {
  ...AuthActionCreator,
  ...UserActionCreator,
  ...LinksActionCreator,
  ...ThemeActionCreator,
  ...NotificationActionCreator,
};
export default ActionCreator;
