import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

export interface User {
    id: string,
    email: string,
    creationDatetime: string;
    lastLoginDatetime: string,
}

@Injectable()
export abstract class UsersService {

    abstract createNewUser(credentials: { email: string, password: string }): Observable<User>;

    abstract getUsers(): Observable<Array<User>>;
}

