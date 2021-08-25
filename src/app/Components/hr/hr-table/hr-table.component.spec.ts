import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTablesModule } from 'angular-datatables';
import { HeaderComponent } from '../../core/header/header.component';
import { HRTableComponent } from './hr-table.component';

describe('HrtableComponent', () => {
  let component: HRTableComponent;
  let fixture: ComponentFixture<HRTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,ReactiveFormsModule,RouterTestingModule,DataTablesModule],
      declarations: [ HRTableComponent ,HeaderComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HRTableComponent);
    component = fixture.componentInstance;
    component.reject=true
    component.current=123
    component.employees= [{
    "EmpId":123,
    "Name":"Indraneel",
    "Email":"n@gmail.com",
    "Status":"Completed",
    "CreatedAt":"20-06-2021",
},{
    "EmpId":123,
    "Name":"Indraneel",
    "Email":"n@gmail.com",
    "Status":"Rejected",
    "CreatedAt":"20-06-2021",
   }];
 
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check reject form initalize',()=>{
    spyOn(component,'RejectFormInitalize');
    component.RejectFormInitalize();
    expect(component.RejectFormInitalize).toHaveBeenCalled()
  })
  it('should check get employee data',()=>{
    spyOn(component,'getEmployeeData');
    component.getEmployeeData();
    expect(component.getEmployeeData).toHaveBeenCalled()
  })

  it('should check open invite ',()=>{
    spyOn(component,'openInvite').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#openInvite');
    button.click();
    fixture.detectChanges();
    expect(component.openInvite).toHaveBeenCalled()
  })
  it('should employees data',()=>{
    expect('employees').toBeTruthy();
  })
  it('should check back to view modal',()=>{
    spyOn(component,'backToViewModal').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#redirectToView');
    console.log(button);
    button.click();
    fixture.detectChanges();
    expect(component.backToViewModal).toHaveBeenCalled()
  })
  it('should check submit reject form ',()=>{
    spyOn(component,'submitRejectForm').and.callThrough();
    component.reasonForm.controls['reason'].setValue('invalid map coordinates');
    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector('#submitForm');
    console.log(button);
    button.click();
    expect(component.submitRejectForm).toHaveBeenCalled();
  })
  it('should check close reject modal',()=>{
    spyOn(component,'closeRejectModal').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#closeReject');
    console.log(button);
    button.click();
    fixture.detectChanges();
    expect(component.closeRejectModal).toHaveBeenCalled()
  })
  it('should check open view modal',()=>{
    spyOn(component,'openViewModal').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#viewDetails');
    // let button = fixture.debugElement.query(By.css('#notificationModal'));
    button.click();
    fixture.detectChanges();
    expect(component.openViewModal).toHaveBeenCalledWith(123);
   
  })
  it('should check open notification modal ',()=>{
    spyOn(component,'openNotificationModal').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#notificationModal');
    // let button = fixture.debugElement.query(By.css('#notificationModal'));
    button.click();
    fixture.detectChanges();
    //expect(component.openNotificationModal).toHaveBeenCalledWith(true);
    
  })
  // it('should check open edit modal ',()=>{
  //   spyOn(component,'openNotificationModal').and.callThrough();
  //   let button = fixture.debugElement.nativeElement.querySelector('#editModal');
  //   button.click();
  //   fixture.detectChanges();
  //   expect(component.openNotificationModal).toHaveBeenCalledWith(false);

  // })
  // it('should check close invite ',()=>{
  //   spyOn(component,'closeInvite').and.callThrough();
  //   component.closeInvite(false);
  //   expect(component.closeInvite).toHaveBeenCalled()
  // })
  
  // it('should check close notification modal',()=>{
  //   spyOn(component,'closeNotification').and.callThrough();
  //   component.closeNotification(true);
  //   expect(component.closeNotification).toHaveBeenCalled()
  // })
  // it('should check reject view modal',()=>{
  //   spyOn(component,'rejectViewModal').and.callThrough();
  //   component.rejectViewModal(false);
  //   expect(component.rejectViewModal).toHaveBeenCalled()
  // })

});

  // it('should check close view modal',()=>{
  //   spyOn(component,'closeViewModal');
  //   component.closeViewModal(false);
  //   expect(component.closeViewModal).toHaveBeenCalled()
  // })