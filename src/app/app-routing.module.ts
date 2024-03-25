import { ChangePasswordComponent } from './changepassword/change-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListarComponent } from './crud/listar/listar.component';
import { FormularioComponent } from './crud/formulario/formulario.component';
import { DetalleComponent } from './crud/detalle/detalle.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { AlbumGuardService } from './guards/album-guard.service';
import { LoginGuard } from './guards/login.guard';
import { SendEmailComponent } from './changepassword/send-email.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},

  {path: 'sendemail', component: SendEmailComponent, canActivate: [LoginGuard]},
  {path: 'change-password/:tokenPassword', component: ChangePasswordComponent , canActivate: [LoginGuard]},

  {path: 'registro', component: RegistroComponent, canActivate: [LoginGuard]},
  {path: 'listar', component: ListarComponent, canActivate: [AlbumGuardService], data: {expectedRol: ['admin', 'user']}},
  {path: 'detalle/:id', component: DetalleComponent, canActivate: [AlbumGuardService], data: {expectedRol: ['admin', 'user']}},
  {path: 'formulario/:id', component: FormularioComponent, canActivate: [AlbumGuardService], data: {expectedRol: ['admin']}},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
