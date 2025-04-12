import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }
  register(registerForm:any):Observable<any>{
    return this.http.post('https://localhost:7047/register', registerForm);
  };
  login(loginForm:any){
    return this.http.post('https://localhost:7047/login?useCookies=true&useSessionCookies=true', loginForm)
  };
}
