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
import {SafeUrlPipe} from "../../../guards/safe-url.pipe";
import {Subject} from "rxjs";

@Component({
  selector: 'app-video-view',
  standalone: true,
  imports: [
    NgIf,
    SliderModule,
    SkeletonModule,
    SafeUrlPipe
  ],
  templateUrl: './video-view.component.html',
  styleUrl: './video-view.component.scss'
})
export class VideoViewComponent {
  volume: number = 0.3;
  videoSrc?: string;
  videoModel?: VideoModel;
  @ViewChild('videoView') videoView?: ElementRef;
  mouseoverSubject: Subject<any> = new Subject<any>();
  mouseleaveSubject: Subject<any> = new Subject<any>();
  fullscreenchangeSubject: Subject<any> = new Subject<any>();
  videoPlayingSubject: Subject<any> = new Subject<any>();
  endedSubject: Subject<any> = new Subject<any>();
  constructor(private cd: ChangeDetectorRef, private videoStreamService: VideoStreamService, private fDialogService: FDialogService) {
    this.init();
    afterNextRender(() => {
      this.cd.markForCheck();
    });
  }
  init(): void {
    let defVolume = +getLocalStorage(FConstants.DEF_VOLUME)
    if (defVolume === 0 || defVolume > 1) {
      defVolume = 0.3;
      setLocalStorage(FConstants.DEF_VOLUME, "0.3");
    }
    this.volume = defVolume;
  }
  consoleLog: number = 0;
  setVideoSrc(videoModel: VideoModel): void {
    console.log(videoModel);
    if (this.videoModel?.thisIndex == videoModel.thisIndex) {
      return;
    }
    this.videoModel = videoModel;
    this.videoSrc = this.videoStreamService.getVideoResourceUrl(videoModel.thisIndex);
    this.cd.detectChanges();
//    this.videoStreamService.getVideoResource(videoModel.thisIndex).then(x => {
//      this.videoSrc = window.URL.createObjectURL(x.body);
//      this.cd.detectChanges();
//    }).catch(x => {
//      this.fDialogService.error('setVideoSrc catch', x.message);
//    })
//    this.cd.detectChanges();
  }
  mouseover(data: any): void {
    this.mouseoverSubject.next(data);
  }
  mouseleave(data: any): void {
    this.mouseleaveSubject.next(data);
  }
  fullscreenchange(data: any): void {
    this.fullscreenchangeSubject.next(data);
  }
  videoPlaying(data: any): void {
    this.videoPlayingSubject.next(data);
  }
  ended(data: any): void {
    this.endedSubject.next(data);
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
