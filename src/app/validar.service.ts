import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ValidarService {
  private apiUrl = 'http://localhost:3000/credencialesAlumnos';
  private apiUrlProfes = 'http://localhost:3000/credencialesProfesores';

  constructor(private http: HttpClient) {}

  authenticateAlumno(emailUser: string, password: string, userType: string): Observable<boolean> {
    return this.http.get(this.apiUrl).pipe(
      map((credenciales: any) => {
        
        let usuarios = credenciales;
        console.log("usuarios",usuarios);
        if (usuarios != undefined) {
          console.log('Usuarios encontrados en el servicio:', usuarios);
          const usuario = usuarios.find(((r: any) => {
            if(r.correo == emailUser && r.contrasena == password){
              return true
            }else {
              return false
            }
          } ));
          console.log('Usuario encontrado:', usuario);
          return usuario;
        } else {
          console.log('Tipo de usuario no encontrado en el servicio');
          return false;
        }
      })
    );
  }

  authenticateProfesor(emailUser: string, password: string, userType: string): Observable<boolean> {
    return this.http.get(this.apiUrlProfes).pipe(
      map((credenciales: any) => {
        
        let usuarios = credenciales;
        console.log("usuarios",usuarios);
        if (usuarios != undefined) {
          console.log('Usuarios encontrados en el servicio:', usuarios);
          const usuario = usuarios.find(((r: any) => {
            if(r.correo == emailUser && r.contrasena == password){
              return true
            }else {
              return false
            }
          } ));
          console.log('Usuario encontrado:', usuario);
          return usuario;
        } else {
          console.log('Tipo de usuario no encontrado en el servicio');
          return false;
        }
      })
    );
  }
}





