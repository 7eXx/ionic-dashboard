import {AuthEvent, SessionData} from "./auth.service";
import {BehaviorSubject, map, Observable, ReplaySubject} from "rxjs";
import {Injectable} from "@angular/core";

export interface SessionInfo {
    data: SessionData | null,
    authEvent: AuthEvent | null,
}

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    private session = new ReplaySubject<SessionInfo>(1);

    constructor() {
    }

    public pushSessionInfoAuthEvent(info: SessionData | null, authEvent: AuthEvent) {
        this.session.next({
            data: info,
            authEvent: authEvent
        });
    }

    public getSession(): Observable<SessionInfo> {
        return this.session.asObservable();
    }

    public getData(): Observable<SessionData | null> {
        return this.session.pipe(
            map((session) => session.data));
    }

    public getAuthEvent(): Observable<AuthEvent | null> {
        return this.session.pipe(
            map((session) => session.authEvent));
    }
}
