import { FC, useEffect, useState } from "react";
import { useAction } from "../../../../hooks/useAction";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { MessageType } from "../../../../types/NotificationTypes";

const NameGroup: FC = () => {
  const { changeName, addNotice } = useAction();
  const { name } = useTypedSelector((state) => state.user);
  const [iname, setIName] = useState(name);
  const [nameGroupStatus, setNameGroupStatus] = useState(false);

  useEffect(() => {
    setIName(name);
  }, [name]);

  function toggleName(): void {
    setNameGroupStatus(!nameGroupStatus);
  }
  function close(): void {
    setIName(name);
    toggleName();
  }
  function update(): void {
    changeName(iname);
    addNotice("изменения сохранены ", MessageType.SUCCESS);
    toggleName();
  }

  if (!nameGroupStatus) {
    return (
      <div className="info__element">
        <span className="account-info__name">{name ? name : "Безымянный"}</span>
        <i className="icon-pencil btn btn-mini" onClick={toggleName}></i>
      </div>
    );
  } else {
    return (
      <div className="info__element">
        <input type="text" value={iname ?? ""} onChange={(e) => setIName(e.target.value)} placeholder="Name" />
        <i className="icon-ok btn btn-mini" onClick={update}></i>
        <i className="icon-cancel btn btn-mini" onClick={close}></i>
      </div>
    );
  }
};
export default NameGroup;
