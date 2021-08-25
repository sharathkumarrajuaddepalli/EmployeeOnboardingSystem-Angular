import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-loginform',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginformComponent implements OnInit {


  status: Boolean = false;
  loginForm!: FormGroup;
  errorMessage = {
    userName: {
      empty: "UserName is required",
      valid: "Enter valid Username"
    },
    password: {
      empty: "Password is required",
      minLegth: "Password must have atleast 5 characters",
      pattern: "Numbers only allowed",
    },
  };
  userNameErrorMsg: String = "";
  passwordErrorMsg: String = "";
  isSubmitted: Boolean = false;
  constructor(private loginService: LoginService, http: HttpClient, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.LoginFormInitalize()
  }
  LoginFormInitalize():void{
    this.loginForm = this.fb.group({
      userName: ["",
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}"),
          Validators.minLength(8),
        ],
      ],
    });
  }
  get userName() {
    return this.loginForm.get("userName");
  }

  get password() {
    return this.loginForm.get("password");
  }
  loginMethod(): void {
    this.isSubmitted = true
    if (this.loginForm.valid) {
      this.loginService.checkUser({email: this.userName?.value, password: this.password?.value}).subscribe((data: any) => {
        
          if(data.roleName==='HR'){
            localStorage.setItem('user', data.roleName);
            this.router.navigate(['/hr']) 
          }
          else{
            
            localStorage.setItem('id', data.userId);
            localStorage.setItem('user', data.roleName);
            localStorage.setItem('type',data.userType);
            this.router.navigate(['/employee'])
          }
        
    })
    }
  }

}
