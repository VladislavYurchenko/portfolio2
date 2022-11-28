import { FC, useState } from "react";
// import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import DeleteAccount from "./Delete";
import EmailGroup from "./Email";
import NameGroup from "./Name";
import ChangePasswordBlock from "./Password";

// interface ToggleWindowProps {
//   toggleWindow: () => void;
// }
// interface NameProps {
//   name: string | null;
//   changeName: (name: string | null) => {};
// }
// interface EmailProps {
//   email: string;
//   changeEmail: (email: string) => {};
// }
// interface PasswordProps {
//   error: string;
//   changePassword: (oldPassword: string, newPassword: string) => {};
// }
// interface DeleteProps {
//   deleteUser: () => {};
// }

const AccountInfoGroup: FC = () => {
  const [passwordGroupStatus, setPasswordGroupStatus] = useState(false);
  // const [confirmStatus, setConfirmStatus] = useState(false);
  // function toggleConfirm(): void {
  //   setConfirmStatus(!confirmStatus);
  // }

  function togglePassword(): void {
    setPasswordGroupStatus(!passwordGroupStatus);
  }

  // const ErrorMsg: FC = () => {
  //   const { error } = useTypedSelector((state) => state.user);
  //   const [state, setstate] = useState(error);
  //   useEffect(() => {
  //     setstate(error);
  //   }, [error]);

  //   return <div>{state}</div>;
  // };

  return (
    <>
      <div className="accountInfo">
        <NameGroup />
        <EmailGroup />
        <ChangePasswordBlock status={passwordGroupStatus} toggle={togglePassword} />
        <DeleteAccount />
      </div>
    </>
  );
};

export default AccountInfoGroup;
