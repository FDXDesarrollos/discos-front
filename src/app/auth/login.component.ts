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

  loginUsuario: LoginUsuario = {} as LoginUsuario;
  usuario: string = '';
  password: string = '';
  errMsg: string = '';

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.usuario, this.password);

    this.authService.login(this.loginUsuario).subscribe({
      next: (response) => {
        this.tokenService.setToken(response.token);
        this.router.navigate(['/']);        
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');        
      }
    });
  }

}
