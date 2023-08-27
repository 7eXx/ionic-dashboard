import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {AngularEditorConfig} from "@kolkov/angular-editor";

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
    sanitize: false,
  };

  errorMessage = new BehaviorSubject<string | null>(null);

  itemForm!: FormGroup<any>;

  constructor() {
    this.setupForm();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.errorMessage.next(null);
  }

  private setupForm() {
    this.itemForm = new FormGroup<any>({
      title: new FormControl(''),
      content: new FormControl(''),
      link: new FormControl(''),
      published: new FormControl(false)
    });
  }

  public onSave() {
    console.log(this.itemForm.value);
  }
}
