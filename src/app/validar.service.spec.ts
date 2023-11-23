import { TestBed } from '@angular/core/testing';
import { ValidarService } from './validar.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ValidarService', () => {
  let service: ValidarService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ValidarService],
    });

    service = TestBed.inject(ValidarService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('============Lograr autenticar alumno correctamente============', () => {
    const emailUser = 'alumno@example.com';
    const password = 'password';

    service.authenticateAlumno(emailUser, password, 'alumno').subscribe(response => {
      expect(response).toBeDefined();
      expect(service.nombreUsuario).toEqual('Nombre del Alumno');
      expect(service.idAlumno).toEqual('ID del Alumno');
      expect(service.correoAlumno).toEqual(emailUser);
      expect(service.seccionesAlumno).toEqual(['Sección 1', 'Sección 2']);
    });
    // Verifica que se haya realizado una solicitud GET al endpoint correcto
    const req = httpMock.expectOne('http://18.222.126.27:3000/alumnos');
    expect(req.request.method).toBe('GET');

    req.flush([{ correo: 'alumno@example.com', contrasena: 'password', nombre: 'Nombre del Alumno', id: 'ID del Alumno', secciones: ['Sección 1', 'Sección 2'] }]);
  });

  it('======Autenticar profesor correctamente======', () => {
    const emailUser = 'profesor@example.com';
    const password = 'password';

    service.authenticateProfesor(emailUser, password, 'profesor').subscribe(response => {
      expect(response).toBeDefined();
      expect(service.nombreUsuario).toEqual('Nombre del Profesor');
      expect(service.asignaturasProfesor).toEqual(['Asignatura 1', 'Asignatura 2']);
    });

    const req = httpMock.expectOne('http://18.222.126.27:3000/profesores');
    expect(req.request.method).toBe('GET');

    // Responde con datos simulados que representan una autenticación exitosa para profesor
    req.flush([{ correo: 'profesor@example.com', contrasena: 'password', nombre: 'Nombre del Profesor', asignaturas: ['Asignatura 1', 'Asignatura 2'] }]);
  });

  it('===============Si el usuario no es encontrado===============', () => {
    const emailUser = 'noexistente@example.com';
    const password = 'password';
  
    service.authenticateAlumno(emailUser, password, 'alumno').subscribe(response => {
      expect(response).toBeFalsy();
    });
  
    const req = httpMock.expectOne('http://18.222.126.27:3000/alumnos');
    expect(req.request.method).toBe('GET');
  
    req.flush([]);
  });
  
  it('=========Si hay error con el HTTP==========', () => {
    const emailUser = 'alumno@example.com';
    const password = 'password';
  
    service.authenticateAlumno(emailUser, password, 'alumno').subscribe(
      response => {
        fail('Error inesperado, sin respuesta');
      },
      error => {
        expect(error).toBeDefined();
      }
    );
    const req = httpMock.expectOne('http://18.222.126.27:3000/alumnos');
    expect(req.request.method).toBe('GET');
  
    req.error(new ErrorEvent('Error al conectar a la red.'));
  });

  it('=========obtener las secciones de una asignatura existente correctamente==========', () => {
    const idAsignaturaExistente = 123;
    service.asignaturasProfesor = [
      { id: 123, secciones: ['Sección A', 'Sección B'] },
      { id: 456, secciones: ['Sección C', 'Sección D'] },
    ];

    service.getSeccionesDeAsignatura(idAsignaturaExistente).subscribe(secciones => {
      expect(secciones).toEqual(['Sección A', 'Sección B']);
    });
  });

  it('=============Lista vacia cuando el ID Asignatura no existe===========', () => {
    const idAsignaturaNoExistente = 789;
    service.asignaturasProfesor = [];

    service.getSeccionesDeAsignatura(idAsignaturaNoExistente).subscribe(secciones => {
      expect(secciones).toEqual([]);
    });
  });

  //codigo qr
  it('=====Código QR para una sección existente=====', () => {
    const idSeccionExistente = 123;

    const qrCode = service.generateQRCode(idSeccionExistente);

    // Asegúrate de que el código QR tenga el formato esperado
    expect(qrCode).toBe(`Sección: ${idSeccionExistente}`);
  });
  
});
