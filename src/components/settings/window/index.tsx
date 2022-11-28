import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useTypedSelector } from "../../../hooks/useTypedSelector";

import { addNotice } from "../../../store/actionCreators/NotificationActionCreator";
import { removeError } from "../../../store/actionCreators/UserActionCreator";
import { MessageType } from "../../../types/NotificationTypes";
import AccountInfoGroup from "./AccountInfo/index";
import AccountSettingsGroup from "./accountSettings";

import CloseBtnBlock from "./Close";
import LogoutGroup from "./Logout";

interface ToggleWindowProps {
  toggleWindow: () => void;
}

const SettingsWindow: FC<ToggleWindowProps> = ({ toggleWindow }) => {
  const { error } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      dispatch(addNotice(error, MessageType.ERROR));
      dispatch(removeError());
    }
  }, [error, dispatch]);

  return (
    <div className="settings-window">
      <div className="block settings-window__data">
        <CloseBtnBlock toggleWindow={toggleWindow} />
        <div className="account">
          <h2>аккаунт</h2>
          <AccountInfoGroup />
          <AccountSettingsGroup />
          <LogoutGroup />
        </div>
      </div>
    </div>
  );
};

export default SettingsWindow;
