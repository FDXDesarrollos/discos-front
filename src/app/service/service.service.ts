import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Album } from '../modelo/album';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  base_url = 'http://localhost:9090/api/album';

  constructor(private http: HttpClient) { }

  lista(): Observable<Album[]>{
    return this.http.get<Album[]>(this.base_url + '/listar');
  }

  detalle(id: number): Observable<Album>{
    return this.http.get<Album>(this.base_url + `/detalle/${id}`)
  }  

  agrega(album: Album): Observable<any>{
    return this.http.post<Album>(this.base_url + '/agregar', album);
  }

  actualiza(album: Album): Observable<any>{
    return this.http.put<Album>(this.base_url + `/actualizar/${album.id}`, album);
  }

  elimina(id: number): Observable<any>{
    return this.http.delete<Album>(this.base_url + `/eliminar/${id}`);
  }

}
