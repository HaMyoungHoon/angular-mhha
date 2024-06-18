import {afterNextRender, ChangeDetectorRef, Component} from '@angular/core';
import {VideoStreamService} from "../../../../services/rest/video-stream.service";
import {FDialogService} from "../../../../services/common/f-dialog.service";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-video-test',
  templateUrl: './video-test.component.html',
  styleUrl: './video-test.component.scss'
})
export class VideoTestComponent {
  streamCount: number = 0;
  streamData: string = "";
  blobURl?: any
  constructor(private cd: ChangeDetectorRef, private videoStreamService: VideoStreamService, private fDialogService: FDialogService,
              private sanitizer: DomSanitizer) {
    this.init();
    afterNextRender(() => {
      this.cd.markForCheck();
    });
  }

  init(): void {
    this.videoStreamService.getVideoStream(1).then(x => {
      console.log(x);
//      const safeUrl = this.sanitizer.bypassSecurityTrustUrl(x);
//      console.log(safeUrl);
//      this.blobURl = safeUrl;
    }).catch(x => {
      console.log("getVideoStream catch");
      console.log(x);
    })
    return;
//    this.videoStreamService.getVideoByte(1).pipe().subscribe({
//      next: (event: HttpEvent<string>) => {
//        switch (event.type) {
//          case HttpEventType.Sent: {
//            console.log(`getVideoByte event type Sent`);
//            console.log(event);
//          }
//          break;
//          case HttpEventType.UploadProgress: {
//            console.log(`getVideoByte event type UploadProgress`);
//            console.log(event);
//          }
//          break;
//          case HttpEventType.ResponseHeader: {
//            console.log(`getVideoByte event type ResponseHeader`);
//            console.log(event);
//          }
//          break;
//          case HttpEventType.DownloadProgress: {
//            if (this.streamCount > 1) {
//              return;
//            }
//            this.streamCount++;
//            // @ts-ignore
////            this.streamData += event.partialText;
////            this.cd.detectChanges();
//            console.log("getVideoByte event type DownloadProgress");
//            console.log(event);
//          }
//          break;
//          case HttpEventType.Response: {
//            console.log("getVideoByte event type Response");
//            console.log(event);
//          }
//          break;
//          default: {
//            console.log(`getVideoByte event type ${event.type}`);
//            console.log(event);
//          }
//        }
//      },
//      error: (x) => {
//        console.log("getVideoByte catch");
//        console.log(x);
//      }
//    });
  }
}
