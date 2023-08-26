import {NgModule, Optional, SkipSelf} from "@angular/core";
import {AuthService} from "./auth.service";
import {throwIfAlreadyLoaded} from "./module-import-guard";
import {AuthImplService} from "./auth-impl.service";

@NgModule({
  providers: [
    {
      provide: AuthService,
      useClass: AuthImplService
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
