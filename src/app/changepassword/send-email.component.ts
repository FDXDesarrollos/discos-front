import { ToastrService } from 'ngx-toastr';
import { EmailPasswordService } from './../service/email-password.service';
import { Component, OnInit } from '@angular/core';
import { EmailDTO } from '../modelo/email-dto';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {
  mailTo: string = '';
  dto?: EmailDTO;

  constructor(
    private emailPasswordService: EmailPasswordService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  
  }

  onSendEmail(): void{
      this.dto = new EmailDTO(this.mailTo);
      this.emailPasswordService.sendEmail(this.dto).subscribe(
          data => {
              this.toastrService.success(data.mensaje, 'OK', {
                timeOut: 3000, positionClass: 'toast-top-right'
              });
          },
          err => {
              this.toastrService.error(err.error.mensaje, 'FAIL', {
                timeOut: 3000, positionClass: 'toast-top-right'
              });
          }
      );
  }  

}
