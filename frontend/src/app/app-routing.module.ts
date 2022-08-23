import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalendarComponent} from "./calendar/calendar.component";
import {ToDoComponent} from "./to-do/to-do.component";
import {HabitsComponent} from "./habits/habits.component";

const routes: Routes = [
  { path: 'Calendar', component: CalendarComponent}, //Routing für Navbar Module
  { path: 'ToDo', component: ToDoComponent},
  { path: 'Habits', component: HabitsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
