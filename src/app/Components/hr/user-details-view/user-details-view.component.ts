import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HrService } from 'src/app/Services/hr.service';

@Component({
  selector: 'app-userdetailsview',
  templateUrl: './user-details-view.component.html',
  styleUrls: ['./user-details-view.component.css']
})
export class UserdetailsviewComponent implements OnInit {

  @Input()
  employeeDetails: any;
  @Output()
  closeDetailsView = new EventEmitter<Boolean>();
  @Output()
  rejectReasonView = new EventEmitter<Boolean>();
  basicDetails: Boolean = true;
  addressDetails: Boolean = false;
  approve:Boolean=false;
  notifyText: String = "";
  constructor( private hr: HrService) { }

  ngOnInit(): void {
  }
  approveData(userid:String): void {
    var updatestatus={
      action:"approve",
      empId:this.employeeDetails.empId,
      rejectReason:null
    }
    this.hr.rejectEmployeeData(updatestatus).subscribe((data:any)=>{
      if (data === true){
        this.closeDetailsView.emit(false);
        this.rejectReasonView.emit(false);
      }
     })
  
  }
  openDetails(type:String) {
    if(type==="Basic"){
    this.addressDetails = false
    this.basicDetails = true;
  }
  else{
    this.addressDetails = true
    this.basicDetails = false;
  }

  }
  closeNotificationModal(type:Boolean): void {
    if(type){
      this.closeDetailsView.emit(false);
      this.rejectReasonView.emit(true);
    }
    else{
      this.closeDetailsView.emit(false);
      this.rejectReasonView.emit(false);
    }
   
  }
}
