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
  nameUser: string = "";

  constructor(
    private toastController: ToastController,
    private router: Router,
    private validarService: ValidarService
  ) {}

  ngOnInit() {}

  ionViewWillLeave() {
    this.Contrasena = '';
    this.emailUser = '';
    this.nameUser = '';
  }

  async iniciarSesion() {
    if (!this.emailUser && !this.Contrasena) {
      this.mostrarMensajeError('Por favor, complete los campos de correo y contraseña');
      return false;
    } else if (!this.emailUser) {
      this.mostrarMensajeError('Ingrese su Correo Electrónico');
      return false;
    } else if (!this.Contrasena) {
      this.mostrarMensajeError('Ingrese su contraseña');
      return false;
    }
    console.log('Intentando autenticar:', this.emailUser, this.Contrasena, this.nameUser);
    this.validarService.authenticateAlumno(this.emailUser, this.Contrasena, this.nameUser).subscribe(
      (autenticadoAlumno) => {
        if (autenticadoAlumno) {
          console.log('Alumno autenticado');
          this.router.navigate(['/pagina1'], {
            queryParams: { email: this.emailUser, nombreUsuario: this.nameUser }
          });
        } else {
          // Intentar autenticar como profesor si no se encuentra como alumno
          this.validarService.authenticateProfesor(this.emailUser, this.Contrasena, 'tipoUsuarioProfesor').subscribe(
            (autenticadoProfesor) => {
              if (autenticadoProfesor) {
                console.log('Profesor autenticado');
                this.router.navigate(['/pagina1'], {
                  queryParams: { email: this.emailUser }
                });
              } else {
                this.mostrarMensajeError('El correo electrónico o la contraseña son incorrectas.');
              }
            },
          );
        }
      },
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
    console.log('Valor del campo Correo:', this.emailUser);
    console.log('Valor del campo Contraseña:', this.Contrasena);
    await this.iniciarSesion();
  }
}



