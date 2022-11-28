import { FC } from "react";

const PreLoadLink: FC = () => {
  return (
    <div className="link preload-link">
      <div className="link__img">
        <i className="icon-spin5 animate-spin "></i>
      </div>
      <div className="link__name"></div>
    </div>
  );
};

export default PreLoadLink;
