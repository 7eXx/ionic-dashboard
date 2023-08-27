import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {AlertController, ModalController, ToastController} from "@ionic/angular";
import {Note, NotesService} from "../../services/notes.service";
import {Subscription} from "rxjs";
import {NoteDetailComponent} from "./note-detail/note-detail.component";
import {ToastManager} from "../../shared/toast-manager.component";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit, OnDestroy {

  private toastManager: ToastManager

  notes: Array<Note> = [];
  notesSubscription?: Subscription;

  constructor(private  toastController: ToastController,
              private alertController: AlertController,
              private modalController: ModalController,
              private notesService: NotesService) {
    this.toastManager = new ToastManager(toastController);
  }

  ngOnInit() {
    this.subscribeNotes();
  }

  ngOnDestroy() {
    this.notes = [];
    this.unsubscribeNotes();
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

  async onAddNewNote() {
    const modal = await this.modalController.create({
      component: NoteDetailComponent,
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      await this.toastManager.showSavedSuccessfully();
      this.reload();
    }
  }

  async onDeleteItem(note: Note) {
    const alert = await this.alertController.create({
      header: 'Confirm operation',
      message: 'Proceed with the operation?',
      buttons: [{
        text: 'Ok',
        role: 'confirm',
        handler: () => {
          this.deleteNote(note);
        }
      }, {
        text: 'Cancel',
        role: 'cancel'
      }]
    });

    await alert.present();
  }

  private deleteNote(note: Note) {
    this.notesService.deleteNote(note._id).subscribe({
      next: () => {
        this.toastManager.showDeleteSuccessfully();
        this.reload();
      },
      error: (err) => {
        this.toastManager.showErrorWithMessage(err.error.errorMessage);
      }
    });
  }

  public onSaveSuccess() {
    this.toastManager.showSavedSuccessfully();
    this.reload();
  }
}
