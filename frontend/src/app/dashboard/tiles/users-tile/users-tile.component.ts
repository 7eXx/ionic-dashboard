import {Component, OnDestroy, OnInit} from '@angular/core';
import {User, UsersService} from "../../../services/users.service";
import {filter, map, Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-users-tile',
  templateUrl: './users-tile.component.html',
  styleUrls: ['./users-tile.component.scss'],
})
export class UsersTileComponent  implements OnInit, OnDestroy {

  title = 'Users';

  users: User[] = [];

  enabledUsers: User[] = [];
  disabledUsers: User[] = [];

  usersSubscription!: Subscription;

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.subscribeUsers();
  }

  ngOnDestroy() {
    this.unsubscribeUsers();
  }

  private subscribeUsers() {
    this.unsubscribeUsers();
    this.usersSubscription = this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.enabledUsers = users.filter((user) => user.enabled);
        this.disabledUsers = users.filter((user) => !user.enabled)
      },
      error: (err) => console.error(err),
    });
  }

  private unsubscribeUsers() {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }
}
