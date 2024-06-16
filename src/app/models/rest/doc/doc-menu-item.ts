import {VideoCategoryModel} from "../file/video/video-category-model";
import * as FConstants from "../../../guards/f-constants";

export class DocMenuItem {
  name?: string;
  icon?: string;
  children?: DocMenuItem[];
  routerLink?: string;
  href?: string;
  badge?: string;

  setVideoMenu(data: VideoCategoryModel): DocMenuItem {
    this.name = data.dirName;
    this.routerLink = `${FConstants.VIDEO_STREAM_URL}/${data.dirName}`;
    return this
  }
}
