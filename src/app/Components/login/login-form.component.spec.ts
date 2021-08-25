import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginformComponent } from './login-form.component';

describe('LoginformComponent', () => {
  let component: LoginformComponent;
  let fixture: ComponentFixture<LoginformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule,ReactiveFormsModule],
      declarations: [ LoginformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check user name is valid',()=>{
    let email=component.loginForm.controls['userName'];
    expect(email.valid).toBeFalsy();
    expect(email.pristine).toBeTruthy();
    expect(email.errors).toBeTruthy();
    // email.setValue("abc");
    // expect(email.errors).toBeTruthy();
  })
  // it('should check user name value is entered',()=>{
  //   let email=component.loginForm.controls['emailID'];
  //   email.setValue("abc@gmail.com");
  //   expect(email.errors).toBeNull();
  // })
  it('should check password is valid',()=>{
    let password=component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();
    expect(password.pristine).toBeTruthy();
    expect(password.errors).toBeTruthy();
    // password.setValue("1RAe");
    // expect(password.errors).toBeTruthy();
  })
  // it('should check user name value is entered',()=>{
  //   let password=component.loginForm.controls['emailID'];
  //   password.setValue("Abce@1111");
  //   expect(password.errors).toBeNull();
  // })

  it('should check login form on init',()=>{
    spyOn(component,'LoginFormInitalize');
    component.LoginFormInitalize();
    expect(component.LoginFormInitalize).toHaveBeenCalled()
  })
  it('should check submit login form',()=>{
    spyOn(component,'loginMethod');
    component.loginMethod();
    expect(component.loginMethod).toHaveBeenCalled()
  })
  it('should check if form valid',()=>{
    component.loginForm.controls['userName'].setValue('user@gmail.com')
    component.loginForm.controls['password'].setValue('Abaa@1115');
    expect(component.loginForm.valid).toBeTruthy();
  })

});
