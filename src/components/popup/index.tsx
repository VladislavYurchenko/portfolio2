import { FC } from "react";
import "./popup.scss";

interface PopupProps {
  toggleStatus: () => void;
  className?: string;
  status: boolean;
  children?: React.ReactNode;
}

const Popup: FC<PopupProps> = ({ toggleStatus, className, status, children }) => {
  return (
    <div className={"_popup " + (className ?? "") + (status ? "" : " _popup--hidden")} onMouseDown={toggleStatus}>
      <div className="__popup__content" onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Popup;
