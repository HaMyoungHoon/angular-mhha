import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {FloatLabelModule} from "primeng/floatlabel";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {BokStatisticTableListRequest} from "../../../../../models/rest/bok/bok-statistic-table-list-request";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-bok-table-search',
  standalone: true,
  imports: [
    ButtonModule,
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    NgClass
  ],
  templateUrl: './bok-table-search.component.html',
  styleUrl: './bok-table-search.component.scss'
})
export class BokTableSearchComponent {
  @Input() reqData!: BokStatisticTableListRequest;
  @Output() getTableEvent: EventEmitter<void>;
  constructor() {
    this.getTableEvent = new EventEmitter<void>();
  }

  getTableData(): void {
    this.getTableEvent.next();
  }

  get authKeyClass(): string {
    if (this.reqData.authKey.length <= 0) {
      return "ng-invalid";
    }

    return "";
  }
  get langTypeClass(): string {
    if (this.reqData.langType.length <= 0) {
      return "ng-invalid";
    }

    return "";
  }
  get startNumberClass(): string {
    if (this.reqData.startNumber > this.reqData.endNumber) {
      return "ng-invalid";
    }
    if (this.reqData.startNumber.toString().length <= 0) {
      return "ng-invalid";
    }

    return "";
  }
  get endNumberClass(): string {
    if (this.reqData.endNumber < this.reqData.startNumber) {
      return "ng-invalid";
    }
    if (this.reqData.endNumber.toString().length <= 0) {
      return "ng-invalid";
    }

    return "";
  }
  get searchDisable(): boolean {
    if (this.reqData.authKey.length <= 0) {
      return true;
    }
    if (this.reqData.langType.length <= 0) {
      return true;
    }
    if (this.reqData.startNumber > this.reqData.endNumber) {
      return true;
    }
    if (this.reqData.startNumber.toString().length <= 0) {
      return true;
    }
    if (this.reqData.endNumber.toString().length <= 0) {
      return true;
    }

    return false;
  }
}
