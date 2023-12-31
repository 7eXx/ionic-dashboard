import {Component, Host, OnDestroy, OnInit, Optional} from '@angular/core';
import {AuthService} from "../core/auth.service";
import {BehaviorSubject, filter, map, Observable, Subscription, switchMap} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ModalController, ToastController} from "@ionic/angular";
import {RegisterUserComponent} from "../shared/register-user/register-user.component";
import {ToastManager} from "../shared/toast-manager.component";
import {SessionService} from "../core/session.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit, OnDestroy {

  toastManager: ToastManager;

  isLoginFailed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loginForm!: FormGroup<any>;
  private loginSubscription!: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private sessionService: SessionService,
              private modalController: ModalController,
              private toastController: ToastController) {
    this.toastManager = new ToastManager(toastController);
    this.setupLoginSubscription();
    this.setupForm();
  }

  ngOnInit() {
  }

  private setupForm() {
    this.loginForm = new FormGroup<any>({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  ngOnDestroy() {
    this.isLoginFailed.next(false);
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  private setupLoginSubscription() {
    this.loginSubscription = this.sessionService.getData().pipe(
      filter((userData) => userData != null),
      switchMap(() => this.route.queryParams),
      map((params) => this.redirectUrl(params))
    ).subscribe((redirectUrl) => {
      this.router.navigateByUrl(redirectUrl);
    });
  }

  public onLogin() {
    this.submitCredentials().subscribe({
      next: (isCredentialValid) => {
        if (!isCredentialValid) {
          this.isLoginFailed.next(true);
        }
        this.setupForm();
        this.isLoginFailed.next(false);
      },
      error: () => {
        this.isLoginFailed.next(true);
      }
    });
  }

  private submitCredentials(): Observable<boolean> {
    return this.authService.login(this.loginForm.value).pipe(
      map((sessionInfo) => sessionInfo !== null)
    );
  }

  private redirectUrl(params: Params) {
    return params['redirectAfterLogin'] || '/dashboard/home';
  }

  async onRegisterUserModal() {
    this.setupForm();
    this.isLoginFailed.next(false);

    const modal = await this.modalController.create({
        component: RegisterUserComponent
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.toastManager.showSavedSuccessfully();
    }
  }
}
