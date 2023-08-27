import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import {HomeComponent} from "./home/home.component";
import {UsersComponent} from "./users/users.component";
import {ItemsComponent} from "./items/items.component";
import {NotesComponent} from "./notes/notes.component";
import {LayoutContainerComponent} from "./layout-container/layout-container.component";
import {NoteRecordComponent} from "./notes/note-record/note-record.component";
import {NoteDetailComponent} from "./notes/note-detail/note-detail.component";
import {ItemRecordComponent} from "./items/item-record/item-record.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    ReactiveFormsModule,
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
  ]
})
export class FolderPageModule {}
