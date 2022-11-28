import React, { FC } from "react";

interface Props {
  save: () => void;
  cancel: () => void;
  deleteLink: () => void;
}

const Buttons: FC<Props> = ({ save, cancel, deleteLink }) => {
  return (
    <div className="settings-window__btns-block">
      <button onClick={save}>изменить</button>
      <button onClick={cancel}>отменить</button>
      <button onClick={deleteLink}>удалить</button>
    </div>
  );
};

export default Buttons;
