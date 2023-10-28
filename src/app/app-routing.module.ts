import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'password',
    loadChildren: () => import('./password/password.module').then( m => m.PasswordPageModule)
  },
  {
    path: 'pagina1',
    loadChildren: () => import('./pagina1/pagina1.module').then( m => m.Pagina1PageModule)
  },  {
    path: 'inicio-alumno',
    loadChildren: () => import('./inicio-alumno/inicio-alumno.module').then( m => m.InicioAlumnoPageModule)
  },
  {
    path: 'paginaqr',
    loadChildren: () => import('./paginaqr/paginaqr.module').then( m => m.PaginaqrPageModule)
  },
  {
    path: 'registro-asistencia',
    loadChildren: () => import('./registro-asistencia/registro-asistencia.module').then( m => m.RegistroAsistenciaPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
