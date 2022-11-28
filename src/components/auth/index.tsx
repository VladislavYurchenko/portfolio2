import { FC, useEffect, useState } from "react";
import LoginForm from "./forms/LoginForm";
import "./auth.scss";
import Prompt from "./Prompt";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Redirect } from "react-router";
import { FormTypes } from "./propsTypes/formProps";
import RegistrationForm from "./forms/registrationForm";
import { MessageType } from "../../types/NotificationTypes";
import { useAction } from "../../hooks/useAction";

const Auth: FC = () => {
  const { isAuth, error } = useTypedSelector((state) => state.auth);
  const [formType, setFormType] = useState(FormTypes.LOGIN);
  const { addNotice } = useAction();
  useEffect(() => {
    if (!localStorage.getItem("formType")) {
      localStorage.setItem("formType", FormTypes.LOGIN);
    } else {
      setFormType(localStorage.getItem("formType") as FormTypes);
    }
  }, []);
  useEffect(() => {
    if (error) {
      addNotice(error, MessageType.ERROR);
    }
  });
  if (isAuth) {
    return <Redirect to="/" />;
  }

  function toggleForm(): void {
    switch (formType) {
      case FormTypes.LOGIN:
        setFormType(FormTypes.REGIN);
        localStorage.setItem("formType", FormTypes.REGIN);
        break;
      case FormTypes.REGIN:
        setFormType(FormTypes.LOGIN);
        localStorage.setItem("formType", FormTypes.LOGIN);
        break;
      default:
        setFormType(FormTypes.LOGIN);
        localStorage.setItem("formType", FormTypes.LOGIN);
        break;
    }
  }

  return (
    <div className="auth">
      <Prompt formType={formType} toggleForm={toggleForm} />
      {formType === FormTypes.LOGIN ? <LoginForm /> : <RegistrationForm />}
    </div>
  );
};

export default Auth;
