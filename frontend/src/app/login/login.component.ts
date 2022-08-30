import { Component, OnInit } from '@angular/core';
import {UsernameService} from "../shared/username.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username : string = '';
  public password : string = '';

  constructor(private usernameService: UsernameService) { }

  ngOnInit(): void {
  }
    login(){
      console.log(this.username +""+ this.password+"");
      this.usernameService.setUsername(this.username);
    }

}
