import { Component, OnInit } from '@angular/core';
import {User, UsersService} from "../../../services/users.service";
import {filter, map, Observable} from "rxjs";

@Component({
  selector: 'app-users-tile',
  templateUrl: './users-tile.component.html',
  styleUrls: ['./users-tile.component.scss'],
})
export class UsersTileComponent  implements OnInit {

  title = 'Users';

  usersObs!: Observable<User[]>;

  enabledUsersObs!: Observable<User[]>;
  disabledUsersObs!: Observable<User[]>;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersObs = this.usersService.getUsers();
    this.enabledUsersObs = this.extractUsersByState(this.usersObs, true);
    this.disabledUsersObs = this.extractUsersByState(this.usersObs, false);
  }

  private extractUsersByState(users: Observable<User[]>, enableState: boolean) {
    return users.pipe(
      map((users) => users.filter((user) => user.enabled === enableState))
    )
  }
}
