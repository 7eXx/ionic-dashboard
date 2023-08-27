import {Component} from "@angular/core";
import {AuthService, SessionInfo} from "../../core/auth.service";
import {Router} from "@angular/router";
import {User} from "../../services/users.service";
import {Observable} from "rxjs";
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-layout-container',
  templateUrl: './layout-container.component.html',
  styleUrls: ['./layout-container.component.scss']
})
export class LayoutContainerComponent {

  public appPages = [
    { title: 'Home', url: '/dashboard/home', icon: 'home' },
    { title: 'Users', url: '/dashboard/users', icon: 'people' },
    { title: 'Items', url: '/dashboard/items', icon: 'pricetags' },
    { title: 'Notes', url: '/dashboard/notes', icon: 'documents' }
  ];

  sessionInfo!: Observable<SessionInfo | null>;

  constructor(private router: Router,
              private authService: AuthService,
              private menuController: MenuController) {
    this.sessionInfo = this.authService.getSessionInfo();
  }

  public onLogout() {
    this.router.navigate(['/logout']);
  }
}
