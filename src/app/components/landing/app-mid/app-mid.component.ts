import {Component, EventEmitter, Output} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {DASHBOARD_URL} from "../../../guards/f-constants";
import {ButtonModule} from "primeng/button";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-app-mid',
  standalone: true,
  imports: [
    RouterLink,
    ButtonModule,
    NgIf
  ],
  templateUrl: './app-mid.component.html'
})
export class AppMidComponent {
  @Output() messageEvent = new EventEmitter<{severity: string, summary: string, detail: string}>();
  protected readonly DASHBOARD_URL = DASHBOARD_URL;
  constructor(private router: Router) {
  }

  notYetLink() {
    this.messageEvent.emit({
      severity: 'warn',
      summary: 'href',
      detail: '아직 안만듦'
    });
  }
}
