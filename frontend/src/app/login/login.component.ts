import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import {UsernameService} from "../shared/username.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username : string = '';
  public password : string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {

  }

  login(loginForm: NgForm){
    this.authService.login(loginForm.form.value).subscribe((response: any) => {

      if(response.token){
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.user.username);
          localStorage.setItem('id', response.user._id);
          this.router.navigate(['Welcome']);
      }

    }, err => {
      console.log("error in the login service", err);
      alert('Wrong UserName And PassWord');
    })
  }

}
