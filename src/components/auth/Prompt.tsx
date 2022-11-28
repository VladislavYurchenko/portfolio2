import { FC } from "react";
import { FormProps, FormTypes } from "./propsTypes/formProps";

const Prompt: FC<FormProps> = ({ formType, toggleForm }) => {
  switch (formType) {
    case FormTypes.LOGIN:
      return (
        <div className="block">
          <p>чтобы получить полный доступ ко всем возможностям небходимо быть зарегистрированным пользователем</p>
          <button className="btn" onClick={toggleForm}>
            зарегистрироваться
          </button>
        </div>
      );
    case FormTypes.REGIN:
      return (
        <div className="block">
          <p>уже есть аккаунт?</p>
          <button className="btn" onClick={toggleForm}>
            войти
          </button>
        </div>
      );
    default:
      return <div></div>;
  }
};

export default Prompt;
