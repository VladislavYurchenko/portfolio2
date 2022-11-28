import { FC } from "react";

interface ToggleWindowProps {
  toggleWindow: () => void;
}

const CloseBtnBlock: FC<ToggleWindowProps> = ({ toggleWindow }) => {
  return (
    <div className="settings-window__close">
      <button className="btn-circle" onClick={toggleWindow}>
        <i className="icon-cancel"></i>
      </button>
    </div>
  );
};
export default CloseBtnBlock;
