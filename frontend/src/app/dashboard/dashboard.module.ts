import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import {HomeComponent} from "./home/home.component";
import {UsersComponent} from "./users/users.component";
import {ItemsComponent} from "./items/items.component";
import {NotesComponent} from "./notes/notes.component";
import {LayoutContainerComponent} from "./layout-container/layout-container.component";
import {UserItemComponent} from "./users/user-item/user-item.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
  ],
  declarations: [
    LayoutContainerComponent,
    HomeComponent,
    UsersComponent,
    UserItemComponent,
    ItemsComponent,
    NotesComponent,
  ]
})
export class FolderPageModule {}
