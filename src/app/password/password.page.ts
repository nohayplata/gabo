import { Component } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    } else if (!this.email) {
      console.error('Falta email');
      this.mostrarMensajeError('Por favor, ingrese su email.');
    } else {

      // Mostrar la alerta "Redirigiendo" antes de redirigir al usuario
      const alert = await this.alertController.create({
        header: 'Se ha enviado un correo con su recuperación de contraseña.',
        message: 'Por favor, espere mientras lo redirigimos...',
        backdropDismiss: false, // Evita que el usuario cierre la alerta haciendo clic fuera
        animated: true, // Habilita animaciones
      });

      await alert.present();
      // Redirigir al usuario a /login después de un retraso simulado (por ejemplo, 2 segundos)
      setTimeout(() => {
        alert.dismiss(); // Cierra la alerta
        this.router.navigate(['/login']);
      }, 4000); // 2 segundos (ajusta el tiempo según tus necesidades)
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
