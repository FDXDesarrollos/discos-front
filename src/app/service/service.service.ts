import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Album } from '../modelo/album';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private endPoint = environment.endPoint;

  constructor(private http: HttpClient) { }

  lista(): Observable<Album[]>{
    return this.http.get<Album[]>(this.endPoint + '/listar');
  }

  detalle(id: number): Observable<Album>{
    return this.http.get<Album>(this.endPoint + `/detalle/${id}`)
  }  

  agrega(album: Album): Observable<any>{
    return this.http.post<Album>(this.endPoint + '/agregar', album);
  }

  actualiza(album: Album): Observable<any>{
    return this.http.put<Album>(this.endPoint + `/actualizar/${album.id}`, album);
  }

  elimina(id: number): Observable<any>{
    return this.http.delete<Album>(this.endPoint + `/eliminar/${id}`);
  }

}
