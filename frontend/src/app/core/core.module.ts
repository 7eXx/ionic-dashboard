import {NgModule, Optional, Provider, SkipSelf} from "@angular/core";
import {throwIfAlreadyLoaded} from "./module-import-guard";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {UserNotLoggedInterceptor} from "./user-not-logged-interceptor.service";
import {AuthService} from "./auth.service";

const httpInterceptorProviders: Provider[] = [{
  provide: HTTP_INTERCEPTORS,
  useClass: UserNotLoggedInterceptor,
  multi: true
}];

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    httpInterceptorProviders
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}


