import { Component } from "@angular/core";
import {TableModule} from "primeng/table";
import {NgForOf} from "@angular/common";
import {TableDialogColumn} from "../../../models/common/table-dialog-column";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ButtonModule} from "primeng/button";

@Component({
  selector: "app-table-dialog",
  standalone: true,
  imports: [
    TableModule,
    NgForOf,
    ButtonModule
  ],
  templateUrl: "./table-dialog.component.html",
  styleUrl: "./table-dialog.component.scss"
})
export class TableDialogComponent {
  cols: TableDialogColumn[];
  data: any[];
  selectedData: any;

  constructor(private ref: DynamicDialogRef, private dialogService: DialogService) {
    const dlg = this.dialogService.getInstance(ref);
    this.cols = dlg.data.cols;
    this.data = dlg.data.tableData;
  }

  ellipsis(data: string): string {
    if (data.length > 20) {
      return data.substring(0, 20) + "...";
    }

    return data;
  }
  select(): void {
    this.ref.close(this.selectedData);
  }
  selectChange(): void {
  }
  get disableSelect(): boolean {
    if (this.selectedData === undefined) {
      return true;
    }

    return false;
  }
}
