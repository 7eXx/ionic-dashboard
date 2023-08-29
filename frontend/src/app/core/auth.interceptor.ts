import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Inject, Injectable, Optional} from "@angular/core";
import {map, Observable, switchMap, take, tap} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService) {
    console.log('interceptor constructor');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      //take(1),
      tap({
        next: (res) => {
          console.log(res);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          /*
          if (this.isErrorUserNotLogged(err) && !err.url?.includes('login')) {
            this.router.navigate(['/login']);
          }

           */
        }
      })
    );
  }

  private isErrorUserNotLogged(err: HttpErrorResponse) {
    return err.status === 401
      && err.error.errorMessage === 'User is not logged';
  }

}
