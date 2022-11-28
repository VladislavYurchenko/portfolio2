import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAction } from "../../../../hooks/useAction";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { addNotice } from "../../../../store/actionCreators/NotificationActionCreator";
import { MessageType } from "../../../../types/NotificationTypes";
import Popup from "../../../popup";
import { PasswordTrobles, passwordValidator } from "../../../validators/passwordValidator";

interface StatusProps {
  status: boolean;
  toggle: () => void;
}

const ChangePasswordBlock: FC<StatusProps> = ({ status, toggle }) => {
  const Form = () => {
    const { changePassword } = useAction();
    const { error } = useTypedSelector((state) => state.user);
    const [password, setPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [checkpassword, setCheckPassword] = useState("");
    const [verror, setVError] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
      if (verror) {
        switch (verror) {
          case PasswordTrobles.PASSWORDS_ARE_EMPRY:
            dispatch(addNotice("поля не заполнены", MessageType.ERROR));
            break;
          case PasswordTrobles.PASSWORD_MISMATCH:
            dispatch(addNotice("пароли не совпадают", MessageType.ERROR));
            break;
          case PasswordTrobles.PASSWORD_TOO_SHORT:
            dispatch(addNotice("новый пароль слишком короткий", MessageType.ERROR));
            break;
          case PasswordTrobles.NEW_PASSWORD_EQUAL_OLD_PASSWORD:
            dispatch(addNotice("новый пароль совпадает со старым", MessageType.ERROR));
            break;
          default:
            dispatch(addNotice(verror, MessageType.ERROR));
            break;
        }
      }
    }, [verror, error, dispatch]);

    function updatePassword() {
      const validResult = passwordValidator(newpassword, checkpassword, password);
      if (!validResult.status) {
        setVError(validResult.troble);
      } else {
        setVError("");
        changePassword(password, newpassword, () => {
          toggle();
          dispatch(addNotice("Пароль изменен", MessageType.SUCCESS));
        });
      }
    }

    return (
      <div className=" change-password">
        <div className="block">
          <div className="change-password__close">
            <h1>смена пароля</h1>
            <button className="btn-circle" onClick={toggle}>
              <i className="icon-cancel"></i>
            </button>
          </div>
          <label htmlFor="cp-op">старый пароль</label>
          <input type="password" name="" id="cp-op" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label htmlFor="cp-np">новый пароль</label>
          <input type="password" name="" id="cp-np" placeholder="******" value={newpassword} onChange={(e) => setNewPassword(e.target.value)} autoComplete="new-password" />
          <label htmlFor="cp-cp">подтверждение пароля</label>
          <input type="password" name="" id="cp-cp" placeholder="******" value={checkpassword} onChange={(e) => setCheckPassword(e.target.value)} autoComplete="new-password" />
          <button onClick={updatePassword}>сменить</button>
        </div>
      </div>
    );
  };
  return (
    <>
      <Popup status={status} toggleStatus={toggle}>
        <Form />
      </Popup>
      <div className="info__element  account-info__password">
        <button className="btn" onClick={toggle}>
          сменить пароль
        </button>
      </div>
    </>
  );
};
export default ChangePasswordBlock;
