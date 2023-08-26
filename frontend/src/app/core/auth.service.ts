import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

export interface SessionInfo {
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
export abstract class AuthService {

  abstract getSessionInfo(): Observable<SessionInfo | null>;

  abstract getAuthEvents(): Observable<AuthEvent | null>;

  abstract login(credentials: { email: string, password: string }): Observable<SessionInfo | null>;

  abstract logout(): Observable<boolean>;
}
