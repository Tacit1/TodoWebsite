import { Injectable } from '@angular/core';

//Service um den Usernamen unabhängig von einzelnen Komponenten in Angular zu speichern bzw. auszulesen

@Injectable({
  providedIn: 'root'
})
export class UsernameService {
  username!: string;

  constructor() { }
  getUsername(): string
  {
    return this.username;
  }

  setUsername(uname: string): void
  {
    this.username=uname;
  }
}
