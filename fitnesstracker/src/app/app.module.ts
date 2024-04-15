import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { BannerComponent } from './components/banner/banner/banner.component';
import { SecondBannerComponent } from './components/second-banner/second-banner/second-banner.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { SignupComponent } from './components/signup/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { HomepageComponent } from './pages/homepage/homepage/homepage.component';
import { SignuppageComponent } from './pages/signuppage/signuppage/signuppage.component';
import { LoginpageComponent } from './pages/loginpage/loginpage/loginpage.component';
import { LoginComponent } from './components/login/login/login.component';
import { BMIspageComponent } from './pages/BMIspage/bmispage/bmispage.component';
import { BMICalculatorComponent } from './components/bmicalculator/bmicalculator/bmicalculator.component';
import { ClassifybmiComponent } from './components/classifybmi/classifybmi/classifybmi.component';
import { WorkoutspageComponent } from './pages/Workoutspage/workoutspage/workoutspage.component';
import { AddworkoutComponent } from './components/addworkout/addworkout/addworkout.component';
import { AuthguardService } from './services/authguard.service';
import { GetWorkoutsComponent } from './components/getWorkouts/get-workouts/get-workouts.component';
import { AddgoalComponent } from './components/addgoal/addgoal/addgoal.component';
import { GoalspageComponent } from './pages/goalspage/goalspage/goalspage.component';
import { GetgoalsComponent } from './components/getgoals/getgoals/getgoals.component';
import { AddBMIComponent } from './components/addBMI/add-bmi/add-bmi.component';
import { GetBMIsComponent } from './components/getBMIs/get-bmis/get-bmis.component';
import { StatsComponent } from './pages/stats/stats/stats.component';
import { BmichartComponent } from './components/bmichart/bmichart/bmichart.component';
import { WorkoutchartComponent } from './components/workoutchart/workoutchart/workoutchart.component';
import { GoalCompletionComponent } from './components/goalCompletion/goal-completion/goal-completion.component';
import { AddGoalpageComponent } from './pages/addGoalpage/add-goalpage/add-goalpage.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastrModule } from 'ngx-toastr';
// import {NgToastModule} from 'ng-angular-popup';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BannerComponent,
    SecondBannerComponent,
    FooterComponent,
    SignupComponent,
    HomepageComponent,
    SignuppageComponent,
    LoginpageComponent,
    LoginComponent,
    BMIspageComponent,
    BMICalculatorComponent,
    ClassifybmiComponent,
    WorkoutspageComponent,
    AddworkoutComponent,
    GetWorkoutsComponent,
    AddgoalComponent,
    GoalspageComponent,
    GetgoalsComponent,
    AddBMIComponent,
    GetBMIsComponent,
    BmichartComponent,
    StatsComponent,
    WorkoutchartComponent,
    GoalCompletionComponent,
    AddGoalpageComponent,
    
    ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, 
    FormsModule
    // NgToastModule
    // BrowserAnimationsModule,
    // ToastrModule.forRoot()
  ],
  providers: [AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
