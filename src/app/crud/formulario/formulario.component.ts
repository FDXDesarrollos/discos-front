import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ServiceService } from 'src/app/service/service.service';
import { Album } from 'src/app/modelo/album';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  modelAlbum = new Album();
  titulo!: string;
  isNuevo = false;

  constructor(private router: Router, 
              private service: ServiceService,
              private activateRoute: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    let id = this.activateRoute.snapshot.params["id"];

    if(Number(id) == 0){
      this.isNuevo = true;
      this.titulo = "Nuevo Album";
    }
    else{
      this.isNuevo = false;
      this.titulo = "Editar Album";
      this.service.detalle(Number(id)).subscribe(data => { this.modelAlbum = data });
    }
  }

  registrar(album: Album): void {
    album.titulo = album.titulo.toUpperCase();
    album.interprete = album.interprete.toUpperCase();
    album.genero = album.genero.toUpperCase();

    if(this.isNuevo){
      this.service.agrega(album).subscribe({
        next: (response) => {
          console.log( album );
          this.toastr.success('Información registrada','Exito !!!');
          this.router.navigate(['/listar']);
        },
        error: (err) => {
          this.toastr.error(err.error.mensaje, 'Error');
        }
      });
    }
    else{
      this.service.actualiza(album).subscribe({
        next: (response) =>{
          this.modelAlbum = response; 
          this.toastr.success('Información actualizada','Exito !!!');
          this.router.navigate(['/listar']);
        },
        error: (err) =>{
          let mensaje = (err.error.mensaje === undefined) ? err.error.errors : err.error.mensaje;
          this.toastr.error(mensaje, 'Error');
        }
      });
    }
  }

}
