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
  tipoUsuario: string = "";


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

  //FUNCION PARA CAMBIAR LA CONTRASEÑA
  cambiarContrasena() {
    if (this.email.trim() === '' || this.nuevaContrasena.trim() === '') {
      this.mostrarMensajeError('Por favor, ingresa un correo electrónico y una nueva contraseña.');
      return;
    }
    if (this.nuevaContrasena.length < 6) {
      this.mostrarMensajeError('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }
    // Cambiar contraseña para alumno
    this.validarService.changePassword(this.email, this.nuevaContrasena, true).subscribe(
      response => {
        console.log('Contraseña cambiada exitosamente para el alumno:', response);
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
        console.error('Error al cambiar la contraseña del alumno:', error);
        if (error.message !== 'Alumno no encontrado') {
          this.mostrarMensajeError('Error inesperado al cambiar la contraseña. Por favor, inténtalo de nuevo.');
        }
      }
    );
    // Cambiar contraseña para profesor
    this.validarService.changePassword(this.email, this.nuevaContrasena, false).subscribe(
      response => {
        console.log('Contraseña cambiada exitosamente para el profesor:', response);
        // Agrega aquí el código específico para el profesor si es necesario
        this.mostrarAlertaRedireccion();
        setTimeout(() => {
          this.alertController.dismiss();
          this.mostrarMensajeExito('Contraseña cambiada con éxito para el profesor.');
        }, 3000);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 6000);
      },
      error => {
        console.error('Error al cambiar la contraseña del profesor:', error);
        if (error.message !== 'Profesor no encontrado') {
          this.mostrarMensajeError('Error inesperado al cambiar la contraseña. Por favor, inténtalo de nuevo.');
        }
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







