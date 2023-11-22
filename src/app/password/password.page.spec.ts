import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PasswordPage } from './password.page';
import { ValidarService } from '../validar.service'; // Asegúrate de importar el servicio correcto

describe('PasswordPage', () => {
  let component: PasswordPage;
  let fixture: ComponentFixture<PasswordPage>;
  let validarService: jasmine.SpyObj<ValidarService>;
  let alertController: jasmine.SpyObj<AlertController>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    validarService = jasmine.createSpyObj('ValidarService', ['changePassword']);
    alertController = jasmine.createSpyObj('AlertController', ['dismiss']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [PasswordPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ValidarService, useValue: validarService },
        { provide: AlertController, useValue: alertController },
        { provide: Router, useValue: router },
      ],
    });

    fixture = TestBed.createComponent(PasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Error si contraseña y email vacios', () => {
    component.email = '';
    component.nuevaContrasena = '';

    spyOn(component, 'mostrarMensajeError');

    component.cambiarContrasena();

    expect(component.mostrarMensajeError).toHaveBeenCalledWith('Por favor, ingresa un correo electrónico y una nueva contraseña.');
  });

  it('Error si ambos estan vacios', () => {
    component.email = 'correo@example.com';
    component.nuevaContrasena = 'short';

    spyOn(component, 'mostrarMensajeError');

    component.cambiarContrasena();

    expect(component.mostrarMensajeError).toHaveBeenCalledWith('La nueva contraseña debe tener al menos 6 caracteres.');
  });
});

