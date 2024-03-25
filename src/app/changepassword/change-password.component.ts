import { Component, OnInit } from '@angular/core';
import { EmailPasswordService } from '../service/email-password.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangePassDTO } from '../modelo/change-pass-dto';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  password: string = '';
  confirmaPassword: string = '';
  tokenPassword: string = '';
  dto?: ChangePassDTO;

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
        this.dto = new ChangePassDTO(this.password, this.confirmaPassword, this.tokenPassword);
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
