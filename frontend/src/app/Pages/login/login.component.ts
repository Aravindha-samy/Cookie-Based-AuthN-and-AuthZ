import { WeatherService } from './../../Service/weather.service';
import { AuthService } from './../../Service/auth.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from '../../Components/Component.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,ComponentModule], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private WeatherService = inject(WeatherService);

  errorMessage: any ;

  loginForm:FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),  
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  isloggein: boolean = false;
  Registered: boolean = false;

  onSubmit() 
  {
    
    console.log(this.loginForm.value);
    let request= {
      email:this.loginForm.value.username,
      password:this.loginForm.value.password,
      twoFactorRecoveryCode:"",
      twoFactorCode:""
    }
    console.log(request);
    this.authService.login(request).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
        this.errorMessage = error.error.message;
      }
    );
  }

  onRegister() 
  {
    console.log(this.loginForm.value);
    let request= {
      email:this.loginForm.value.username,
      password:this.loginForm.value.password,
      
    }
    this.authService.register(request).subscribe(
      (response) => {
        console.log(response);
        this.Registered = true;
      },
      (error) => {
        console.error(error);
        this.errorMessage = error.error.message;
      }
    );
  }

  GetWeather(){
    this.WeatherService.getWeatherDate().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
