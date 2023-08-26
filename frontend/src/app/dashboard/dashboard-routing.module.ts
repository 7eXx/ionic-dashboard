import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from "./home/home.component";
import {ItemsComponent} from "./items/items.component";
import {UsersComponent} from "./users/users.component";
import {NotesComponent} from "./notes/notes.component";
import {NotFoundComponent} from "../shared/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'items',
    component: ItemsComponent
  },
  {
    path: 'notes',
    component: NotesComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
