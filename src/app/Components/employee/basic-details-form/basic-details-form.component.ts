import { Component, HostListener, OnInit } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/Services/dialog.service';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-basic-details-form',
  templateUrl: './basic-details-form.component.html',
  styleUrls: ['./basic-details-form.component.css']
})
export class BasicDetailsFormComponent implements OnInit {
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    confirm("Reload Employee Form?");
    event.returnValue = false;
  }
  current: number = 0;
  isDisabled: Boolean = false;
  basicDetailsForm!: FormGroup;
  basicDetails: any;
  constructor(private fb: FormBuilder, private employeeService: EmployeeService, public dialogService: DialogService) { }
  submitted: Boolean = false;

  ngOnInit(): void {
    this.formOnInit();
    if(localStorage.getItem('type')==="updated"){
    this.employeeService.getEmployeeDetails();
    this.employeeService.employee$.subscribe(data => {
      let fname = data.name.split(" ");
      let dobd = data.dob.split("T");
      var basicDetails = {
        firstName: fname[0],
        lastName: fname[1],
        aadharNumber: data.aadharNumber,
        bloodGroup: data.bloodGroup,
        dob: dobd[0],
        emailID: data.emailId,
        emergencyContactName: data.emergencyContactName,
        emergencyContactNumber: data.emergencyContactNumber,
        relation: data.emergencyContactRelation,
        fatherName: data.fatherName,
        gender: data.gender,
        hsc: data.hsc,
        motherName: data.motherName,
        phoneNumber: data.phoneNumber,
        sslc: data.sslc,
        ug: data.ug
      };
      
      this.basicDetails = basicDetails;
      this.setFormData();
      // if(data.status==='Pending'){
      //   this.basicDetailsForm.disable()
      // }
      this.employeeService.setBasicDetails(this.basicDetails);
    })
  }
  }

  goToPrevious(goToPrevious: any) {
    this.current = goToPrevious.current;
  }
  formOnInit() {
    this.basicDetailsForm = this.fb.group({
      firstName: new FormControl("",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z]*$"),
        ]
      ),

      lastName: new FormControl("",
        [
          Validators.required,
          Validators.pattern("[a-zA-Z]*")
        ],
      ),

      phoneNumber: new FormControl("",
        [
          Validators.required,
          Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
        ],
      ),

      emailID: new FormControl("",
        [
          Validators.required,
          Validators.email
        ],
      ),

      bloodGroup: new FormControl("",
        [
          Validators.required,
        ]),

      aadharNumber: new FormControl("",
        [
          Validators.required,
          Validators.pattern("[0-9]*"),
          Validators.minLength(12),
          Validators.maxLength(12)
        ]),

      dob: new FormControl("",
        [
          Validators.required
        ]),
      gender: new FormControl("",
        [
          Validators.required
        ]),

      sslc: new FormControl("",
        [
          Validators.required
        ]),

      hsc: new FormControl("",
        [
          Validators.required
        ]),

      ug: new FormControl("",
        [
          Validators.required
        ]),

      fatherName: new FormControl("",
        [
          Validators.required,
          Validators.pattern("[a-zA-Z]*")
        ]),

      motherName: new FormControl("",
        [
          Validators.required,
          Validators.pattern("[a-zA-Z]*")
        ]),
      emergencyContactName: new FormControl("",
        [
          Validators.required,
          Validators.pattern("[a-zA-Z]*")
        ]),

      relation: new FormControl("",
        [
          Validators.required,
          Validators.pattern("[a-zA-Z]*")
        ]),

      emergencyContactNumber: new FormControl("",
        [
          Validators.required,
          Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),

        ]),

    })
  }
  canDeactivate(): Observable<boolean> | boolean {

    if (this.submitted === false && this.basicDetailsForm.dirty) {

      return this.dialogService.confirm('Discard changes for the Employee Details?');
    }
    return true;
  }
  submitBasicDetails() {
    this.submitted = true;
    if (this.basicDetailsForm.valid || this.isDisabled === true) {
      let form = this.basicDetailsForm.getRawValue();
      this.employeeService.setBasicDetails(form);
      this.current = 1;
    }
  }
  get firstName() {
    return this.basicDetailsForm.get("firstName");
  }
  get lastName() {
    return this.basicDetailsForm.get("lastName");
  }
  get phoneNumber() {
    return this.basicDetailsForm.get("phoneNumber");
  }
  get emailID() {
    return this.basicDetailsForm.get("emailID");
  }
  get bloodGroup() {
    return this.basicDetailsForm.get("bloodGroup");
  }
  get gender() {
    return this.basicDetailsForm.get("gender");
  }
  get aadharNumber() {
    return this.basicDetailsForm.get("aadharNumber");
  }
  get dob() {
    return this.basicDetailsForm.get("dob");
  }
  get sslc() {
    return this.basicDetailsForm.get("sslc");
  }
  get hsc() {
    return this.basicDetailsForm.get("hsc");
  }
  get ug() {
    return this.basicDetailsForm.get("ug");
  }
  get fatherName() {
    return this.basicDetailsForm.get("fatherName");
  }
  get motherName() {
    return this.basicDetailsForm.get("motherName");
  }
  get emergencyContactName() {
    return this.basicDetailsForm.get("emergencyContactName");
  }
  get relation() {
    return this.basicDetailsForm.get("relation");
  }
  get emergencyContactNumber() {
    return this.basicDetailsForm.get("emergencyContactNumber");
  }
  setFormData() {
    this.basicDetailsForm.setValue({
      firstName: this.basicDetails.firstName,
      lastName: this.basicDetails.lastName,
      phoneNumber: this.basicDetails.phoneNumber,
      emailID: this.basicDetails.emailID,
      gender: this.basicDetails.gender,
      bloodGroup: this.basicDetails.bloodGroup,
      aadharNumber: this.basicDetails.aadharNumber,
      dob: this.basicDetails.dob,
      sslc: this.basicDetails.sslc,
      hsc: this.basicDetails.hsc,
      ug: this.basicDetails.ug,
      fatherName: this.basicDetails.fatherName,
      motherName: this.basicDetails.motherName,
      emergencyContactName: this.basicDetails.emergencyContactName,
      relation: this.basicDetails.relation,
      emergencyContactNumber: this.basicDetails.emergencyContactNumber
    });
  }

}
