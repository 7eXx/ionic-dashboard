import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {NotFoundComponent} from "./not-found/not-found.component";
import {RegisterUserComponent} from "./register-user/register-user.component";
import {UsersService} from "../services/users.service";
import {UsersImplService} from "../services/users-impl.service";
import {NotesService} from "../services/notes.service";
import {NotesImplService} from "../services/notes-impl.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  declarations: [
    NotFoundComponent,
    RegisterUserComponent,
  ],
  exports: [
    NotFoundComponent,
    RegisterUserComponent,
  ],
  providers: [
    {
      provide: UsersService,
      useClass: UsersImplService
    },
    {
      provide: NotesService,
      useClass: NotesImplService
    }
  ]
})
export class SharedModule {

}
