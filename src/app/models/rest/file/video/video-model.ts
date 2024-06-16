import {FileState} from "../file-state";

export class VideoModel {
  thisIndex: number = 0;
  fileState: FileState = FileState.OK;
  fileName: string = "";
  fileExt: string = "";
  title: string = "";
  descriptions?: string;
  fileDate?: Date;
  hashTag?: string;
  subPath?: string;
  videoCategoryThisIndex?: number;
}
