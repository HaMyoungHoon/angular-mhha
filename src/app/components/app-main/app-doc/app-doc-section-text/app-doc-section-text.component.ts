import {ChangeDetectionStrategy, Component, ElementRef, Input, numberAttribute} from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-app-doc-section-text',
  imports: [],
  templateUrl: './app-doc-section-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppDocSectionTextComponent {
  @Input() title: string;
  @Input() id: string;
  @Input({ transform: numberAttribute }) level: number;
  @Input() label: string;
  @Input() parentId: string;
  @Input() parentTitle: string;
  @Input() parentDescription: string;
  @Input() description: string;
  constructor(public location: Location, public el: ElementRef) {
    this.title = "";
    this.id = "";
    this.level = 0;
    this.label = "";
    this.parentId = "";
    this.parentTitle = "";
    this.parentDescription = "";
    this.description = "";
  }

  navigate(event: any): void {
    if (typeof window !== undefined) {
      const hash = window.location.hash.substring(1);
      const parentElement = event.currentTarget.parentElement;
      this.location.go(this.location.path().split('#')[0] + '#' + this.id);
      setTimeout(() => {
        parentElement.scrollInView({ block: 'start', behavior: 'smooth' });
      }, 1);
      hash === this.id && event.preventDefault();
    }
  }
}
