import {catchError, map, Observable, of, ReplaySubject, Subject, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

export interface SessionInfo {
  _id: string;
  email: string;
  creationDatetime: string;
  enabled: boolean;
}

export interface AuthEvent {
  type: 'LOGIN_SUCCESS' | 'LOGIN_FAILURE' | 'LOGOUT' | 'VALID_SESSION' | 'INVALID_SESSION';
}

@Injectable()
export class AuthService {

  private sessionInfo = new ReplaySubject<SessionInfo | null>(1);
  private authEvents = new Subject<AuthEvent | null>();

  constructor(private httpClient: HttpClient) {
    console.log('AuthService constructor');
    this.updateSessionInfo().subscribe();
  }

  public updateSessionInfo(): Observable<SessionInfo | null> {
    return this.updateSessionInfoAndEmit({ type: 'VALID_SESSION'} , { type: 'INVALID_SESSION'});
  }

  private updateSessionInfoAndEmit(successEvent: AuthEvent, failureEvent: AuthEvent) {
    const request = this.httpClient.get<SessionInfo>(environment.url + '/users/me', {
      withCredentials: true
    });

    return request.pipe(
      tap((sessionInfo) => this.setSessionInfoAndEmit(sessionInfo, successEvent)),
      catchError((error) => {
        // TODO: notify user eventually not valid session
        this.setSessionInfoAndEmit(null, failureEvent);

        return of(null);
      })
    );
  }

  public getSessionInfo(): Observable<SessionInfo | null> {
    return this.sessionInfo.asObservable();
  }

  public getAuthEvents(): Observable<AuthEvent | null> {
    return this.authEvents.asObservable();
  }

  public login(credentials: { email: string; password: string }): Observable<SessionInfo | null> {
    const loginObservable = this.postLogin(credentials).pipe(
      //share(),
      tap({
        next: (sessionInfo) => this.setSessionInfoAndEmit(sessionInfo, {type: 'LOGIN_SUCCESS'}),
        error: (err) => this.setSessionInfoAndEmit(null, {type: 'LOGIN_FAILURE'})
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

  private setSessionInfoAndEmit(sessionInfo: SessionInfo | null, authEvent: AuthEvent) {
    this.sessionInfo.next(sessionInfo);
    this.authEvents.next(authEvent);
  }

  public logout(): Observable<boolean> {
    return this.httpClient.get<any>(environment.url + '/auth/logout', {withCredentials: true}).pipe(
      map(() => true),
      tap(() => {
        this.setSessionInfoAndEmit(null, {type: 'LOGOUT'});
      })
    );
  }
}
