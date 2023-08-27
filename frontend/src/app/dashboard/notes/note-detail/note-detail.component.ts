import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from "@angular/core";
import {IonContent, ModalController} from "@ionic/angular";
import {Note, NotesService} from "../../../services/notes.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NoteModel} from "../../../datastructure/note.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-note-detail',
  templateUrl: 'note-detail.component.html'
})
export class NoteDetailComponent implements OnInit, AfterViewInit, OnDestroy {

  defaultColor = '#9a9a9a';

  note: Note | null = null;
  title = 'New note';

  errorMessage = new BehaviorSubject<string | null>(null);

  noteForm!: FormGroup<any>;

  @ViewChild('content', { static: true  }) contentDiv!: ElementRef;

  formChangesSubscription!: Subscription;

  constructor(private modalController: ModalController,
              private notesService: NotesService,
              private renderer: Renderer2) {
    this.setupForm();
    this.subscribeFormChanges();
  }

  ngOnInit() {
    if (this.note) {
      this.fillForm(this.note);
    }
  }

  ngAfterViewInit() {
    const color = this.noteForm.value.color;
    this.setBackgroundColor(color);
  }

  ngOnDestroy() {
    this.unsubscribeFormChanges();
    this.errorMessage.next(null);
  }

  private setupForm() {
    this.noteForm = new FormGroup<any>({
      title: new FormControl(''),
      description: new FormControl(''),
      color: new FormControl(this.defaultColor)
    });
  }

  private subscribeFormChanges() {
    this.formChangesSubscription = this.noteForm.valueChanges.subscribe({
      next: (value) => {
        const color = value.color;
        this.setBackgroundColor(color);
      }
    })
  }

  private unsubscribeFormChanges() {
    if (this.formChangesSubscription) {
      this.formChangesSubscription.unsubscribe();
    }
  }

  private fillForm(note: Note) {
    this.noteForm.patchValue({
      title: note.title,
      description: note.description,
      color: note.color
    });
  }

  private setBackgroundColor(color: string) {
    this.renderer.setStyle(this.contentDiv.nativeElement, 'background', color);
  }

  public onCancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  public onSave() {
    const note = this.noteForm.value as NoteModel;
    if (this.isInsertOperation()) {
      this.notesService.createNewNote(note).subscribe({
        next: () => {
          return this.modalController.dismiss(null, 'confirm');
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage.next(err.error.errorMessage);
        }
      });
      return;
    }

    this.notesService.updateNote(this.note!._id, note).subscribe({
      next: () => {
        return this.modalController.dismiss(null, 'confirm');
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage.next(err.error.errorMessage);
      }
    });
  }

  public isInsertOperation() {
    return !this.note;
  }
}
