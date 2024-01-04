import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ServiceService } from 'src/app/service/service.service';
import { Album } from 'src/app/modelo/album';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  titulo: string = 'Detalle de album';
  album = new Album();

  constructor(private router: Router, 
              private activateRoute: ActivatedRoute,
              private service: ServiceService) { }

  ngOnInit(): void {
    let id = this.activateRoute.snapshot.params["id"];
    this.service.detalle(Number(id)).subscribe(data => { this.album = data });    
  }

}
