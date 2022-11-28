import { FC, useState } from "react";

import SettingsBtn from "./settingsBtn";
import Popup from "../popup";
import SettingsWindow from "./window";

import "./settings.scss";

const Settings: FC = () => {
  const [windowStatus, setWindowStatus] = useState(false);

  function toggleWindow(): void {
    setWindowStatus(!windowStatus);
  }

  return (
    <>
      <div className="btnpos">
        <SettingsBtn windowStatus={windowStatus} toggleWindow={toggleWindow} />
      </div>
      <Popup status={windowStatus} toggleStatus={toggleWindow}>
        <SettingsWindow toggleWindow={toggleWindow} />
      </Popup>
    </>
  );
};

export default Settings;
