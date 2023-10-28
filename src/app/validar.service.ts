import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, throwError } from 'rxjs';
import { map, switchMap,retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ValidarService {
  private apiUrl = 'http://localhost:3000/credencialesAlumnos';
  private apiUrlProfes = 'http://localhost:3000/credencialesProfesores';

  httpOption= {
    headers : new HttpHeaders({

      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    })
  }


  public nombreUsuario: string = '';
  apiUrlAlumnos: any;

  constructor(private http: HttpClient) {}

  //Autenticar ALUMNO
  authenticateAlumno(emailUser: string, password: string, userType: string): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      map((credenciales: any) => {
        let usuarios = credenciales;
        console.log("usuarios",usuarios);
        if (usuarios != undefined) {
          console.log('Usuarios encontrados en el servicio:', usuarios);
          const usuario = usuarios.find(((r: any) => {
            if(r.correo == emailUser && r.contrasena == password){
              this.nombreUsuario = r.nombre
              console.log(this.nombreUsuario, r.nombre);
              return r;
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

  //AUTENTICAR PROFESOR
  authenticateProfesor(emailUser: string, password: string, userType: string): Observable<any> {
    return this.http.get(this.apiUrlProfes).pipe(
      map((credenciales: any) => {
        let usuarios = credenciales;
        console.log("usuarios",usuarios);
        if (usuarios != undefined) {
          console.log('Usuarios encontrados en el servicio:', usuarios);
          const usuario = usuarios.find(((r: any) => {
            if(r.correo == emailUser && r.contrasena == password){
              this.nombreUsuario = r.nombre
              console.log(this.nombreUsuario, r.nombre);
              
              return r;
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

  //Cambiar contraseña alumno
  changePasswordAlumno(email: string, newPassword: string): Observable<any> {
    let url = 'http://localhost:3000/credencialesAlumnos/';
    // Encuentra al alumno por el correo electrónico
    return this.http.get<any[]>(url, { params: { correo: email } }).pipe(
      switchMap((alumnos: any[]) => {
        const alumno = alumnos.find(a => a.correo === email);
  
        if (!alumno) {
          throw new Error('Alumno no encontrado');
        }
        const updatedAlumno = { ...alumno, contrasena: newPassword };
        // Realiza la solicitud PUT para actualizar la contraseña
        return this.http.put(`${url}${alumno.id}`, updatedAlumno, this.httpOption);
      }),
      retry(3)
    );
  }
  //Cambiar contraseña profesor.
  changePasswordProfe(email: string, newPassword: string): Observable<any> {
    let url2 = 'http://localhost:3000/credencialesProfesores/';
    return this.http.get<any[]>(url2, { params: { correo: email } }).pipe(
      switchMap((profes: any[]) => {
        const profe = profes.find(p => p.correo === email);
        if (!profe) {
          throw new Error('Profesor no encontrado');
        }
        const updatedProfe = { ...profe, contrasena: newPassword };
        // Realiza la solicitud PUT para actualizar la contraseña
        return this.http.put(`${url2}${profe.id}`, updatedProfe, this.httpOption);
      }),
      retry(3)
    );
  }
}






