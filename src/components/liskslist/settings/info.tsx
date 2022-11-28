import { FC, useEffect, useState } from "react";
import { useAction } from "../../../hooks/useAction";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { LinkData } from "../../../types/LinksTypes";

interface Props {}

const Info: FC<Props> = () => {
  const { currentLink } = useTypedSelector((state) => state.links);
  const { selectLink } = useAction();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    setName(currentLink?.name ?? "");
    setUrl(currentLink?.url ?? "");
  }, [currentLink]);

  return (
    <div>
      <div className="settings-window__info-block">
        <h1>ссылка</h1>
        <div className="form-group">
          <label htmlFor="link-name">название</label>
          <input
            id="link-name"
            type="text"
            placeholder="Some Site"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              selectLink({ ...currentLink, name: e.target.value } as LinkData);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="link-url">ссылка</label>
          <input
            id="link-url"
            type="text"
            placeholder="someSite.com"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              selectLink({ ...currentLink, url: e.target.value } as LinkData);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Info;
