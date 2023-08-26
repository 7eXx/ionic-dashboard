import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {ModalController} from "@ionic/angular";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent  implements OnInit, OnDestroy {

  registerForm!: FormGroup<any>;
  errorMessage = new BehaviorSubject<string | null>(null);

  constructor(
      private modalController: ModalController,
      private usersService: UsersService) {
    this.setupForm();
  }

  ngOnInit() {}

  ngOnDestroy() {
    // cleanup error
    this.errorMessage.next(null);
  }

  private setupForm() {
    this.registerForm = new FormGroup<any>({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
    });
  }

  public cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  public confirm() {
    return this.modalController.dismiss(null, 'confirm');
  }

  onSave() {
    if (!this.registerForm.valid) {
      this.errorMessage.next('Some fields are not valid!');
      return;
    }

    if (!this.isPasswordEquals()) {
      this.errorMessage.next('Confirm password do not match!');
      return;
    }

    this.usersService.createNewUser({
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }).subscribe({
      next: () => this.modalController.dismiss({ insertSuccess: true }, 'confirm'),
      error: (err: HttpErrorResponse) => {
        this.errorMessage.next(err.error.errorMessage)
      }
    });
  }

  private isPasswordEquals() {
    return this.registerForm.value.password === this.registerForm.value.confirmPassword;
  }
}
