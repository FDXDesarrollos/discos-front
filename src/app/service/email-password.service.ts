import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmailDTO } from '../modelo/email-dto';
import { ChangePassDTO } from '../modelo/change-pass-dto';

@Injectable({
  providedIn: 'root'
})
export class EmailPasswordService {

  changePassUrl = environment.changePassUrl;

  constructor(private httpClient: HttpClient) { }

  public sendEmail(dto: EmailDTO): Observable<any>  {
      return this.httpClient.post<any>(this.changePassUrl + 'send-email', dto);   
  }

  public changePassword(dto: ChangePassDTO): Observable<any>{
    return this.httpClient.post<any>(this.changePassUrl + 'change-pass', dto);
  }
}
