import { TokenService } from './../service/token.service';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let intReq = req;
    const token = this.tokenService.getToken();

    if(token != null){
      //intReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
      intReq = req.clone({
        setHeaders: {Authorization: `Bearer ${ token }`}
      });
    }
    return next.handle(intReq);
  };

}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: AlbumInterceptorService, multi: true}];
