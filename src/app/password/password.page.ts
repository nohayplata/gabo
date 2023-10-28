import { Component } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ValidarService } from '../validar.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage {
  email: string = "";
  nuevaContrasena: string = "";

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router,
    private validarService: ValidarService
  ) {}

  async mostrarMensajeExito(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
    this.router.navigate(['/login']);
  }

  async mostrarMensajeError(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'middle',
    });
    await toast.present();
  }

  async cambiarContrasena() {
    // Verifica si el email y la nueva contraseña no están vacíos
    if (this.email.trim() === '' || this.nuevaContrasena.trim() === '') {
      this.mostrarMensajeError('Por favor, ingresa un correo electrónico y una nueva contraseña.');
      return;
    }
    if (this.nuevaContrasena.length < 6) {
      this.mostrarMensajeError('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }
    this.validarService.changePasswordProfe(this.email, this.nuevaContrasena).subscribe(
      () => {
        this.mostrarAlertaRedireccion();
        setTimeout(() => {
          this.alertController.dismiss();
          this.mostrarMensajeExito('Contraseña cambiada con éxito.');
        }, 3000);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 6000);
      },
      error => {
        // Error al cambiar la contraseña
        console.error('Error al cambiar la contraseña', error);
        this.mostrarMensajeError('Error inesperado. Por favor, inténtalo de nuevo.');
      }
    );
  }
  
  async mostrarAlertaRedireccion() {
    const alert = await this.alertController.create({
      header: 'Su solicitud está en progreso....',
      message: 'Por favor, espere mientras lo redirigimos...',
      backdropDismiss: false,
      animated: true,
    });
  
    await alert.present();
  }
  
}






