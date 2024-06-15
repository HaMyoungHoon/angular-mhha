import {afterNextRender, ChangeDetectorRef, Component} from '@angular/core';
import {VideoStreamService} from "../../../../services/rest/video-stream.service";

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrl: './video-stream.component.scss'
})
export class VideoStreamComponent {
  videoSrc: string
  constructor(private cd: ChangeDetectorRef, private videoStreamService: VideoStreamService) {
    this.videoSrc = ""
    afterNextRender(() => {
      this.cd.markForCheck();
      this.init();
    });
  }

  init(): void {
    const thisIndex = Math.floor(Math.random() * 12 + 1)
    this.videoSrc = this.videoStreamService.getVideoStreamUrl(thisIndex);
  }
  controlList(): string {
    return "nodownload";
  }
}
