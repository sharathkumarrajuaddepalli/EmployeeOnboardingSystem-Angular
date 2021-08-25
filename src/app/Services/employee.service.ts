import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common'
import { first } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {  
  public employee$: Subject<any> = new Subject();
  public response$: Subject<any> = new Subject();


  basicDetails: any;
  addressDetails: any;
  employeeDetails: any;

  baseurl="http://localhost:8082/employee/";

  

  constructor(private http: HttpClient,public datepipe: DatePipe) { }
  datePipeImplementation(date:any){
    date=new Date();
    let latest_date =this.datepipe.transform(date, 'yyyy-MM-dd');
   }
  getEmployeeDetails() {
    var user=localStorage.getItem('id');
    this.http.get(this.baseurl+`${user}`).subscribe(data=>{
    this.employee$.next(data);
  })
    const addressDetails= [
      {
        area: "chepauk",
        country: "India",
        district: "chennai",
        flatName: "sfa",
        mapCoordinates: "12341.123N,123.12E",
        pincode: 600006,
        state: "Tamilnadu",
        street: "cnk",
        type: "permanent"
      },{
        area: "chepauk",
        country: "India",
        district: "chennai",
        flatName: "sfa",
        mapCoordinates: "12341.123N,123.12E",
        pincode: 600006,
        state: "Tamilnadu",
        street: "cnk",
        type: "present"
      }
     
    ]
  this.setAddressDetails(addressDetails);
}
  register(data:any,presentAddressID:Number,permanentAddressID:Number){
    let address=[
      { 
        "addressId": presentAddressID,
        "type":"present",
        "flatNumber":data.presentAddress.flatName,
         "area":data.presentAddress.area,
         "city":data.presentAddress.city,
         "country":data.presentAddress.country,
         "state":data.presentAddress.state,
         "streetName":data.presentAddress.streetName,
         "pincode":Number(data.presentAddress.pinCode),
         "mapCoordinates":data.presentAddress.mapCoordinates
      },
      { "addressId": permanentAddressID,
        "type":"permanent",
        "flatNumber":data.permanentAddress.flatName,
         "area":data.permanentAddress.area,
         "city":data.permanentAddress.city,
         "country":data.permanentAddress.country,
         "state":data.permanentAddress.state,
         "streetName":data.permanentAddress.streetName,
         "pincode":Number(data.permanentAddress.pinCode),
         "mapCoordinates":data.permanentAddress.mapCoordinates
       
      }
    ]
    console.log(address)
    //this.setAddressDetails(address)
    this.employeeDetails={
      "action":"submit",
      "empId":localStorage.getItem('id'),
      "aadharNumber": this.basicDetails.aadharNumber,
      "bloodGroup": this.basicDetails.bloodGroup,
      "dob": this.datepipe.transform(this.basicDetails.dob, 'yyyy-MM-dd'),
      // "emailID":  this.basicDetails.emailID,
      "emergencyContactName":  this.basicDetails.emergencyContactName,
      "emergencyContactNumber": this.basicDetails.emergencyContactNumber,
      "fatherName": this.basicDetails.fatherName,
      "name": this.basicDetails.firstName+" "+this.basicDetails.lastName,
      "gender": this.basicDetails.gender,
      "hsc": parseFloat(this.basicDetails.hsc),
      "lastName": this.basicDetails.lastName,
     "motherName": this.basicDetails.motherName,
      "phoneNumber": this.basicDetails.phoneNumber,
      "emergencyContactRelation": this.basicDetails.relation,
      "sslc": parseFloat(this.basicDetails.sslc),
      "ug": parseFloat(this.basicDetails.ug),
    "addressList":address
  };
    console.log(this.employeeDetails);
    console.log("successfull call");
    return this.http.put(this.baseurl+'details',this.employeeDetails)

  }
  save(data:any,presentAddressID:Number,permanentAddressID: Number){
   
    let address=[
      {
        "addressId": presentAddressID,
        "type":"present",
        "flatNumber":data.presentAddress.flatName,
         "area":data.presentAddress.area,
         "city":data.presentAddress.city,
         "country":data.presentAddress.country,
         "state":data.presentAddress.state,
         "streetName":data.presentAddress.streetName,
         "pincode":Number(data.presentAddress.pinCode),
         "mapCoordinates":data.presentAddress.mapCoordinates
      },
      {
        "addressId": permanentAddressID,
        "type":"permanent",
        "flatNumber":data.permanentAddress.flatName,
         "area":data.permanentAddress.area,
         "city":data.permanentAddress.city,
         "country":data.permanentAddress.country,
         "state":data.permanentAddress.state,
         "streetName":data.permanentAddress.streetName,
         "pincode":Number(data.permanentAddress.pinCode),
         "mapCoordinates":data.permanentAddress.mapCoordinates
       
      }
    ]
    
    this.setAddressDetails(address)
    this.employeeDetails={
      "action":"save",
      "empId":localStorage.getItem('id'),
      "aadharNumber": this.basicDetails.aadharNumber,
      "bloodGroup": this.basicDetails.bloodGroup,
      "dob": this.datepipe.transform(this.basicDetails.dob, 'yyyy-MM-dd'),
      // "emailID":  this.basicDetails.emailID,
      "emergencyContactName":  this.basicDetails.emergencyContactName,
      "emergencyContactNumber": this.basicDetails.emergencyContactNumber,
      "fatherName": this.basicDetails.fatherName,
      "name": this.basicDetails.firstName+" "+this.basicDetails.lastName,
      "gender": this.basicDetails.gender,
      "hsc": parseFloat(this.basicDetails.hsc),
      "lastName": this.basicDetails.lastName,
     "motherName": this.basicDetails.motherName,
      "phoneNumber": this.basicDetails.phoneNumber,
      "emergencyContactRelation": this.basicDetails.relation,
      "sslc": parseFloat(this.basicDetails.sslc),
      "ug": parseFloat(this.basicDetails.ug),
    "addressList":address
  };
  console.log(this.employeeDetails)
   return this.http.put(this.baseurl+'details',this.employeeDetails)

  }
  setBasicDetails(details:any) {
    this.basicDetails = details;
    
  }
  getBasicDetails() {
    return this.basicDetails;
  }
  setAddressDetails(details:any) {
    this.addressDetails = details;
  }

  getAddressDetails() {
    return this.addressDetails;
  }
}