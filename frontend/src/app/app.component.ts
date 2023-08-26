import {Component, HostListener} from '@angular/core';
import {logOut} from "ionicons/icons";
import {AuthService} from "./core/auth.service";
import {map, Observable, of} from "rxjs";
import {NavigationStart, Router} from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private router: Router, private authService: AuthService) {
  }
}
