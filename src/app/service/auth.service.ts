import { JwtDto } from './../modelo/jwt-dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NuevoUsuario } from '../modelo/nuevo-usuario';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../modelo/login-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endPoint = 'http://localhost:9090/auth/';

  constructor(private httpClient: HttpClient) { }

  public nuevo(usuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.endPoint + 'nuevo', usuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.endPoint + 'login', loginUsuario);
  }  
}
