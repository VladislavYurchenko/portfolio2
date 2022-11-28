import { FC, useState } from "react";
import { useAction } from "../../../../hooks/useAction";
import Popup from "../../../popup";

const DeleteAccount: FC = () => {
  const [status, setStatus] = useState(false);

  function toggle() {
    setStatus(!status);
  }

  const Confirm: FC = () => {
    const [password, setPassword] = useState("");
    const { deleteUser } = useAction();
    function del() {
      deleteUser(password, toggle);
    }
    return (
      <Popup status={status} toggleStatus={toggle}>
        <div className="block confirm">
          <div className="confirm__message">
            <label htmlFor="delete-password">пароль</label>
            <input type="password" name="" id="delete-password" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button onClick={toggle}>отмена</button>
          <button onClick={del}>удалить аккаунт</button>
        </div>
      </Popup>
    );
  };
  return (
    <>
      <div className="info__element">
        <button className="btn" onClick={toggle}>
          удалить аккаунт
        </button>
      </div>
      <Confirm />
    </>
  );
};
export default DeleteAccount;
