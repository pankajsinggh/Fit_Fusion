

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApicallsService {

  private baseUrl: string = "https://localhost:7119/api/BMI/"
  private secondbaseUrl:string= "https://localhost:7119/api/Workout/"
  private goalbaseUrl:string="https://localhost:7119/api/Goal/  "

  constructor(private http: HttpClient,) { }

  calculateBMI(height:number,weight:number): Observable<number> {
    const url= `${this.baseUrl}calculate?height=${height}&weight=${weight}`;
    return this.http.get<number>(url); // Returns an Observable
  }

  classifyBMI(height:number,weight:number,age:number): Observable<number> {
    const url= `${this.baseUrl}classify?height=${height}&weight=${weight}&age=${age}`;
    return this.http.get<number>(url); // Returns an Observable
  }

  addWorkout(workoutDTO:any): Observable<any> {
    return this.http.post<any>(`${this.secondbaseUrl}`,workoutDTO); // Returns an Observable
  }

  getWorkouts(userId:number): Observable<any> {
    return this.http.get<any>(`${this.secondbaseUrl}${userId}`); // Returns an Observable
  }

  deleteWorkout(workoutId:number): Observable<any> {
    return this.http.delete<any>(`${this.secondbaseUrl}${workoutId}`); // Returns an Observable
  }

  addGoal(goalDTO:any): Observable<any> {
    return this.http.post<any>(`${this.goalbaseUrl}`,goalDTO); // Returns an Observable
  }

  getGoals(userId:number): Observable<any> {
    return this.http.get<any>(`${this.goalbaseUrl}${userId}`); // Returns an Observable
  }

  deleteGoal(goalId:number): Observable<any> {
    return this.http.delete<any>(`${this.goalbaseUrl}${goalId}`); // Returns an Observable
  }

  addBMI(bmiRecordDTO:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`,bmiRecordDTO); // Returns an Observable
  }

  getBMIs(userId:number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${userId}`); // Returns an Observable
  }

  deletebmi(bmiRecordId:number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}${bmiRecordId}`); // Returns an Observable
  }

  updateProgressToGoal(userId: number, goalId: number, progress: number): Observable<any> {
    const url = `${this.goalbaseUrl}${userId}/${goalId}/updateProgress`;
    return this.http.put<any>(url, progress); // Returns an Observable
  }
}
