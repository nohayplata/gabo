import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map,flatMap ,switchMap,retry } from 'rxjs/operators';
import { QRCodeModule } from 'angularx-qrcode';

@Injectable({
  providedIn: 'root',
})
export class ValidarService {
  qrCodeData: string = '';
  private apiUrl = 'http://192.168.1.8:3000/alumnos';
  private apiUrlProfes = 'http://192.168.1.8:3000/profesores';
  

  httpOption= {
    headers : new HttpHeaders({

      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    })
  }

  public nombreUsuario: string = '';
  apiUrlAlumnos: any;
  asignaturas: any[] = [];
  seccion: any[] = [];
  private asignaturasProfesor: any[] = [];
  public seccionesAlumno: any[] = [];
  

  constructor(private http: HttpClient) {}

  //Autenticar ALUMNO
  authenticateAlumno(emailUser: string, password: string, userType: string): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      map((credenciales: any) => {
        let usuarios = credenciales;
        console.log("usuarios", usuarios);
        if (usuarios != undefined) {
          console.log('Usuarios encontrados en el servicio:', usuarios);
          const usuario = usuarios.find(((r: any) => {
            if (r.correo == emailUser && r.contrasena == password) {
              this.nombreUsuario = r.nombre;
              console.log(this.nombreUsuario, r.nombre);
              this.seccionesAlumno = r.secciones;
              return r;
            } else {
              return false;
            }
          }));
          console.log('Usuario encontrado:', usuario);
          return usuario;
        } else {
          console.log('Tipo de usuario no encontrado en el servicio');
          return false;
        }
      })
    );
  }

  authenticateProfesor(emailUser: string, password: string, userType: string): Observable<any> {
    return this.http.get(this.apiUrlProfes).pipe(
      map((credenciales: any) => {
        let usuarios = credenciales;
        console.log("usuarios", usuarios);
        if (usuarios != undefined) {
          console.log('Usuarios encontrados en el servicio:', usuarios);
          const usuario = usuarios.find(((r: any) => {
            if(r.correo == emailUser && r.contrasena == password){
              this.nombreUsuario = r.nombre;
              console.log(this.nombreUsuario, r.nombre);
              // Almacena las asignaturas del profesor en el servicio de autenticación
              this.asignaturasProfesor = r.asignaturas;
              return r;
            } else {
              return false;
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
    let url = userType ? 'http://192.168.1.8:3000/alumnos/' : 'http://192.168.1.8:3000/profesores/';
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
  
  getSeccionesAlumno(): any[] {
    return this.seccionesAlumno;
  }

  setAsignaturasAlumno(seccion: any[]): void {
    this.seccionesAlumno = seccion;
  }

  // Método para obtener asignaturas del profesor
  getAsignaturasProfesor(): any[] {
    return this.asignaturasProfesor;
  }

  // Método para establecer asignaturas del profesor después del inicio de sesión
  setAsignaturasProfesor(asignaturas: any[]): void {
    this.asignaturasProfesor = asignaturas;
  }

  getSeccionesDeAsignatura(idAsignatura: number): Observable<any[]> {
    // Filtra las asignaturas del profesor para obtener la asignatura específica
    const asignaturaSeleccionada = this.asignaturasProfesor.find(asignatura => asignatura.id === idAsignatura);
    if (asignaturaSeleccionada) {
      return of(asignaturaSeleccionada.secciones);
    } else {
      return of([]);
    }
  }

  generateQRCode(idSeccion: number): string {
    // Ajusta la lógica para generar el código QR según tus necesidades
    return `Sección: ${idSeccion}`;
  }

  // Agrega este método para enviar datos del alumno al profesor
  enviarDatosAlProfesor(datosAlumno: any): Observable<any> {
    const url = 'http://192.168.1.8:3000/alumnos';
    return this.http.post<any>(url, { datosAlumno });
  }

  obtenerDatosAlumno(idSeccion: any): Observable<any> {
    // Reemplaza la URL con la correcta según tu API
    const url = `http://192.168.1.8:3000/alumnos`;
    return this.http.get(url);
  }



  //Logica de la asistencia

  registrarAsistencia(datosAlumno: any) {
    // Implementa la lógica para registrar la asistencia (puedes guardar en una lista, almacenamiento local, etc.)
    console.log('Registrando asistencia:', datosAlumno);
  }

  obtenerDatosAsistencia(idSeccion: number) {
    const url = `http://192.168.1.8:3000/alumnos`;
    const fechaHora = new Date().toISOString(); // Obtiene la fecha y hora actual en formato ISO
    return this.http.post(url, { fechaHora });
  }
}







