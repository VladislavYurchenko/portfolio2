import { FC, useContext } from "react";
import { LinkSettingsContext } from "..";

import Popup from "../../popup";
import ButtonsBlock from "./buttons";
import CloseBlock from "./close";
import InfoBlock from "./info";
import ImagesBlock from "./images";
import SettingsBlock from "./settings";
import "./settings.scss";
import { useAction } from "../../../hooks/useAction";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { MessageType } from "../../../types/NotificationTypes";

const Settings: FC = () => {
  const ctx = useContext(LinkSettingsContext);
  const { currentLink } = useTypedSelector((state) => state.links);
  const { updateLink, selectLink, deleteLink, addNotice } = useAction();

  if (!currentLink) {
    return <></>;
  }

  function cancel(): void {
    ctx?.toggleWindow();
    selectLink(null);
  }
  function save(): void {
    if (currentLink !== null) updateLink(currentLink);
    addNotice("изменения сохранены ", MessageType.SUCCESS);
    cancel();
  }
  function fdeleteLink(): void {
    if (currentLink !== null) deleteLink(currentLink);
    cancel();
  }

  return (
    <Popup status={ctx?.WindowStatus ?? false} toggleStatus={() => cancel()}>
      <div className="settings-window ">
        <div className="block ">
          <CloseBlock cancel={cancel} />
          <InfoBlock />
          <ImagesBlock />
          <SettingsBlock />
          <ButtonsBlock cancel={cancel} save={save} deleteLink={fdeleteLink} />
        </div>
      </div>
    </Popup>
  );
};

export default Settings;
