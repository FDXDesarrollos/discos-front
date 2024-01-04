import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'C - R - U - D';

  constructor(private router:Router){}

  listar(){
    this.router.navigate(['listar']);
  }
}
