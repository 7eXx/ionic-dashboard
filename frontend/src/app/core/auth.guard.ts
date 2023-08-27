import {inject, Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root',
})
class AuthGuard {

  private isLoggedIn!: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.computeLogin();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.enforceLoginToAccess(state.url);
  }

  private computeLogin() {
    this.isLoggedIn = this.authService.getSessionInfo().pipe(
      map((sessionInfo) => sessionInfo !== null));
  }

  private enforceLoginToAccess(url: string): Observable<boolean | UrlTree> {
    return this.isLoggedIn.pipe(map((isLoggedIn) => {
      return isLoggedIn ? true : this.createRedirectUrlTree(url);
    }));
  }

  private createRedirectUrlTree(url: string) {
    const redirect = url === '/logout' ? '' : url;
    return this.router.createUrlTree(['/login'], {queryParams: {redirectAfterLogin: redirect}});
  }
}

export const canActivateAuth: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(AuthGuard).canActivate(route, state);
};
