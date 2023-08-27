import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../core/auth.service";
import {MenuController, ToastController} from "@ionic/angular";
import {ToastManager} from "../shared/toast-manager.component";

@Component({
    template: ''
})
export class LogoutComponent implements OnInit {

    toastManager: ToastManager;

    constructor(private router: Router,
                private authService: AuthService,
                private menuController: MenuController,
                private toastController: ToastController) {
        this.toastManager = new ToastManager(toastController);
    }

    ngOnInit() {
        this.menuController.close();
        this.authService.logout().subscribe({
            next: () => this.router.navigate(['/login']),
            error: (err) => console.error(err)
        });
    }
}
