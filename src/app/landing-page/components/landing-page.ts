import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage {

userEmail!: string;

  constructor(private router : Router){

  
  }
  
onContinue(){
  this.router.navigateByUrl('facesnaps');
}  

onSubmitForm(form : NgForm): void {
  console.log(form.value);
}

}
