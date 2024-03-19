import { AuthService } from './../service/auth.service';
import { TokenService } from './../service/token.service';
import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, concatMap, throwError } from 'rxjs';
import { JwtDto } from '../modelo/jwt-dto';


@Injectable({
  providedIn: 'root'
})
export class AlbumInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService, 
              private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!this.tokenService.isLogged()) {
      return next.handle(req);
    }

    let intReq = req;
    const token = this.tokenService.getToken();

    /*intReq = req.clone({
      setHeaders: {Authorization: `Bearer ${ token }`}
    });*/

    intReq = this.addToken(req, token);

    return next.handle(intReq).pipe(
      catchError((err: HttpErrorResponse) => {

      if(err.status == 401){
          /*this.toastr.error(err.error.mensaje, 'Sesión expirada',{
            timeOut: 3000, positionClass: 'toast-top-center'
          });*/
          const dto: JwtDto = new JwtDto(this.tokenService.getToken());
          return this.authService.refresh(dto).pipe(
            concatMap((data: any) => {
              console.log('refrescando...');
              this.tokenService.setToken(data.token);

              //intReq = req.clone({headers: req.headers.set(AUTHORIZATION, 'Bearer ' + data.token)});
              intReq = this.addToken(req, data.token);

              return next.handle(intReq);

            })
          );
      }
      else{
        this.tokenService.logOut();
        return throwError(() => new Error(err.error));
      }
    }));
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any>{
    return req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
  }

}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: AlbumInterceptorService, multi: true}];
