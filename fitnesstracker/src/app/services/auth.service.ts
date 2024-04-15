import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl: string = "https://localhost:7119/api/User/"

  private loggedInKey: string = "isLoggedIn";

  
  constructor(private http: HttpClient,  private router: Router) { }

  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj);
  }
  // loginauth(email:string,password:string){
  //   localStorage.setItem(this.loggedInKey,'true');
  //   return this.http.post<any>(`${this.baseUrl}loginauth`,{email,password})
  // }

  loginauth(email:string,password:string){
    return this.http.post<any>(`${this.baseUrl}loginauth`,{email,password}).pipe(
      map(res=>{
        localStorage.setItem('token',res.token);
        localStorage.setItem(this.loggedInKey,'true');
        return res;

      })
    )
  }

 
  isLoggedIn():boolean{
    const isLoggedIn = localStorage.getItem(this.loggedInKey);
    return isLoggedIn === 'true';
    
  }

  getUsername():string {
    const userDataString = localStorage.getItem('userData');
    const userData=userDataString ? JSON.parse(userDataString) :null;
    return userData ? userData.firstName: '';
  }

  logout() : void {
    localStorage.removeItem(this.loggedInKey);
    localStorage.removeItem('token');

    localStorage.removeItem('userData');
    localStorage.removeItem('workoutsData');

    localStorage.removeItem('goalsData');

    localStorage.removeItem('bmisData');
    localStorage.removeItem('token');

    this.router.navigate([''])

  }


  

 
  checkTokenValidity(): void {
    console.log('working')
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token ) {
    
      this.logout();
    }else{
      const decoded: any = jwtDecode(token);
      console.log(decoded)
      const expirationDate : number = decoded.exp * 1000;
      console.log(expirationDate);
      const currentDate : number = new Date().getTime();
      console.log(currentDate);
      if(expirationDate<currentDate){
        this.logout()
      }
      }
    
    }




}