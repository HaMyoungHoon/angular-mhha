import {afterNextRender, ChangeDetectorRef, Component, ViewChild} from "@angular/core";
import {VideoStreamService} from "../../../../services/rest/video-stream.service";
import {FDialogService} from "../../../../services/common/f-dialog.service";
import {VideoCategoryModel} from "../../../../models/rest/file/video/video-category-model";
import {ActivatedRoute} from "@angular/router";
import {VideoModel} from "../../../../models/rest/file/video/video-model";
import {VideoViewComponent} from "../../../common/video-view/video-view.component";

@Component({
  selector: "app-video-stream",
  templateUrl: "./video-stream.component.html",
  styleUrl: "./video-stream.component.scss"
})
export class VideoStreamComponent {
  rootDir?: string;
  @ViewChild("videoView") videoView?: VideoViewComponent;
  videoCategoryModels?: VideoCategoryModel[];
  selectedVideoCategoryModel?: VideoCategoryModel;
  videoModelDisable: boolean;
  videoModels?: VideoModel[];
  prevVideoModel?: VideoModel;
  selectedVideoModel?: VideoModel;
  constructor(private route: ActivatedRoute, private cd: ChangeDetectorRef, private videoStreamService: VideoStreamService, private fDialogService: FDialogService) {
//    this.videoSrc = ""
    route.paramMap.subscribe(x => {
      this.rootDir = x.get("rootDir") ?? undefined;
      this.init();
    });
    this.videoModelDisable = false;
    afterNextRender(() => {
      this.cd.markForCheck();
    });
  }

  init(): void {
//    this.videoSrc = this.videoStreamService.getVideoResourceUrl(thisIndex);
    this.videoStreamService.getCategoryList().then(x => {
      if (x.result) {
        const rootBuff = x.data?.filter(x => x.dirName == this.rootDir);
        if (rootBuff === undefined || rootBuff.length <= 0) {
          return;
        }
        this.videoCategoryModels = rootBuff[0].children;
        this.selectedVideoCategoryModel = this.videoCategoryModels[0];
        this.getVideoList();
        return;
      }
      this.fDialogService.warn("init", x.msg);
    }).catch(x => {
      this.fDialogService.error("init catch", x.message);
    });
  }
  selectVideoCategoryModel(data: any): void {
    this.getVideoList();
  }
  getVideoList(): void {
    const dirName = this.selectedVideoCategoryModel?.dirName;
    if (dirName === undefined) {
      return;
    }

    this.videoModelDisable = true;
    this.videoStreamService.getVideoByDirname(`${this.rootDir}/${dirName}`).then(x => {
      if (x.result) {
        const videoBuff = x.data?.video;
        if (videoBuff === undefined || videoBuff.length <= 0) {
          return;
        }
        this.videoModels = videoBuff;
        this.videoModelDisable = false;
        this.cd.detectChanges();
        return;
      }
      this.fDialogService.warn("videoList", x.msg);
    }).catch(x => {
      this.fDialogService.error("videoList catch", x.message);
      this.videoModelDisable = false;
    });
  }
  selectVideoModel(data: any): void {
    if (this.selectedVideoModel === undefined || this.selectedVideoCategoryModel === null) {
      this.selectedVideoModel = this.prevVideoModel;
    }

    this.prevVideoModel = this.selectedVideoModel;
    if (this.selectedVideoModel) {
      this.videoView?.setVideoSrc(this.selectedVideoModel);
    }
  }
}
