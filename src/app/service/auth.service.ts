import { JwtDto } from './../modelo/jwt-dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NuevoUsuario } from '../modelo/nuevo-usuario';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../modelo/login-usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlAuth = environment.urlAuth;

  constructor(private httpClient: HttpClient) { }

  public nuevo(usuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.urlAuth + 'nuevo', usuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.urlAuth + 'login', loginUsuario);
  }

  public refresh(dto: JwtDto): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.urlAuth + 'refresh', dto);
  }
}
