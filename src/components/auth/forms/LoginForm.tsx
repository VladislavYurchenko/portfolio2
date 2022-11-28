import { FC, useState } from "react";
import { useAction } from "../../../hooks/useAction";
// import { useTypedSelector } from "../../../hooks/useTypedSelector";
// import { MessageType } from "../../../types/NotificationTypes";

const LoginForm: FC = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { error } = useTypedSelector((state) => state.auth);

  const { login } = useAction();
  // const { addNotice } = useAction();
  function mlogin() {
    login(email, password);
  }
  // if (error) {
  //   addNotice(error, MessageType.ERROR);
  // }
  return (
    <div>
      <div className="block">
        <div className="grid grid-col-2">
          <label htmlFor="email">почта</label>
          <input id="email" type="text" placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="on" />
          <label htmlFor="password">пароль</label>
          <input id="password" type="password" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="on" />
        </div>
        {/* <div className="message color-danger">{error}</div> */}
        <div className="btn-block">
          <button onClick={() => mlogin()}>
            войти <i className="icon-login"></i>
          </button>
          {/* <span className="space"></span> */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
