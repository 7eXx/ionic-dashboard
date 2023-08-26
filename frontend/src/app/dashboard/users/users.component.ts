import {Component, OnDestroy, OnInit} from '@angular/core';
import {User, UsersService} from "../../services/users.service";
import {Observable, Subscription} from "rxjs";
import {RegisterUserComponent} from "../../shared/register-user/register-user.component";
import {ModalController, ToastController} from "@ionic/angular";
import {ToastManager} from "../../shared/toast-manager.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent  implements OnInit, OnDestroy {

  toastManager: ToastManager;

  users: Array<User> = [];
  usersSubscription?: Subscription;

  constructor(private modalController: ModalController,
              private toastController: ToastController,
              private usersService: UsersService) {
    this.toastManager = new ToastManager(toastController);
    this.subscribeUsers();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.unsubscribeAll();
  }

  private subscribeUsers() {
    this.unsubscribeUsers();
    this.usersSubscription = this.usersService.getUsers()
        .subscribe((users) => this.users = users);
  }

  private unsubscribeUsers() {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }

  private unsubscribeAll() {
    this.unsubscribeUsers()
  }

  public refresh(ev: any) {
    this.unsubscribeAll()
    this.subscribeUsers();
  }

  async onAddNewUser() {
    const modal = await this.modalController.create({
        component: RegisterUserComponent
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.toastManager.showSavedSuccessfully();
      this.refresh({});
    }
  }

  public onToggleEnable(user: User) {
    this.usersService.setUserStatus(user, !user.enabled).subscribe({
      next: (user) => {
        this.refresh({});
      },
      error: (err) => {
        this.toastManager.showErrorWithMessage(err.error.errorMessage)
      }
    });
  }
}
