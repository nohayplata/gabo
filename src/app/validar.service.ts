import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, throwError } from 'rxjs';
import { map, switchMap,retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ValidarService {
  private apiUrl = 'http://localhost:3000/credencialesAlumnos';
  private apiUrlProfes = 'http://localhost:3000/credencialesProfesores';
  private sedesUrl = 'http://localhost:3000/sedes';

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

  //Cambiar la contraseña para ambos, profesor y alumno.
  changePassword(email: string, newPassword: string, userType: boolean): Observable<any> {
    let url = userType ? 'http://localhost:3000/credencialesAlumnos/' : 'http://localhost:3000/credencialesProfesores/';
  
    return this.http.get<any[]>(url, { params: { correo: email } }).pipe(
      switchMap((credenciales: any[]) => {
        const persona = credenciales.find(p => p.correo === email);
  
        if (!persona) {
          throw new Error(userType ? 'Alumno no encontrado' : 'Profesor no encontrado');
        }
        const updatedPersona = { ...persona, contrasena: newPassword };
        // Realiza la solicitud PUT para actualizar la contraseña
        return this.http.put(`${url}${persona.id}`, updatedPersona, this.httpOption);
      }),
      retry(3)
    );
  }

  //SABER DE LAS SEDES
  getSedesInfo(): Observable<any[]> {
    return this.http.get<any[]>(this.sedesUrl);
  }

  getAsignaturasDelProfesor(profesorId: number, sedeId: number) {
    const url = `http://localhost:3000/asignaturas?profesorId=${profesorId}&sedeId=${sedeId}`;
    return this.http.get<Object[]>(url).pipe(
      tap(asignaturas => console.log('Asignaturas desde el servicio:', asignaturas))
    );
  }
}






