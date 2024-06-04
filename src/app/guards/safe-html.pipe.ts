import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'safeHtml',
  standalone: true
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(html: string | undefined): any {
    if (html === undefined) {
      return null;
    }
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
