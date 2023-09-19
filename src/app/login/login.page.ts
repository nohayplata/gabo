import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router'; // Importa el router para las variables
import { SharedService } from '../shared.service'; // Importa el servicio



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  nombreUsuario: string = "";
  Contrasena: string = "";

  constructor(private toastController: ToastController, private router: Router, private sharedService: SharedService) {
  }

  ngOnInit() {
  }


  ionViewWillLeave(){
    this.Contrasena='';
    this.nombreUsuario='';
  }

  async iniciarSesion() {
    if (!this.nombreUsuario && !this.Contrasena) {
      // Mostrar un mensaje de error si ambos campos están vacíos
      this.mostrarMensajeError('Por favor, ingrese nombre de usuario y contraseña');
      return false;
    } else if (!this.nombreUsuario) {
      // Mostrar un mensaje de error si falta el nombre de usuario
      this.mostrarMensajeError('Por favor, ingrese el nombre de usuario');
      return false;
    } else if (!this.Contrasena) {
      // Mostrar un mensaje de error si falta la contraseña
      this.mostrarMensajeError('Por favor, ingrese la contraseña');
      return false;
    } else if (this.Contrasena.length < 6) {
      // Mostrar un mensaje de error si la contraseña tiene menos de 6 caracteres
      this.mostrarMensajeError('La contraseña debe tener al menos 6 caracteres');
      return false;
    } else if (this.nombreUsuario.toLowerCase() !== 'juan') {
      // Verificar que el nombre de usuario sea "juan" (ignorando mayúsculas/minúsculas)
      this.mostrarMensajeError('Nombre de usuario incorrecto');
      return false;
    } else if (this.Contrasena !== '123456') {
      // Verificar que la contraseña sea "123456"
      this.mostrarMensajeError('Contraseña incorrecta');
      return false;
    } else {
      return true;
    }
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
    console.log('Valor del campo Nombre:', this.nombreUsuario);
    console.log('Valor del campo Contraseña:', this.Contrasena);
    await this.iniciarSesion().then(res =>{
      if (res) {
        this.router.navigate(['/pagina1'],{
          queryParams: {nombreUsuario: this.nombreUsuario}
        });
      }
      
    });
  }
}
