import { Component, OnInit } from '@angular/core';
import {Note, NotesService} from "../../../services/notes.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {NoteDetailComponent} from "../../notes/note-detail/note-detail.component";
import {ModalController, ToastController} from "@ionic/angular";
import {ToastManager} from "../../../shared/toast-manager.component";

@Component({
  selector: 'app-notes-tile',
  templateUrl: './notes-tile.component.html',
  styleUrls: ['./notes-tile.component.scss'],
})
export class NotesTileComponent  implements OnInit {

  toastManager: ToastManager;

  title = 'Notes';

  notes: Note[] = [];
  notesSubscription!: Subscription;

  constructor(private modalController: ModalController,
              private toastController: ToastController,
              private notesService: NotesService,
              private router: Router) {
    this.toastManager = new ToastManager(toastController);
  }

  ngOnInit() {
    this.subscribeNotes();
  }

  private subscribeNotes() {
    this.unsubscribeNotes();
    this.notesSubscription = this.notesService.getNotes()
      .subscribe((notes) => this.notes = notes);
  }

  private unsubscribeNotes() {
    if (this.notesSubscription) {
      this.notesSubscription.unsubscribe();
    }
  }

  public reload() {
    this.unsubscribeNotes();
    this.subscribeNotes();
  }

  onClickTile() {
    this.router.navigate(['dashboard', 'notes']);
  }

  async onAddNote($event: Event) {
    $event.stopPropagation();
    const modal = await this.modalController.create({
      component: NoteDetailComponent,
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      await this.toastManager.showSavedSuccessfully()
      this.reload();
    }
  }

}
