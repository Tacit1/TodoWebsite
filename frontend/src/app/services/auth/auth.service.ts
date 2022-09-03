import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from 'src/app/shared/member';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) {

  }

  signup(user: any){
    return this.http.post(environment.API_URL + 'auth/signup', user);
  }

  login(user: any){
    return this.http.post(environment.API_URL + 'auth/login', user)
  }

  logout(){

    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.router.navigate(['Login']);

  }
}
