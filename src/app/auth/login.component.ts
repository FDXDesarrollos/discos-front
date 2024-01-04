import { Component, OnInit } from '@angular/core';
import { LoginUsuario } from '../modelo/login-usuario';
import { TokenService } from '../service/token.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged: boolean = false;
  loginUsuario: LoginUsuario = {} as LoginUsuario;
  usuario: string = '';
  password: string = '';
  roles: string[] = [];
  errMsg: string = '';

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.usuario, this.password);

    this.authService.login(this.loginUsuario).subscribe({
      next: (response) => {
        this.isLogged = true;

        this.tokenService.setToken(response.token);
        this.tokenService.setUser(response.usuario);
        this.tokenService.setAuthorities(response.authorities);
        this.roles = response.authorities;
        
        this.toastr.success('Bienvenido ' + response.usuario, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
  
        this.router.navigate(['/']);        
      },
      error: (err) => {
        this.isLogged = false;
        this.toastr.error(err.error.message, 'Error');        
      }
    });
  }

}
