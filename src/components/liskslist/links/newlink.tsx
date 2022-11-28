import { FC } from "react";
import { useAction } from "../../../hooks/useAction";

const Newlink: FC = () => {
  const { addLink } = useAction();
  return (
    <div>
      <div className="link">
        <button
          className="link__img"
          onClick={() => {
            addLink();
          }}
        >
          добавить
        </button>
      </div>
    </div>
  );
};

export default Newlink;
