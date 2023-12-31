import {map, Observable} from "rxjs";
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

  public override setUserStatus(user: User, newStatusEnabled: boolean) {
    return this.httpClient.put<User>(environment.url + '/users/status', {
      id: user._id,
      enabled: newStatusEnabled
    }, {
      withCredentials: true
    });
  }

  public override getEnabledUsers(): Observable<User[]> {
    return this.extractUsersByState(true);
  }

  public override getDisabledUsers(): Observable<any> {
    return this.extractUsersByState(false)
  }

  private extractUsersByState(enableState: boolean) {
    return this.getUsers().pipe(
      map((users) => users.filter((user) => user.enabled === enableState))
    )
  }
}
