import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { SignupComponent } from './components/signup/signup/signup.component';
import { HomepageComponent } from './pages/homepage/homepage/homepage.component';
import { BMIspageComponent } from './pages/BMIspage/bmispage/bmispage.component';
import { WorkoutspageComponent } from './pages/Workoutspage/workoutspage/workoutspage.component';
import { AuthguardService } from './services/authguard.service';
import { GoalspageComponent } from './pages/goalspage/goalspage/goalspage.component';
import { StatsComponent } from './pages/stats/stats/stats.component';
import { LoginpageComponent } from './pages/loginpage/loginpage/loginpage.component';
import { SignuppageComponent } from './pages/signuppage/signuppage/signuppage.component';
import { AddgoalComponent } from './components/addgoal/addgoal/addgoal.component';
import { AddGoalpageComponent } from './pages/addGoalpage/add-goalpage/add-goalpage.component';


 
const routes: Routes = [

    {path:'', component:HomepageComponent},

    {path: 'signuppage',component:SignuppageComponent,},
    {path: 'loginpage',component:LoginpageComponent,},
    {path:'bmi',component:BMIspageComponent, canActivate:[AuthguardService]},
    {path: 'workout',component:WorkoutspageComponent , canActivate:[AuthguardService]},
    {path: 'goal',component:GoalspageComponent, canActivate:[AuthguardService]},
    {path:'stats',component:StatsComponent,canActivate:[AuthguardService]},
    {path:"login",component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'addgoal', component:AddgoalComponent,canActivate:[AuthguardService]},
    {path:'addgoalpage',component:AddGoalpageComponent,canActivate:[AuthguardService]}
 
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }