import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getLinks } from "../../store/actionCreators/LinksActionCreator";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import Link from "./links/link";
import NewLink from "./links/newlink";
import PreloadLink from "./links/preLoadLink";
import Settings from "./settings/index";

import "./linkslist.scss";
// import UrlLink from "./links/UrlLink";

interface AppContextInterface {
  toggleWindow: () => void;
  WindowStatus: boolean;
}

export const LinkSettingsContext = createContext<AppContextInterface | null>(null);

const LinkList = () => {
  const { links, preload } = useTypedSelector((state) => state.links);
  const [WindowStatus, setStatusWindow] = useState(false);

  function toggleWindow(): void {
    setStatusWindow((WindowStatus) => !WindowStatus);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLinks());
  }, [dispatch]);

  if (preload) {
    const preloadLinks = [];
    for (let i = 0; i < preload; i++) {
      preloadLinks.push(<PreloadLink key={"preloadLink" + i} />);
    }
    return <div className="link-list-grid ">{preloadLinks}</div>;
  }

  return (
    <>
      <LinkSettingsContext.Provider
        value={{
          toggleWindow,
          WindowStatus,
          // currentLink,
          // updateCorrentLink,
          // imgLoader: store.downloadImage,
          // urlImages,
          // setUrlImages,
        }}
      >
        <Settings />
        <div className="link-list-grid">
          {Array.from(links).map((link) => (
            // <UrlLink link={link[1]} key={link[0]} />
            <Link {...link[1]} key={link[0]} />
          ))}

          <NewLink />
        </div>
      </LinkSettingsContext.Provider>
    </>
  );
};

export default LinkList;
