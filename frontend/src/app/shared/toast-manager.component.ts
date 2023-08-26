import {ToastController} from "@ionic/angular";

export class ToastManager {

   private static DURATION = 1500;

  constructor(private toastController: ToastController) {
  }

  public async showSavedSuccessfully() {
    const toast = await this.toastController.create({
      cssClass: 'success-toast',
      icon: 'checkmark-circle',
      message: 'Saved successfully',
      duration: ToastManager.DURATION,
      position: 'bottom',
    });

    await toast.present();
  }

  public async showDeleteSuccessfully() {
    const toast = await this.toastController.create({
      cssClass: 'danger-toast',
      icon: 'trash-bin',
      message: 'Deleted successfully',
      duration: ToastManager.DURATION,
      position: "bottom",
    });

    await toast.present();
  }

  public async showGenericError() {
    await this.showErrorWithMessage('Operation errors. Check logs.');
  }

  public async showErrorWithMessage(message: string) {
    const toast = await this.toastController.create({
      cssClass: 'danger-toast',
      icon: 'close-circle',
      message: message,
      duration: ToastManager.DURATION,
      position: "bottom",
    });

    await toast.present();
  }

}
