import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from './../../service/service.service';
import { ToastrService } from 'ngx-toastr';

import { Album } from '../../modelo/album';
import { TokenService } from 'src/app/service/token.service';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  albums:Album[] = [];
  roles: string[] = [];
  isAdmin: boolean = false;

  constructor( private service: ServiceService, 
               private toastr: ToastrService,
               private tokenService: TokenService ) { }

  ngOnInit(): void {
    this.listar();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if(rol == 'ROLE_ADMIN'){
        this.isAdmin = true;
      }
    });
  }

  listar(): void {
    this.service.lista().subscribe(data => { 
      this.albums = data 
    },
    err => {
      this.toastr.error(err.error.mensaje, 'Error');
    });    
  }

  eliminar(album: Album): void{
    if(confirm("Are you sure to delete ???")) {
      this.service.elimina(album.id).subscribe(data => {
        this.albums = this.albums.filter(p => p!==album);
        this.toastr.success('Información eliminada','Exito !!!');
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error');
      });      
    }
  }


}
