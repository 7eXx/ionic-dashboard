import {Component, OnDestroy, OnInit} from '@angular/core';
import {User, UsersService} from "../../services/users.service";
import {Observable, Subscription} from "rxjs";
import {RegisterUserComponent} from "../../shared/register-user/register-user.component";
import {AlertController, ModalController, ToastController} from "@ionic/angular";
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
              private alertController: AlertController,
              private usersService: UsersService) {
    this.toastManager = new ToastManager(toastController);
    this.subscribeUsers();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.unsubscribeUsers();
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

  public reload() {
    this.unsubscribeUsers()
    this.subscribeUsers();
  }

  async onAddNewUser() {
    const modal = await this.modalController.create({
        component: RegisterUserComponent
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      await this.toastManager.showSavedSuccessfully();
      this.reload();
    }
  }

  async onToggleEnable(user: User) {
    const alert = await this.alertController.create({
      header: 'Confirm operation',
      message: 'Proceed with the operation?',
      buttons: [{
        text: 'Ok',
        role: 'confirm',
        handler: () => {
          this.sendUserStatus(user, !user.enabled);
        }
      }, {
        text: 'Cancel',
        role: 'cancel'
      }]
    });

    await alert.present();
  }

  private sendUserStatus(user: User, newStatusEnabled: boolean) {
    this.usersService.setUserStatus(user, !user.enabled).subscribe({
      next: (user) => {
        this.toastManager.showSavedSuccessfully();
        this.reload();
      },
      error: (err) => {
        this.toastManager.showErrorWithMessage(err.error.errorMessage)
      }
    });
  }
}
