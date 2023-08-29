import {catchError, map, Observable, of, ReplaySubject, share, Subject, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {SessionInfo, SessionService} from "./session.service";

export interface SessionData {
  _id: string;
  email: string;
  creationDatetime: string;
  enabled: boolean;
}

export interface AuthEvent {
  type: 'LOGIN_SUCCESS' | 'LOGIN_FAILURE' | 'LOGOUT' | 'VALID_SESSION' | 'INVALID_SESSION';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private sessionService: SessionService) {
    this.updateSessionInfo().subscribe();
  }

  public updateSessionInfo(): Observable<SessionData | null> {
    return this.updateSessionInfoAndEmit({ type: 'VALID_SESSION'} , { type: 'INVALID_SESSION'});
  }

  private updateSessionInfoAndEmit(successEvent: AuthEvent, failureEvent: AuthEvent): Observable<SessionData | null> {
    const request = this.httpClient.get<SessionData>(environment.url + '/users/me', {
      withCredentials: true
    });

    return request.pipe(
      tap((sessionData) => this.sessionService.pushSessionInfoAuthEvent(sessionData, successEvent)),
      catchError((error) => {
        // TODO: notify user eventually not valid session
        this.sessionService.pushSessionInfoAuthEvent(null, failureEvent);

        return of(null);
      })
    );
  }

  public login(credentials: { email: string; password: string }): Observable<SessionData | null> {
    const loginObservable = this.postLogin(credentials).pipe(
      share(),
      tap({
        next: (sessionInfo) => this.sessionService.pushSessionInfoAuthEvent(sessionInfo, {type: 'LOGIN_SUCCESS'}),
        error: (err) => this.sessionService.pushSessionInfoAuthEvent(null, {type: 'LOGIN_FAILURE'})
      })
    );

    return loginObservable;
  }

  private postLogin(loginData: { email: string, password: string }) {
    return this.httpClient.post<any>(
      environment.url + '/auth/login',
      loginData,
      {
        withCredentials: true,
      }
    );
  }

  public logout(): Observable<boolean> {
    return this.httpClient.get<any>(environment.url + '/auth/logout', {withCredentials: true}).pipe(
      map(() => true),
      tap(() => {
        this.sessionService.pushSessionInfoAuthEvent(null, {type: 'LOGOUT'});
      })
    );
  }
}
