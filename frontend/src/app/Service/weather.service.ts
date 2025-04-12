import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

constructor(private http:HttpClient) { }

getWeatherDate():Observable<any>{
  return this.http.get('https://localhost:7047/WeatherForecast');
}
}
