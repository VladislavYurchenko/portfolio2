import { FC, useEffect, useState } from "react";
import { useAction } from "../../hooks/useAction";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { NoticeShowTime, NoticeTimeOut, Notification } from "../../types/NotificationTypes";

import "./message.scss";
interface Props {
  notice: Notification;
}
const MSG: FC<Props> = ({ notice }) => {
  const [activation, setActivation] = useState(false);
  const [activationPB, setActivationPB] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setActivation(true);
      setTimeout(() => {
        setActivationPB(true);
        setTimeout(() => {
          setActivation(false);
        }, NoticeTimeOut);
      }, NoticeShowTime / 2);
    }, 10);
  }, []);
  const { removeNotice } = useAction();
  function remove() {
    setActivation(false);
    setTimeout(() => {
      removeNotice(notice.id);
    }, NoticeShowTime / 2);
  }

  return (
    <div className={"_message" + (activation ? " active" : "") + " msg-type-" + notice.type}>
      <div className={"_message__content"}>{notice.message}</div>
      <div className="_message__close" onClick={remove}>
        <i className="icon-cancel"></i>
      </div>
      <div className={"_message__progressbar" + (activationPB ? " active" : "")}></div>
    </div>
  );
};
const Notifications: FC = () => {
  const { notifications } = useTypedSelector((state) => state.notification);
  return (
    <div className={"_notifications-box "}>
      {Array.from(notifications).map((mapEl) => (
        <MSG key={mapEl[0]} notice={mapEl[1]} />
      ))}
    </div>
  );
};

export default Notifications;
