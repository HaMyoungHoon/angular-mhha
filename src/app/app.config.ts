import { ApplicationConfig } from "@angular/core";
import {provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling} from "@angular/router";

import { routes } from "./app.routes";
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {MessageService} from "primeng/api";
import {HttpRequestInterceptorService} from "./services/common/http-request-interceptor.service";
import {FDialogService} from "./services/common/f-dialog.service";
import {DialogService} from "primeng/dynamicdialog";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([HttpRequestInterceptorService])
    ),
    provideRouter(routes,
    withInMemoryScrolling({
      anchorScrolling: "enabled",
      scrollPositionRestoration: "enabled"
    }),
    withEnabledBlockingInitialNavigation()),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    MessageService,
    FDialogService,
    DialogService
  ]
};
