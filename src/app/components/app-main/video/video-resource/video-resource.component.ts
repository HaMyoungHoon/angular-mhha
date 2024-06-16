import {afterNextRender, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {VideoStreamService} from "../../../../services/rest/video-stream.service";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import {FDialogService} from "../../../../services/common/f-dialog.service";
import {VideoModel} from "../../../../models/rest/file/video/video-model";
import {getLocalStorage, setLocalStorage} from "../../../../guards/amhohwa";
import * as FConstants from "../../../../guards/f-constants";
import {debounceTime, Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-video-resource',
  templateUrl: './video-resource.component.html',
  styleUrl: './video-resource.component.scss'
})
export class VideoResourceComponent {
  volume: number = 0.3;
  videoSrc: string = "";
  @ViewChild('videoView') videoView?: ElementRef
  selectedVideoModel?: VideoModel
  prevVideoModel?: VideoModel;
  videoModels?: VideoModel[];
  videoModelDisable: boolean = false;
  consoleLog: number = 0;
  searchLoading: boolean = false;
  searchValue: string = "";
  modelChanged: Subject<string> = new Subject<string>();
  subscription?: Subscription;
  debounceTime: number = 1000;
  constructor(private cd: ChangeDetectorRef, private videoStreamService: VideoStreamService, private fDialogService: FDialogService) {
    this.init();
    afterNextRender(() => {
      this.cd.markForCheck();
//      if (this.video !== undefined) {
//        this.video.muted = false;
//      }
    });
  }

  init(): void {
    this.initVolume();
    this.initSearch();
    this.videoStreamService.getVideoList().then(x => {
      if (x.result) {
        const videoModels = x.data;
        if (videoModels === undefined) {
          return;
        }
        this.selectedVideoModel = videoModels[Math.floor(Math.random() * videoModels.length + 1)];
        this.videoSrc = this.videoStreamService.getVideoResourceUrl(this.selectedVideoModel.thisIndex);
        return;
      }
      this.fDialogService.warn('init', x.msg);
    }).catch(x => {
      this.fDialogService.error('init catch', x.message);
    });
  }
  initVolume(): void {
    let defVolume = +getLocalStorage(FConstants.DEF_VOLUME)
    if (defVolume === 0 || defVolume > 1) {
      defVolume = 0.3;
      setLocalStorage(FConstants.DEF_VOLUME, "0.3");
    }
    this.volume = defVolume;
  }
  initSearch(): void {
    this.subscription = this.modelChanged.pipe(debounceTime(this.debounceTime))
      .subscribe((x) => {
        this.searchLoading = false;
        this.searchVideo();
      });
  }
  get videoViewContainerStyle(): string {
    if (this.videoModels && this.videoModels.length > 0) {
      return "video-view-container-active";
    }
    return "video-view-container";
  }
  get videoListContainerStyle(): string {
    if (this.videoModels && this.videoModels.length > 0) {
      return "video-list-container-active";
    }
    return "video-list-container";
  }
  controlList(): string {
    return "nodownload";
  }
  get searchStyle(): string {
    if (this.searchLoading) return "pi pi-spinner pi-spin";
    else return "pi pi-search";
  }
  videoPlaying(data: any): void {
  }
  volumechange(data: any): void {
    let volume = Math.floor(this.videoView?.nativeElement.volume * 100000) / 100000;
    if (volume > 1) {
      volume = 0.3;
    }
    setLocalStorage(FConstants.DEF_VOLUME, volume.toString());
  }
  searchChange(data: any): void {
    this.searchLoading = true;
    this.modelChanged.next(data);
  }
  searchVideo(): void {
    if (this.searchValue.length <= 0) {
      this.videoModels = [];
      return;
    }
    this.videoModelDisable = true;
    this.videoStreamService.getVideoSearch(this.searchValue).then(x => {
      this.videoModelDisable = false;
      this.videoModels = x.data;
      if (!x.result) {
        this.fDialogService.warn('search', x.msg);
      }
    }).catch(x => {
      this.videoModelDisable = false;
      this.fDialogService.error('search catch', x.message);
    });
  }
  selectVideoModel(data: any): void {
    if (this.selectedVideoModel === undefined) {
      this.selectedVideoModel = this.prevVideoModel;
    }

    this.prevVideoModel = this.selectedVideoModel;
    if (this.selectedVideoModel) {
      this.getVideoRequest();
    }
  }

  getVideoRequest(): void {
    if (this.selectedVideoModel === undefined) {
      return;
    }
    this.videoSrc = this.videoStreamService.getVideoResourceUrl(this.selectedVideoModel.thisIndex);
    return;
    this.videoStreamService.getVideoResource(this.selectedVideoModel?.thisIndex ?? 1).subscribe({
      next: (event: HttpEvent<string>) => {
        switch (event.type) {
          case HttpEventType.DownloadProgress: {
            if (this.consoleLog > 10) {
              return;
            }
            this.consoleLog++;
            console.log(event);
          }
            break;
          case HttpEventType.Response: {
            console.log(event);
          }
            break;
          default: {
            console.log(event);
          }
        }
      },
      error: (x) => {
        console.log(x);
      }
    });
  }
}
