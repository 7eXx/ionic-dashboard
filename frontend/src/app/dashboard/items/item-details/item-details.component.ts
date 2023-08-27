import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {ItemsService} from "../../../services/items.service";
import {ItemModel} from "../../datastructure.model";
import {ToastController} from "@ionic/angular";
import {ToastManager} from "../../../shared/toast-manager.component";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent  implements OnInit, OnDestroy {

  title = 'New item';
  editorConfig: AngularEditorConfig = {
    editable: true,
    height: '300px',
    minHeight: '200px',
    maxHeight: '600px',
    width: 'auto',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    sanitize: true,
  };

  toastManager: ToastManager;

  errorMessage = new BehaviorSubject<string | null>(null);

  itemForm!: FormGroup<any>;

  constructor(private router: Router,
              private toastController: ToastController,
              private itemsService: ItemsService) {
    this.toastManager = new ToastManager(toastController);

  }

  ngOnInit() {
    this.setupForm();
  }

  ngOnDestroy() {
    this.errorMessage.next(null);
  }

  private setupForm() {
    this.itemForm = new FormGroup<any>({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      link: new FormControl(''),
      published: new FormControl(false)
    });
  }

  public onSave() {
    if (!this.itemForm.valid) {
      this.toastManager.showErrorWithMessage('Some fields are not valid');
      return;
    }

    const item = this.itemForm.value as ItemModel;
    this.itemsService.createNewItem(item).subscribe({
      next: () => {
        this.toastManager.showSavedSuccessfully();
        this.setupForm();
        this.router.navigate(['dashboard', 'items']);
      },
      error: (err: HttpErrorResponse) => {
        this.toastManager.showErrorWithMessage(err.error.errorMessage);
      }
    });
  }
}
