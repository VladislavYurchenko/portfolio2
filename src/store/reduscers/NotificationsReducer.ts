import { NotifiacationState, NotifiactionActionsTypes, NotificationAction } from "../../types/NotificationTypes";

const initialState: NotifiacationState = {
  notifications: new Map(),
};
export const NotificationsReduser = (state = initialState, action: NotificationAction): NotifiacationState => {
  switch (action.type) {
    case NotifiactionActionsTypes.ADD_NOTICE:
      state.notifications.set(action.notice.id, action.notice);
      return { ...state };
    case NotifiactionActionsTypes.REMOVE_NOTICE:
      state.notifications.delete(action.id);
      return { ...state };
    default:
      return state;
  }
};
