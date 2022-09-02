import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { ToDoComponent } from "./to-do/to-do.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { WelcomepageComponent} from "./welcomepage/welcomepage.component";
import { LogoutComponent} from "./logout/logout.component";

const routes: Routes = [
  { path: 'Login', component: LoginComponent},
  { path: '', component: SignupComponent},
  { path: 'Navbar', component: NavbarComponent},
  { path: 'Calendar', component: CalendarComponent}, //Routing für Navbar Module
  { path: 'ToDo', component: ToDoComponent},
  { path: 'Welcome', component: WelcomepageComponent},
  { path: 'Logout', component: LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
