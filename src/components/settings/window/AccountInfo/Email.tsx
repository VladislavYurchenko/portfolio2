import { FC, useEffect, useState } from "react";
import { useAction } from "../../../../hooks/useAction";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

const EmailGroup: FC = () => {
  const { email } = useTypedSelector((state) => state.user);
  const [iemail, setIEmail] = useState(email);

  const { changeEmail } = useAction();
  const [emailGroupStatus, setEmailGroupStatus] = useState(false);

  useEffect(() => {
    setIEmail(email);
  }, [email]);

  function toggleEmail(): void {
    setEmailGroupStatus(!emailGroupStatus);
  }
  function close(): void {
    setIEmail(email);
    toggleEmail();
  }
  function update(): void {
    changeEmail(iemail);
    toggleEmail();
  }

  if (!emailGroupStatus) {
    return (
      <div className="info__element">
        <span className="account-info__email">{email}</span>
        <i className="icon-pencil btn btn-mini" onClick={toggleEmail}></i>
      </div>
    );
  } else {
    return (
      <div className="info__element">
        <input type="text" value={iemail} className="" onChange={(e) => setIEmail(e.target.value)} placeholder="example@mail.com" />
        <i className="icon-ok btn btn-mini" onClick={update}></i>
        <i className="icon-cancel btn btn-mini" onClick={close}></i>
      </div>
    );
  }
};

export default EmailGroup;
