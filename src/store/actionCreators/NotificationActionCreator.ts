import { Dispatch } from "react";
import { MessageType, NotifiactionActionsTypes, NotificationAction, Notification, NoticeTimeOut, NoticeShowTime } from "../../types/NotificationTypes";

function createID(): string {
  return Date.now().toString();
}

export const addNotice = (message: string, type: MessageType, timer?: number) => {
  return async (dispatch: Dispatch<NotificationAction>): Promise<void> => {
    try {
      const id = createID();
      dispatch({ type: NotifiactionActionsTypes.ADD_NOTICE, notice: new Notification(id, message, type, timer) });
      setTimeout(() => {
        dispatch({ type: NotifiactionActionsTypes.REMOVE_NOTICE, id: id });
      }, NoticeTimeOut + NoticeShowTime);
    } catch (error: any) {
      console.error(error);
    }
  };
};
export const removeNotice = (id: string) => {
  return async (dispatch: Dispatch<NotificationAction>): Promise<void> => {
    try {
      dispatch({ type: NotifiactionActionsTypes.REMOVE_NOTICE, id: id });
    } catch (error: any) {
      console.error(error);
    }
  };
};
