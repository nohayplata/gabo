// login.page.ts
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ValidarService } from '../validar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  emailUser: string = "";
  Contrasena: string = "";
  tipoUsuario: string = ""; // Asegúrate de tener un campo para seleccionar el tipo de usuario

  constructor(
    private toastController: ToastController,
    private router: Router,
    private validarService: ValidarService
  ) {}

  ngOnInit() {}

  ionViewWillLeave() {
    this.Contrasena = '';
    this.emailUser = '';
    this.tipoUsuario = '';
  }

  async iniciarSesion() {
    if (!this.emailUser && !this.Contrasena && !this.tipoUsuario) {
      this.mostrarMensajeError('Por favor, complete todos los campos');
      return false;
    }
    console.log('Intentando autenticar:', this.emailUser, this.Contrasena, this.tipoUsuario);
    this.validarService.authenticate(this.emailUser, this.Contrasena, this.tipoUsuario).subscribe(
      (autenticado :any ) => {
        console.log('Respuesta de autenticación:', autenticado);
        if (autenticado) {
          console.log('Usuario autenticado');
          this.router.navigate(['/pagina1'], {
            queryParams: { nombreUsuario: this.emailUser }
          });
        } else {
          this.mostrarMensajeError('El correo electrónico o la contraseña son incorrectas.');
        }
      },
      (error: any) => {
        console.error('Error de autenticación', error);
        this.mostrarMensajeError('Error de autenticación');
      }
    );
  
    return true;
  }
  

  async mostrarMensajeError(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'middle'
    });
    await toast.present();
  }

  async onSubmit() {
    console.log('Valor del campo Nombre:', this.emailUser);
    console.log('Valor del campo Contraseña:', this.Contrasena);
    console.log('Tipo de usuario:', this.tipoUsuario);

    console.log('Tipo de usuario antes de iniciar sesión:', this.tipoUsuario);

    await this.iniciarSesion();
  }
}


