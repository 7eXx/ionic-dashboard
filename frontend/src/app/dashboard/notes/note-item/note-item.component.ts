import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Note} from "../../../services/notes.service";
import {ModalController, ToastController} from "@ionic/angular";
import {NoteDetailComponent} from "../note-detail/note-detail.component";

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
})
export class NoteItemComponent {

  @Input() note!: Note;

  @Output() deleteEmitter = new EventEmitter();

  @Output() saveSuccessEmitter = new EventEmitter();

  constructor(private modalController: ModalController,
              private toastController: ToastController) {
  }

  public onDelete(event: Event) {
    event.stopPropagation();
    this.deleteEmitter.emit();
  }

  async onOpenNote() {
     const modal = await this.modalController.create({
      component: NoteDetailComponent,
        componentProps: {
        note: this.note,
        title: 'Edit note'
      }
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.saveSuccessEmitter.emit();
    }
  }
}
