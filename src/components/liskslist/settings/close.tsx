import { FC } from "react";

interface Props {
  cancel: () => void;
}

const Close: FC<Props> = ({ cancel }) => {
  return (
    <div className="settings-window__close">
      <button className="btn-circle" onClick={cancel}>
        <i className="icon-cancel"></i>
      </button>
    </div>
  );
};

export default Close;
