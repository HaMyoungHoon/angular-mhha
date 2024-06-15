import {afterNextRender, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {VideoStreamService} from "../../../../services/rest/video-stream.service";

@Component({
  selector: 'app-video-resource',
  templateUrl: './video-resource.component.html',
  styleUrl: './video-resource.component.scss'
})
export class VideoResourceComponent {
  videoSrc: string
  @ViewChild('video') video?: ElementRef
  constructor(private cd: ChangeDetectorRef, private videoStreamService: VideoStreamService) {
    this.videoSrc = ""
    this.init();
    afterNextRender(() => {
      this.cd.markForCheck();
//      if (this.video !== undefined) {
//        this.video.muted = false;
//      }
    });
  }

  init(): void {
    const thisIndex = Math.floor(Math.random() * 12 + 1)
    this.videoSrc = this.videoStreamService.getVideoResourceUrl(thisIndex);
  }
  controlList(): string {
    return "nodownload";
  }
}
