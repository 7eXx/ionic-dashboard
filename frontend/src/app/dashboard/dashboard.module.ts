import {NgModule, Provider} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardRoutingModule } from './dashboard-routing.module';

import {HomeComponent} from "./home/home.component";
import {UsersComponent} from "./users/users.component";
import {ItemsComponent} from "./items/items.component";
import {NotesComponent} from "./notes/notes.component";
import {LayoutContainerComponent} from "./layout-container/layout-container.component";
import {NoteRecordComponent} from "./notes/note-record/note-record.component";
import {NoteDetailComponent} from "./notes/note-detail/note-detail.component";
import {ItemRecordComponent} from "./items/item-record/item-record.component";
import {ItemDetailsComponent} from "./items/item-details/item-details.component";
import {AngularEditorModule} from "@kolkov/angular-editor";
import {UsersTileComponent} from "./tiles/users-tile/users-tile.component";
import {ItemsTileComponent} from "./tiles/items-tile/items-tile.component";
import {NotesTileComponent} from "./tiles/notes-tile/notes-tile.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DashboardRoutingModule,
    AngularEditorModule
  ],
  declarations: [
    LayoutContainerComponent,
    HomeComponent,
    UsersComponent,
    NotesComponent,
    NoteRecordComponent,
    NoteDetailComponent,
    ItemsComponent,
    ItemRecordComponent,
    ItemDetailsComponent,
    UsersTileComponent,
    ItemsTileComponent,
    NotesTileComponent
  ],
  providers: []
})
export class DashboardModule {}
