import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ButtonModule} from "primeng/button";
import {FloatLabelModule} from "primeng/floatlabel";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {BokStatisticTableListRequest} from "../../../../../models/rest/bok/bok-statistic-table-list-request";
import {NgClass} from "@angular/common";

@Component({
  selector: "app-bok-table-search",
  standalone: true,
  imports: [
    ButtonModule,
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    NgClass
  ],
  templateUrl: "./bok-table-search.component.html",
  styleUrl: "./bok-table-search.component.scss"
})
export class BokTableSearchComponent {
  @Input() reqDataTable!: BokStatisticTableListRequest;
  @Input() reqDataItem!: BokStatisticTableListRequest;
  @Output() getTableEvent: EventEmitter<void>;
  constructor() {
    this.getTableEvent = new EventEmitter<void>();
  }

  getTableData(): void {
    this.getTableEvent.next();
  }

  set authKey(data: string) {
    this.reqDataTable.authKey = data;
    this.reqDataItem.authKey = data;
  }
  get authKey(): string {
    return this.reqDataTable.authKey;
  }
  set langType(data: string) {
    this.reqDataTable.langType = data;
    this.reqDataItem.langType = data;
  }
  get langType(): string {
    return this.reqDataTable.langType;
  }

  get authKeyClass(): string {
    if (this.reqDataTable.authKey.length <= 0) {
      return "ng-invalid";
    }

    return "";
  }
  get langTypeClass(): string {
    if (this.reqDataTable.langType.length <= 0) {
      return "ng-invalid";
    }

    return "";
  }
  get tableStartNumberClass(): string {
    if (this.reqDataTable.startNumber > this.reqDataTable.endNumber) {
      return "ng-invalid";
    }
    if (this.reqDataTable.startNumber.toString().length <= 0) {
      return "ng-invalid";
    }

    return "";
  }
  get tableEndNumberClass(): string {
    if (this.reqDataTable.endNumber < this.reqDataTable.startNumber) {
      return "ng-invalid";
    }
    if (this.reqDataTable.endNumber.toString().length <= 0) {
      return "ng-invalid";
    }

    return "";
  }
  get itemStartNumberClass(): string {
    if (this.reqDataItem.startNumber > this.reqDataItem.endNumber) {
      return "ng-invalid";
    }
    if (this.reqDataItem.startNumber.toString().length <= 0) {
      return "ng-invalid";
    }

    return "";
  }
  get itemEndNumberClass(): string {
    if (this.reqDataItem.endNumber < this.reqDataItem.startNumber) {
      return "ng-invalid";
    }
    if (this.reqDataItem.endNumber.toString().length <= 0) {
      return "ng-invalid";
    }

    return "";
  }
  get searchDisable(): boolean {
    if (this.reqDataTable.authKey.length <= 0) {
      return true;
    }
    if (this.reqDataTable.langType.length <= 0) {
      return true;
    }
    if (this.reqDataTable.startNumber > this.reqDataTable.endNumber) {
      return true;
    }
    if (this.reqDataTable.startNumber.toString().length <= 0) {
      return true;
    }
    if (this.reqDataTable.endNumber.toString().length <= 0) {
      return true;
    }

    return false;
  }
}
