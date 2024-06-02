import { Routes } from '@angular/router';
import * as FConstants from "./guards/f-constants";
import {LandingComponent} from "./components/landing/landing.component";
import {AppMainComponent} from "./components/app-main/app-main.component";

export const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: FConstants.MAIN_URL, component: AppMainComponent,
    children: [
      { path: FConstants.MAIN_URL, redirectTo: `${FConstants.MAIN_URL}/${FConstants.DASHBOARD_URL}`, pathMatch: 'full' },
      { path: FConstants.DASHBOARD_URL, loadChildren: () => import('./components/app-main/dash-board/dash-board.module').then((m) => m.DashBoardModule) },
      { path: FConstants.NOT_YET_URL, loadChildren: () => import('./components/app-main/not-yet/not-yet.module').then((m) => m.NotYetModule) },
      { path: '**', redirectTo: FConstants.NOT_YET_URL },
    ]
  },
  { path: FConstants.NOTFOUND_URL.slice(1), loadChildren: () => import('./components/notfound/notfound.module').then((m) => m.NotfoundModule) },
  { path: '**', redirectTo: FConstants.NOTFOUND_URL },
];
