import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAction } from "../../../hooks/useAction";
import { setError } from "../../../store/actionCreators/AuthActionCreator";
import { PasswordTrobles, passwordValidator } from "../../validators/passwordValidator";

const RegistrationForm = () => {
  //form fields
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // inputs hilights classes
  const [warning, serWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  //error msg
  const [validationMsg, setMsg] = useState("");
  const { registration } = useAction();
  const dispatch = useDispatch();
  function validator(): void {
    const validResult = passwordValidator(password, confirmPassword);
    console.log(validResult);

    if (validResult.status) {
      setMsg("");
      registration(email, password, name);
    } else {
      setMsg(validResult.troble);
      if (
        validResult.troble === PasswordTrobles.PASSWORDS_ARE_EMPRY ||
        validResult.troble === PasswordTrobles.PASSWORD_TOO_SHORT ||
        validResult.troble === PasswordTrobles.PASSWORD_MISMATCH
      ) {
        setPasswordWarning("warning");
      }
      if (email === "") {
        serWarning("warning");
        setMsg("Необходимо заполнить обязательные поля");
      }
    }
  }
  useEffect(() => {
    if (validationMsg) {
      dispatch(setError(validationMsg));
    }
  }, [validationMsg, dispatch]);

  return (
    <div className="block">
      <div className="grid grid-col-2">
        <label htmlFor="email">почта</label>
        <input className={warning} id="email" type="text" placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="name">имя</label>
        <input id="name" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="password">пароль</label>
        <input
          className={passwordWarning}
          id="password"
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
        <label htmlFor="confirm-password">пароль</label>
        <input
          className={passwordWarning}
          id="confirm-password"
          type="password"
          placeholder="******"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      {/* <div className="message color-danger">{validationMsg ? validationMsg : error}</div> */}
      <div className="btn-block">
        <button onClick={() => validator()}>
          регистрация <i className="icon-login"></i>
        </button>
        {/* <span className="space"></span> */}
      </div>
    </div>
  );
};

export default RegistrationForm;
