export enum NotifiactionActionsTypes {
  ADD_NOTICE = "ADD_NOTICE",
  REMOVE_NOTICE = "REMOVE_NOTICE",
}

export const NoticeTimeOut = 5000;
export const NoticeShowTime = 1400 * 2;

export enum MessageType {
  ERROR = "ERROR",
  WARNING = "WARNING",
  SUCCESS = "SUCCESS",
}
export class Notification {
  id: string;
  message: string;
  type: MessageType;
  timer: number;
  constructor(id: string, message: string, type: MessageType, timer: number = NoticeTimeOut) {
    this.id = id;
    this.message = message;
    this.type = type;
    this.timer = timer;
  }
}

export interface NotifiacationState {
  notifications: Map<string, Notification>;
}

interface AddNoticeAction {
  type: NotifiactionActionsTypes.ADD_NOTICE;
  notice: Notification;
}
interface RemoveNoticeAction {
  type: NotifiactionActionsTypes.REMOVE_NOTICE;
  id: string;
}

export type NotificationAction = AddNoticeAction | RemoveNoticeAction;
