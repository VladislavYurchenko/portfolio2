import { AxiosResponse } from "axios";
import PROTECTED_API from "..";
import { ServerResponce } from "../../types/ServerResponce";
import { ImageData } from "../../types/LinksTypes";

export default class LinksRequests {
  static async getLinks() {
    return PROTECTED_API.get("/links");
  }
  static async preloadLinks() {
    return PROTECTED_API.get("/links/preload");
  }
  static async addLink() {
    return PROTECTED_API.post("/links");
  }
  static async updateLink(id: string, name: string, url: string, deletedFiles: string[], images: ImageData[]): Promise<AxiosResponse<ServerResponce>> {
    const FD: FormData = new FormData();
    FD.append("id", id);
    FD.append("name", name ?? "");
    FD.append("url", url ?? "");
    FD.append("deletedFiles", JSON.stringify(deletedFiles));
    images.forEach((image) => {
      if (image.file) FD.append("files", image.file, image.file.name);
    });

    return PROTECTED_API.put("/links", FD);
  }
  static async deleteLink(id: string) {
    return PROTECTED_API.post("/links/" + id);
  }
}
