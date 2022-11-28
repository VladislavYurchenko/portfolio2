import { Dispatch } from "react";
import LinksRequests from "../../axios/requests/LinksRequests";
import b64toBlob from "../../functions/b64toblob";
import { ImageData, LinkData, LinksAction, LinksActionsTypes } from "../../types/LinksTypes";
import { Problem, ServerResponce } from "../../types/ServerResponce";

const genImagesUrl = (images: ImageData[]): ImageData[] => {
  images.map((image) => {
    const blob = b64toBlob(image.source, image.type);
    const blobUrl = URL.createObjectURL(blob);
    image.url = blobUrl;

    return image;
  });
  return images;
};

export const getLinks = () => {
  return async (dispatch: Dispatch<LinksAction>) => {
    try {
      const preload = await LinksRequests.preloadLinks();
      const preloadResponseData: ServerResponce = preload.data;
      if (preloadResponseData.status) {
        dispatch({ type: LinksActionsTypes.PRELOAD, preload: preloadResponseData.data });
      }
      const response = await LinksRequests.getLinks();
      const responseData: ServerResponce = response.data;

      if (responseData.status) {
        const links = new Map(
          responseData.data.map((obj: LinkData) => {
            obj.images = genImagesUrl(obj.images);
            obj.deletedFiles = [];
            return [obj.id, obj];
          })
        ) as Map<string, LinkData>;
        dispatch({ type: LinksActionsTypes.GET_LINKS, links: links });
      } else {
        const problemData = responseData.data as Problem;
        console.error(problemData);
      }
    } catch (error: any) {
      console.error(error);
    }
  };
};
export const selectLink = (link: LinkData | null) => {
  return async (dispatch: Dispatch<LinksAction>) => {
    try {
      dispatch({ type: LinksActionsTypes.SELECT_LINK, link: link });
    } catch (error: any) {
      console.error(error);
    }
  };
};
export const addLink = () => {
  return async (dispatch: Dispatch<LinksAction>) => {
    try {
      const response = await LinksRequests.addLink();
      const responseData: ServerResponce = response.data;
      const link = { ...responseData.data, deletedFiles: [] } as LinkData;
      console.log(link);

      dispatch({ type: LinksActionsTypes.ADD_LINK, link: link });
    } catch (error: any) {
      console.error(error);
    }
  };
};
export const updateLink = (link: LinkData) => {
  return async (dispatch: Dispatch<LinksAction>) => {
    try {
      const response = await LinksRequests.updateLink(link.id, link.name, link.url, link.deletedFiles, link.images);
      const responseData: ServerResponce = response.data;
      if (responseData.status) {
        const link: LinkData = responseData.data;
        link.images = genImagesUrl(link.images);
        link.deletedFiles = [];
        dispatch({ type: LinksActionsTypes.UPDATE_LINK, link: link });
      } else {
        const problemData = responseData.data as Problem;
        console.error(problemData);
      }
    } catch (error: any) {
      console.error(error);
    }
  };
};
export const deleteLink = (link: LinkData) => {
  return async (dispatch: Dispatch<LinksAction>) => {
    try {
      const response = await LinksRequests.deleteLink(link.id);
      const responseData: ServerResponce = response.data;
      console.log(responseData);
      if (responseData.status) {
        dispatch({ type: LinksActionsTypes.DELETE_LINK, link: link });
      } else {
        const problemData = responseData.data as Problem;
        console.error(problemData);
      }
    } catch (error: any) {
      console.error(error);
    }
  };
};
