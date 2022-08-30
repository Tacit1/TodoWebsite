import { Component, OnInit } from '@angular/core';
import {DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService} from '@syncfusion/ej2-angular-schedule';
import {UsernameService} from "../shared/username.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService]
})

export class CalendarComponent implements OnInit {
  username?: string ;
  constructor(private usernameService: UsernameService) { }

  ngOnInit(): void {
    this.username = this.usernameService.getUsername();
    console.log(this.username)
  }

}
