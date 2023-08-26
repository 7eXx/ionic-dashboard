import {Observable} from "rxjs";
import {User, UsersService} from "./users.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {create} from "ionicons/icons";
import {Injectable} from "@angular/core";

@Injectable()
export class UsersImplService extends UsersService {

    constructor(private httpClient: HttpClient) {
        super();
    }

    public override createNewUser(credentials: { email: string, password: string }): Observable<User> {
        return this.httpClient.post<User>(environment.url + '/users', credentials);
    }

    public override getUsers(): Observable<Array<User>> {
        return this.httpClient.get<Array<User>>(environment.url + '/users', {
            withCredentials: true
        });
    }
}
