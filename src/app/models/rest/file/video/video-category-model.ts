import {VideoCategoryState} from "../video-category-state";
import {VideoModel} from "./video-model";

export class VideoCategoryModel {
  thisIndex: number = 0;
  videoCategoryState: VideoCategoryState = VideoCategoryState.OK;
  dirName: string = "";
  children: VideoCategoryModel[] = [];
  video: VideoModel[] = [];
}
