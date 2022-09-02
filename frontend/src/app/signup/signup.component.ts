import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

 name : string = '';
 username : string = '';
 password : string = '';

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {

  }

  signup(signUpForm: NgForm){
    console.log();
    let user = signUpForm.form.value;
    this.authService.signup(user).subscribe(response => {
      console.log("response", response);
      this.router.navigate(['Login'])
    }, err => {
      console.log("error creating user")
    })


  }

}
