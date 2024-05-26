import { Routes } from '@angular/router';
import * as FConstants from "./guards/f-constants";
import {DashBoardComponent} from "./components/dash-board/dash-board.component";
import {LandingComponent} from "./components/landing/landing.component";

export const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: '', component: DashBoardComponent },
  { path: FConstants.NOTFOUND_URL.slice(1), loadChildren: () => import('./components/notfound/notfound.module').then((m) => m.NotfoundModule) },
  { path: '**', redirectTo: FConstants.NOTFOUND_URL },
];
