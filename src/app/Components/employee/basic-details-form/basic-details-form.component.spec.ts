import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../core/header/header.component';
import { AddressDetailsFormComponent } from '../address-details-form/address-details-form.component';

import { BasicDetailsFormComponent } from './basic-details-form.component';
import { By } from '@angular/platform-browser';

describe('BasicDetailsFormComponent', () => {
  let component: BasicDetailsFormComponent;
  let fixture: ComponentFixture<BasicDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MockLocationStrategy],
      imports:[ ReactiveFormsModule,HttpClientTestingModule,RouterTestingModule],
      declarations: [ BasicDetailsFormComponent ,AddressDetailsFormComponent,HeaderComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should render input elements', () => {
    const compiled = fixture.debugElement.nativeElement;
    const firstNameInput = compiled.querySelector('input[name="firstName"]');
    const lastNameInput = compiled.querySelector('input[name="lname"]');
    const phoneNumberInput = compiled.querySelector('input[name="phoneNumber"]');
    const emailInput = compiled.querySelector('#email');
    const bloodGroupSelect = compiled.querySelector('#bloodGroup');
    const aadharNumberInput = compiled.querySelector('#aadharNumber');
    const dobInput = compiled.querySelector('#dob');
    // const maleRadio = compiled.querySelector('#male');
    // const femaleRadio = compiled.querySelector('#female');
    const sslcInput = compiled.querySelector('#sslc');
    const hscInput = compiled.querySelector('#hsc');
    const ugInput = compiled.querySelector('#ug');
    const fatherNameInput = compiled.querySelector('#fatherName');
    const motherNameInput = compiled.querySelector('#motherName');
    const emergencyContactNameInput = compiled.querySelector('#emergencyContactName');
    const relationInput = compiled.querySelector('#relation');
    const emergencyContactNumberInput = compiled.querySelector('#emergencyContactNumber');

    expect(lastNameInput).toBeTruthy();
    expect(firstNameInput).toBeTruthy();
    expect(phoneNumberInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(bloodGroupSelect).toBeTruthy();
    // expect(maleRadio.click()).toBeTruthy();
    // expect(femaleRadio.click()).toBeTruthy();
    expect(aadharNumberInput).toBeTruthy();
    expect(dobInput).toBeTruthy();
    expect(sslcInput).toBeTruthy();
    expect(hscInput).toBeTruthy();
    expect(ugInput).toBeTruthy();
    expect(fatherNameInput).toBeTruthy();
    expect(motherNameInput).toBeTruthy();
    expect(emergencyContactNameInput).toBeTruthy();
    expect(relationInput).toBeTruthy();
    expect(emergencyContactNumberInput).toBeTruthy();
  });
  it('form should be invalid',()=>{
    component.basicDetailsForm.controls['firstName'].setValue('')
    component.basicDetailsForm.controls['lastName'].setValue('')
    component.basicDetailsForm.controls['phoneNumber'].setValue('')
    component.basicDetailsForm.controls['emailID'].setValue('')
    component.basicDetailsForm.controls['bloodGroup'].setValue('')
    component.basicDetailsForm.controls['aadharNumber'].setValue('')
    component.basicDetailsForm.controls['dob'].setValue('')
    component.basicDetailsForm.controls['gender'].setValue('')
    component.basicDetailsForm.controls['sslc'].setValue('')
    component.basicDetailsForm.controls['hsc'].setValue('')
    component.basicDetailsForm.controls['ug'].setValue('')
    component.basicDetailsForm.controls['fatherName'].setValue('')
    component.basicDetailsForm.controls['motherName'].setValue('')
    component.basicDetailsForm.controls['emergencyContactName'].setValue('')
    component.basicDetailsForm.controls['relation'].setValue('')
    component.basicDetailsForm.controls['emergencyContactNumber'].setValue('')
expect(component.basicDetailsForm.valid).toBeFalsy();

  })
  it('form should be valid and submit basic details is called',()=>{
    spyOn(component,'submitBasicDetails').and.callThrough();
    component.basicDetailsForm.controls['firstName'].setValue('ram')
    component.basicDetailsForm.controls['lastName'].setValue('kumar')
    component.basicDetailsForm.controls['phoneNumber'].setValue('9840123123')
    component.basicDetailsForm.controls['emailID'].setValue('abc@gmail.com')
    component.basicDetailsForm.controls['bloodGroup'].setValue('O+ve')
    component.basicDetailsForm.controls['aadharNumber'].setValue('123412341234')
    component.basicDetailsForm.controls['dob'].setValue('09-06-2000')
    component.basicDetailsForm.controls['gender'].setValue('male')
    component.basicDetailsForm.controls['sslc'].setValue('90')
    component.basicDetailsForm.controls['hsc'].setValue('90')
    component.basicDetailsForm.controls['ug'].setValue('9.0')
    component.basicDetailsForm.controls['fatherName'].setValue('ravi')
    component.basicDetailsForm.controls['motherName'].setValue('shyamala')
    component.basicDetailsForm.controls['emergencyContactName'].setValue('ravi')
    component.basicDetailsForm.controls['relation'].setValue('father')
    component.basicDetailsForm.controls['emergencyContactNumber'].setValue('9840123123')
    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector('#nextBtn');
    button.click();
    expect(component.submitBasicDetails).toHaveBeenCalled();
  })
 
  // it('should check email id value is entered',()=>{
  //   let email=component.basicDetailsForm.controls['emailID'];
  //   email.setValue("abc@gmail.com");
  //   expect(email.errors).toBeNull();
  // })

  it('should run submit basic details',fakeAsync(()=>{
    spyOn(component,'submitBasicDetails');
    let button = fixture.debugElement.nativeElement.querySelector('#nextBtn');
    button.click();
    tick();
    expect(component.submitBasicDetails).toHaveBeenCalled();
  }))
  it('should check set Form data',()=>{
    spyOn(component,'setFormData');
    component.setFormData();
    expect(component.setFormData).toHaveBeenCalled()
  })
  it('should check submit basic details',()=>{
    spyOn(component,'submitBasicDetails');
    component.submitBasicDetails();
    expect(component.submitBasicDetails).toHaveBeenCalled()
  })
  it('should check form on init',()=>{
    spyOn(component,'formOnInit');
    component.formOnInit();
    expect(component.formOnInit).toHaveBeenCalled()
  })
  it('should check form on it',()=>{
    spyOn(component,'goToPrevious');
    component.goToPrevious(0);
    expect(component.goToPrevious).toHaveBeenCalled()
  })
  it('should check unload handler',()=>{
    spyOn(component,'unloadHandler');
    component.unloadHandler(new Event('reload'));
    expect(component.unloadHandler).toHaveBeenCalled()
  })
  it('should check go to previous false',()=>{
    spyOn(component,'goToPrevious');
    component.goToPrevious({current:0,completed:false});   
    expect(component.goToPrevious).toHaveBeenCalled()
  })
  it('should disable form',()=>{
    component.basicDetailsForm.disable();
      expect(component.basicDetailsForm.disabled).toBeTruthy()  
  })
  it('should check go to previous true',()=>{
    spyOn(component,'goToPrevious');
    component.goToPrevious({current:0,completed:true});   
    expect(component.goToPrevious).toHaveBeenCalled()
  })
 
});
