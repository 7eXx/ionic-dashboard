import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastManager} from "../../shared/toast-manager.component";
import {Item, ItemsService} from "../../services/items.service";
import {AlertController, ToastController} from "@ionic/angular";
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit, OnDestroy {

  private toastManager: ToastManager;

  items: Array<Item> = [];
  itemsSubscription?: Subscription;

  constructor(private toastController: ToastController,
              private alertController: AlertController,
              private itemsService: ItemsService) {
    this.toastManager = new ToastManager(toastController);
  }

  ngOnInit() {
    this.subscribeItems();
  }

  ngOnDestroy() {
    this.items = [];
    this.unsubscribeItems();
  }


  private subscribeItems() {
    this.unsubscribeItems();
    this.itemsSubscription = this.itemsService.getItems()
      .subscribe((items) => this.items = items);
  }

  private unsubscribeItems() {
    if (this.itemsSubscription) {
      this.itemsSubscription.unsubscribe();
    }
  }

  public reload() {
    this.unsubscribeItems();
    this.subscribeItems()
  }

  onAddItem() {

  }

  async onDeleteItem(item: Item) {
    const alert = await this.alertController.create({
      header: 'Warning',
      message: 'Are you sure to delete the item?',
      buttons: [{
        text: 'Ok',
        role: 'confirm',
        cssClass: 'primary',
        id: 'confirm-button',
        handler: () => this.delete(item)
      }, {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        id: 'cancel-button'
      }]
    });

    await alert.present();
  }

  private delete(item: Item) {
    this.itemsService.deleteItem(item._id).subscribe({
      next: () => {
        this.toastManager.showDeleteSuccessfully();
        this.reload();
      },
      error: (err: HttpErrorResponse) => {
        this.toastManager.showErrorWithMessage(err.error.errorMessage);
      }
    });
  }

  public onPublish(item: Item, newPublishStatus: boolean) {
    this.itemsService.setPublishStatus(item, newPublishStatus).subscribe({
      next: () => {
        this.toastManager.showSavedSuccessfully();
        this.reload();
      },
      error: (err: HttpErrorResponse) => {
        this.toastManager.showErrorWithMessage(err.error.errorMessage);
      }
    });
  }
}
