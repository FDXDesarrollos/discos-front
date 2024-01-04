import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListarComponent } from './crud/listar/listar.component';
import { FormularioComponent } from './crud/formulario/formulario.component';
import { DetalleComponent } from './crud/detalle/detalle.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { AlbumGuardService as guard } from './guards/album-guard.service';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'listar', component: ListarComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}},
  {path: 'detalle/:id', component: DetalleComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}},
  {path: 'formulario/:id', component: FormularioComponent, canActivate: [guard], data: {expectedRol: ['admin']}},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
