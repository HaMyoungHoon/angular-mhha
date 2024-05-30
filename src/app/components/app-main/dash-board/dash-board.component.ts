import { Component } from '@angular/core';
import {RestDocComponent} from "../app-doc/rest-doc/rest-doc.component";

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.scss'
})
export class DashBoardComponent {
  docs = [
    {
      id: 'rest',
      label: 'Rest',
      component: RestDocComponent
    }
  ]
}
