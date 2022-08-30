import { Component, OnInit } from '@angular/core';
import {BackendService} from "../shared/backend.service";
import {Member} from "../shared/member";

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.css']
})
export class HabitsComponent implements OnInit {
  username! : string;
  members!: Member[];

  constructor(private bs: BackendService) {}

  ngOnInit(): void {
    this.readAll();
  }

  readAll(): void {
    this.bs.getAll().subscribe(
      (
        response: Member[]) => {
        this.members = response;
        console.log(this.members);
        return this.members;
      },
      error => console.log(error)
    );
  }
}
