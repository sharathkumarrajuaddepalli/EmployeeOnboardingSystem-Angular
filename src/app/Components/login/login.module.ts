import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginformComponent } from './login-form.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';



@NgModule({
  declarations: [
    LoginformComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[LoginService]
})
export class LoginModule { }
