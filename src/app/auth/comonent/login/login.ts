import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit{

constructor(private auth : AuthService,
  private router : Router){}

ngOnInit(): void {
  
}
onLogin() : void {
this.auth.login();
this.router.navigateByUrl('/facesnaps');
}


}
