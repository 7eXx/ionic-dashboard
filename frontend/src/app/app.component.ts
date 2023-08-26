import { Component } from '@angular/core';
import {logOut} from "ionicons/icons";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/dashboard/home', icon: 'home' },
    { title: 'Users', url: '/dashboard/users', icon: 'people' },
    { title: 'Items', url: '/dashboard/items', icon: 'pricetags' },
    { title: 'Notes', url: '/dashboard/notes', icon: 'documents' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}

  onLogout() {
    console.log("clicked logout");
  }

  protected readonly logOut = logOut;
}
