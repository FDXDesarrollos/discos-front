import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangePassDto } from '../modelo/change-pass-dto';
import { EmailPasswordService } from '../service/email-password.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  password: string = '';
  confirmaPassword: string = '';
  tokenPassword: string = '';
  dto?: ChangePassDto;

  constructor(
    private emailPasswordService: EmailPasswordService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

  onChangePass(): void{
    if(this.password !== this.confirmaPassword){
        this.toastrService.error('Las contraseñas no coinciden', 'FAIL', {
          timeOut: 3000, positionClass: 'toast-top-right'
        });

        return;
    }
    else{
        this.tokenPassword = this.activatedRoute.snapshot.params["tokenPassword"];
        this.dto = new ChangePassDto(this.password, this.confirmaPassword, this.tokenPassword);
        this.emailPasswordService.changePassword(this.dto).subscribe(
            data => {
              this.toastrService.success(data.mensaje, 'OK', {
                timeOut: 3000, positionClass: 'toast-top-right'
              });

              this.router.navigate(['/login']);
            },
            err => {
                this.toastrService.error(err.error.mensaje, 'FAIL', {
                  timeOut: 3000, positionClass: 'toast-top-right'
                });
            }          
        );
    }

  }


}
