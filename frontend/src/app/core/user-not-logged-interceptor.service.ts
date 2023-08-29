import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Inject, Injectable, Optional} from "@angular/core";
import {catchError, filter, last, map, Observable, switchMap, take, tap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {SessionService} from "./session.service";

@Injectable()
export class UserNotLoggedInterceptor implements HttpInterceptor {

  constructor(private router: Router, private sessionService: SessionService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        if (this.isErrorUserNotLogged(err)) {
          this.sessionService.pushSessionInfoAuthEvent(null, {type: 'INVALID_SESSION'});
          this.router.navigate(['/login']);
        }

        return throwError(() => err);
      }),
    );
  }

  private isErrorUserNotLogged(err: HttpErrorResponse) {
    return err.status === 401
      && err.error.errorMessage === 'User is not logged';
  }

}
