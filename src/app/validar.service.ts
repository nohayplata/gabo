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
  private apiUrl = 'http://18.222.126.27:3000/alumnos';
  private apiUrlProfes = 'http://18.222.126.27:3000/profesores';

  httpOption= {
    headers : new HttpHeaders({

      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    })
  }

  idAlumno: string = ""; // Nueva propiedad para almacenar el ID del alumno
  correoAlumno: string="";
  idSecciones: number[] = [];
  nombreAsignaturas: any;

  resultadoEscaneo: string = "";
  public nombreUsuario: string = '';
  apiUrlAlumnos: any;
  asignaturas: any[] = [];
  seccion: any[] = [];
  asignaturasProfesor: any[] = [];
  public seccionesAlumno: any[] = [];
  private fechaActual: string = '';
  

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
              //cambios
              this.idAlumno = r.id;
              this.correoAlumno = emailUser;
              this.idSecciones = r.secciones.map((seccion: any) => seccion.id); //Para id de las secciones...
              this.nombreAsignaturas = r.secciones.map((seccion: any) => seccion.asignaturas.map((asignatura: any) => asignatura.nombre));//Para nombre de asignaturas de alumno
              //hasta arriba
              console.log(this.nombreUsuario, r.id, emailUser);
              console.log('Nombre de las asignaturas:', this.nombreAsignaturas);
              this.seccionesAlumno = r.secciones;
              return r;
            } else {
              return false;
            }
          }));
          console.log('Usuario encontrado:', usuario);
          console.log('Id de secciones',this.idSecciones);
          
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
    let url = userType ? 'http://18.222.126.27:3000/alumnos/' : 'http://18.222.126.27:3000/profesores/';
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
  // contenido nuevo
  // Método para obtener asignaturas del profesor
  getAsignaturasProfesor(): any[] {
    return this.asignaturasProfesor;
  }

  getSeccionesDeAsignatura(idAsignatura: any): Observable<any[]> {
    // Filtra las asignaturas del profesor para obtener la asignatura específica
    const asignaturaSeleccionada = this.asignaturasProfesor.find(asignatura => asignatura.id === idAsignatura);
    console.log(idAsignatura,"asignatura seleccionada", asignaturaSeleccionada);
    
    if (asignaturaSeleccionada) {
      return of(asignaturaSeleccionada.secciones);
      //console.log(asignaturaSeleccionada);
    } else {
      console.log('alo', asignaturaSeleccionada.secciones);
      return of([]);
    }
  }

  generateQRCode(idSeccion: number): string {
    // Ajusta la lógica para generar el código QR según tus necesidades
    return `Sección: ${idSeccion}`;
  }

  guardarResultadoEscaneo(resultado: string) {
    this.resultadoEscaneo = resultado;
    console.log(this.resultadoEscaneo,'prueba');
    
  }

  // Actualizado para obtener información del alumno desde la URL
  guardarInfoAlumno(id: string): Observable<any> {
    const url = `http://18.222.126.27:3000/alumnos`;
    return this.http.get(url);
  }

  //guardar datos sobre la asistencia
  guardarAsistencia(datosAsistencia: any){
    // Realiza una solicitud HTTP POST para guardar la asistencia en el servidor
    console.log(datosAsistencia);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(
      datosAsistencia
    );

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    //@ts-ignore
    fetch("http://18.222.126.27:3000/asistencia", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

     console.log("paso del post"); 
  }

  getAsistencia(): Observable<any[]> {
    return this.http.get<any[]>('http://18.222.126.27:3000/asistencia/');
  }

  //Este get asitencia es para hacer la validación que solo muestre las asistencias de un alumno
  getAsistencia2(idAlumno: string): Observable<any[]> {
    const url = `http://18.222.126.27:3000/asistencia/?AlumnoId=${idAlumno}`;
    return this.http.get<any[]>(url);
  }

  getAsignaturaPorIdSeccion(idAlumno: string, idSeccion: string): Observable<string | null> {
    return this.http.get<any[]>('http://18.222.126.27:3000/alumnos').pipe(
      map((alumnos: any[]) => {
        const alumno = alumnos.find(a => a.id === parseInt(idAlumno, 10));
        const seccion = alumno?.secciones.find((s: { id: number }) => s.id === parseInt(idSeccion, 10));
        const asignatura = seccion?.asignaturas[0];
        return asignatura?.nombre || null;
      })
    );
  }
}







