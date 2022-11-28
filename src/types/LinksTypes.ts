export enum LinksActionsTypes {
  PRELOAD = "PRELOAD",
  GET_LINKS = "GET_LINKS",
  ADD_LINK = "ADD_LINK",
  DELETE_LINK = "DELETE_LINK",
  UPDATE_LINK = "UPDATE_LINK",
  SELECT_LINK = "SELECT_LINK",
}

export class ImageData {
  name: string;
  source: string;
  type: string;
  url: string;
  file?: File;
  constructor(name: string, source: string, type: string, url: string) {
    this.name = name;
    this.source = source;
    this.type = type;
    this.url = url;
  }
}

export class LinkData {
  id!: string;
  user!: number;
  name!: string;
  url!: string;
  images!: ImageData[];
  deletedFiles!: string[];
}

export interface LinksState {
  links: Map<string, LinkData>;
  preload: number;
  currentLink: LinkData | null;
}
interface PreloadLinksAction {
  type: LinksActionsTypes.PRELOAD;
  preload: number;
}
interface GetLinksAction {
  type: LinksActionsTypes.GET_LINKS;
  links: Map<string, LinkData>;
}
interface SelectLinkAction {
  type: LinksActionsTypes.SELECT_LINK;
  link: LinkData | null;
}
interface AddLinkAction {
  type: LinksActionsTypes.ADD_LINK;
  link: LinkData;
}
interface UpdateLinkAction {
  type: LinksActionsTypes.UPDATE_LINK;
  link: LinkData;
}
interface DeleteLinkAction {
  type: LinksActionsTypes.DELETE_LINK;
  link: LinkData;
}

export type LinksAction = GetLinksAction | PreloadLinksAction | SelectLinkAction | AddLinkAction | UpdateLinkAction | DeleteLinkAction;
