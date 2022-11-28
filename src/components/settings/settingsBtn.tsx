import { FC } from "react";

interface SettingsBtnProps {
  windowStatus: boolean;
  toggleWindow: () => void;
}

const SettingsBtn: FC<SettingsBtnProps> = ({ windowStatus, toggleWindow }) => {
  return (
    <button onClick={toggleWindow} className="settings-btn">
      <i className="icon-sliders"></i>
    </button>
  );
};

export default SettingsBtn;
