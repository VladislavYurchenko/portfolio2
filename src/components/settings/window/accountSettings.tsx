import { FC } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { useAction } from "../../../hooks/useAction";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ThemeTypes } from "../../../types/ThemeTypes";
const AccountSettingsGroup: FC = () => {
  const { toggleTheme } = useAction();
  const { theme } = useTypedSelector((state) => state.theme);
  return (
    <div className="account-settings">
      <h2>настройки</h2>
      <div className="account-settings__field">
        цветовой режим <span className="space"></span>
        <Toggle
          id="cheese-status"
          icons={{
            checked: <i className="icon-sun"></i>,
            unchecked: <i className="icon-moon"></i>,
          }}
          defaultChecked={theme === ThemeTypes.LIGHT ? true : false}
          onChange={toggleTheme}
        />
      </div>
      <div className="account-settings__field">
        {/* <Link to="/test" className="sub-btn">
      test
    </Link> */}
      </div>
    </div>
  );
};
export default AccountSettingsGroup;
