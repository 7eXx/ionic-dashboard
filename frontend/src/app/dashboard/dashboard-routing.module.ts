import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from "./home/home.component";
import {ItemsComponent} from "./items/items.component";
import {UsersComponent} from "./users/users.component";
import {NotesComponent} from "./notes/notes.component";
import {NotFoundComponent} from "../shared/not-found/not-found.component";
import {canActivateAuth} from "../core/auth.guard";
import {LayoutContainerComponent} from "./layout-container/layout-container.component";
import {ItemDetailsComponent} from "./items/item-details/item-details.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutContainerComponent,
    canActivate: [canActivateAuth],
    children: [
      {
        path: '',
        pathMatch: "full",
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'items',
        component: ItemsComponent,
      },
      {
        path: 'new-item',
        component: ItemDetailsComponent
      },
      {
        path: 'notes',
        component: NotesComponent,
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
