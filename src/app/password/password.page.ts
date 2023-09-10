import { Component } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

// Función para validar el formato de correo electrónico
function validarCorreoElectronico(correo: string): boolean {
  const expresionRegular = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return expresionRegular.test(correo);
}

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage {
  nombreUsuario: string = "";
  email: string = "";

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) {}

  async recuperarContrasena() {
    if (!this.nombreUsuario && !this.email) {
      console.error('Campos incompletos');
      this.mostrarMensajeError('Por favor, ingrese nombre de usuario y email.');
    } else if (!this.nombreUsuario) {
      console.error('Falta nombre de usuario');
      this.mostrarMensajeError('Por favor, ingrese el nombre de usuario');
    } else if (!validarCorreoElectronico(this.email)) {
      console.error('Formato de correo electrónico inválido');
      this.mostrarMensajeError('Por favor, ingrese un correo electrónico válido.');
    } else {

      // Mostrar la alerta "Redirigiendo" antes de redirigir al usuario
      const alert = await this.alertController.create({
        header: 'Se ha enviado un correo con su recuperación de contraseña.',
        message: 'Por favor, espere mientras lo redirigimos...',
        backdropDismiss: false,
        animated: true,
      });

      await alert.present();
      // Redirigir al usuario a /login después de un retraso simulado
      setTimeout(() => {
        alert.dismiss();
        this.router.navigate(['/login']);
      }, 4000);
    }
  }

  async mostrarMensajeError(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'middle',
    });
    await toast.present();
  }
}

