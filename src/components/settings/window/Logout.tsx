import { FC } from "react";
import { useAction } from "../../../hooks/useAction";

const LogoutGroup: FC = () => {
  const { logout } = useAction();
  return (
    <div>
      <button onClick={logout}>
        выйти <i className="icon-logout"></i>
      </button>
    </div>
  );
};
export default LogoutGroup;
