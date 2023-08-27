import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

export interface User {
  _id: string,
  email: string,
  creationDatetime: string;
  lastLoginDatetime: string,
  enabled: boolean;
}

@Injectable()
export abstract class UsersService {

  abstract createNewUser(credentials: { email: string, password: string }): Observable<User>;

  abstract getUsers(): Observable<User[]>;

  abstract setUserStatus(user: User, newStatusEnabled: boolean): Observable<User>;

  abstract getEnabledUsers(): Observable<User[]>;

  abstract getDisabledUsers(): Observable<User[]>;
}

