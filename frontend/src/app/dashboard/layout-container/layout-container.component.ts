import {Component} from "@angular/core";
import {AuthService, SessionData} from "../../core/auth.service";
import {Router} from "@angular/router";
import {User} from "../../services/users.service";
import {Observable} from "rxjs";
import {MenuController} from "@ionic/angular";
import {SessionService} from "../../core/session.service";

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

  sessionData!: Observable<SessionData | null>;

  constructor(private router: Router,
              private session: SessionService,
              private menuController: MenuController) {
    this.sessionData = this.session.getData();
  }

  public onLogout() {
    this.router.navigate(['/logout']);
  }
}
