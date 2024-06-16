import {afterNextRender, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {VideoStreamService} from "../../../services/rest/video-stream.service";
import {NgIf} from "@angular/common";
import {FDialogService} from "../../../services/common/f-dialog.service";
import {VideoModel} from "../../../models/rest/file/video/video-model";
import {SliderModule} from "primeng/slider";
import {getLocalStorage, setLocalStorage} from "../../../guards/amhohwa";
import * as FConstants from "../../../guards/f-constants";
import {SkeletonModule} from "primeng/skeleton";
import {HttpEvent, HttpEventType} from "@angular/common/http";

@Component({
  selector: 'app-video-view',
  standalone: true,
  imports: [
    NgIf,
    SliderModule,
    SkeletonModule
  ],
  templateUrl: './video-view.component.html',
  styleUrl: './video-view.component.scss'
})
export class VideoViewComponent {
  volume: number;
  videoSrc?: string;
  videoModel?: VideoModel;
  @ViewChild('videoView') videoView?: ElementRef;
  constructor(private cd: ChangeDetectorRef, private videoStreamService: VideoStreamService, private fDialogService: FDialogService) {
    let defVolume = +getLocalStorage(FConstants.DEF_VOLUME)
    if (defVolume === 0 || defVolume > 1) {
      defVolume = 0.3;
      setLocalStorage(FConstants.DEF_VOLUME, "0.3");
    }
    this.volume = defVolume;
    afterNextRender(() => {
      this.cd.markForCheck();
    });
  }
  consoleLog: number = 0;
  setVideoSrc(videoModel: VideoModel): void {
    if (this.videoModel?.thisIndex == videoModel.thisIndex) {
      return;
    }
    this.videoModel = videoModel;
    this.videoSrc = this.videoStreamService.getVideoResourceUrl(videoModel.thisIndex);
    this.cd.detectChanges();
  }
  videoPlaying(data: any): void {
  }
  controlList(): string {
    return "nodownload";
  }
  volumechange(data: any): void {
    let volume = Math.floor(this.videoView?.nativeElement.volume * 100000) / 100000;
    if (volume > 1) {
      volume = 0.3;
    }
    setLocalStorage(FConstants.DEF_VOLUME, volume.toString());
  }
}
