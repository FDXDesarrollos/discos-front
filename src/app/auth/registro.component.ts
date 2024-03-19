import { Component, OnInit } from '@angular/core';
import { NuevoUsuario } from '../modelo/nuevo-usuario';
import { TokenService } from '../service/token.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  nuevoUsuario: NuevoUsuario = {} as NuevoUsuario; 
  nombre: string = '';
  email = '';
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

  onRegister(): void {
    this.nuevoUsuario = new NuevoUsuario(this.nombre, this.email, this.usuario, this.password );
    this.authService.nuevo(this.nuevoUsuario).subscribe({
      next: () => {
        this.toastr.success('Usuario registrado', 'Exito !!!', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
    
        this.router.navigate(['/login']);
      },
      error: (err) => {
        let mensaje = (err.error.mensaje === undefined) ? err.error.errors : err.error.mensaje;
        this.toastr.error(mensaje, 'Error');
      }
    });
  }  

}
