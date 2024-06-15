import { Routes } from '@angular/router';
import * as FConstants from "./guards/f-constants";
import {LandingComponent} from "./components/landing/landing.component";
import {AppMainComponent} from "./components/app-main/app-main.component";

export const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: FConstants.MAIN_URL, component: AppMainComponent,
    children: [
      { path: FConstants.MAIN_URL, redirectTo: `${FConstants.MAIN_URL}/${FConstants.DASHBOARD_URL}`, pathMatch: 'full' },
      { path: FConstants.DASHBOARD_URL, loadChildren: () => import('./components/app-main/dash-board/dash-board.module').then(m => m.DashBoardModule) },
      { path: FConstants.BOK_LIST_URL, loadChildren: () => import('./components/app-main/bok/bok-list/bok-list.module').then(m => m.BokListModule) },
      { path: FConstants.BOK_TEST_URL, loadChildren: () => import('./components/app-main/bok/bok-test/bok-test.module').then(m => m.BokTestModule) },
      { path: FConstants.ETC_QUILL_EDITOR_URL, loadChildren: () => import('./components/app-main/etc/quill-editor/quill-editor.module').then(m => m.QuillEditorModule) },
      { path: FConstants.ETC_QUILL_EDITOR_PUSH_URL, loadChildren: () => import('./components/app-main/etc/quill-editor-push/quill-editor-push.module').then(m => m.QuillEditorPushModule) },
      { path: FConstants.VIDEO_STREAM_URL, loadChildren: () => import('./components/app-main/video/video-stream/video-stream.module').then(m => m.VideoStreamModule) },
      { path: FConstants.VIDEO_RESOURCE_URL, loadChildren: () => import('./components/app-main/video/video-resource/video-resource.module').then(m => m.VideoResourceModule) },
      { path: FConstants.NOT_YET_URL, loadChildren: () => import('./components/app-main/not-yet/not-yet.module').then(m => m.NotYetModule) },
      { path: '**', redirectTo: FConstants.NOT_YET_URL },
    ]
  },
  { path: FConstants.NOTFOUND_URL.slice(1), loadChildren: () => import('./components/notfound/notfound.module').then(m => m.NotfoundModule) },
  { path: FConstants.API_SPRING.slice(1), loadChildren: () => import('./components/notfound/notfound.module').then(m => m.NotfoundModule) },
  { path: '**', redirectTo: FConstants.NOTFOUND_URL },
];
