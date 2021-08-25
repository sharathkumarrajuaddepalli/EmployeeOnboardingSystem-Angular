import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Employees } from '../../../Interfaces/employees';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HrService } from 'src/app/Services/hr.service';



@Component({
  selector: 'app-hrtable',
  templateUrl: './hr-table.component.html',
  styleUrls: ['./hr-table.component.css']
})
export class HRTableComponent implements OnInit, OnDestroy {
 
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    confirm("Reload Home Page?");
    event.returnValue = false;
  }

  notify: Boolean = false;
  edit: Boolean = false;
  invite: Boolean = false;
  view: Boolean = false;
  reject: Boolean = false;
  error:boolean=true;
  current!: Number;
  employees: any;
  notifyText: String = "";
  dtTrigger: Subject<any> = new Subject<any>();
  reasonForm!: FormGroup;
  isSubmitted: Boolean = false;
  employee: any
  constructor(private httpClient: HttpClient, private fb: FormBuilder, private hr: HrService) { }

  ngOnInit(): void {

    this.RejectFormInitalize()
      this.getEmployeeData()
  }
  RejectFormInitalize():void{
    this.reasonForm = this.fb.group(
      {
        reason: ["",
          [
            Validators.required
          ]
        ],
      })
  }
  getEmployeeData():void{
    this.hr.getEmployees();
    this.hr.employees$.subscribe((data) => {
      this.employees = data;
      console.log(data);
      this.employees.forEach((element:any) => {
        let data=element.createdAt;
        let date=data.split("T");
        element.createdAt=date[0];
      });
      this.dtTrigger.next();
      if (this.employees.length <= 0) {
        this.notifyText = "Employee data loading failed";
        this.error=!this.error
        this.notify = !this.notify
      }
     
    });
  }
  backToViewModal() {
    this.reject = !this.reject;
    this.openViewModal(this.current);
  }
  closeNotification(closeModalEvent: Boolean) {
    this.notify = closeModalEvent;
    this.edit = closeModalEvent;
  }
  closeViewModal(closeDetailsView: Boolean) {
    this.view = closeDetailsView;
  }
  rejectViewModal(rejectReasonView: Boolean) {
    this.reject = rejectReasonView;
  }
 

  submitRejectForm(): void {
    this.isSubmitted = true;
    if (this.reasonForm.valid) {
      var updatestatus={
        action:"reject",
        empId:this.current,
        rejectReason:this.reason?.value
      }
      this.hr.rejectEmployeeData(updatestatus).subscribe((data:any)=>{
      if (data === true){
        this.reject = false;
      }
     })
     
    }
  }
  get reason() {
    return this.reasonForm.get("reason");
  }
  closeRejectModal() {
    this.reject = false;
  }

  openViewModal(status: Number): void {
    this.current = status;
    this.employees.forEach((data:any) => {
      if (data.empId === this.current) {
        this.employee = data
      }
    })
    this.view = !this.view
  }
  closeInvite(closeInviteEvent: Boolean) {
    this.invite = closeInviteEvent;
  }
  openInvite(): void {
    this.invite = !this.invite
  }
  openNotificationModal(type:boolean,id:Number): void {
    if(type){
      console.log(id);
      this.hr.notifyEmployee(id).subscribe((data:any)=>{
        if (data === true){
          this.reject = false;
        }
       })
    this.notifyText = "User Notified Successfully"
    this.notify = !this.notify;
    }
    else{
      this.notifyText = "Edit access provided"
      this.edit = !this.edit;
    }
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
