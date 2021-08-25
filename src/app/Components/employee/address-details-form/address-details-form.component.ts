import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { distinctUntilChanged, startWith, switchMap, tap } from 'rxjs/operators';
import { CountryStateDataService } from 'src/app/Services/country-state-data.service';
import { DialogService } from 'src/app/Services/dialog.service';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-address-details-form',
  templateUrl: './address-details-form.component.html',
  styleUrls: ['./address-details-form.component.css'],

})
export class AddressDetailsFormComponent implements OnInit {
  static getFormData() {
    throw new Error('Method not implemented.');
  }
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    confirm("Reload Employee Form?");
    event.returnValue = false;
  }

  @Input()
  current: number = 0;
  @Output() goToPrevious = new EventEmitter<any>();
  presentStateInfo: any[] = [];
  permanentStateInfo: any[] = [];
  presentCountryInfo: any[] = [];
  permanentCountryInfo: any[] = [];
  addressDetailsForm!: FormGroup;
  submitted: Boolean = false;
  notify: Boolean = false;
  draft: Boolean = false;
  stateName: String = "";
  countryName: String = "";
  presentStateName: String = "";
  presentCountryName: String = "";
  permanentStateName: String = "";
  permanentCountryName: String = "";
  permanentStateCode!:any;
  permanentCountryCode!:any;
  sameAddress:Boolean=false;
  public isSameAddressControl: FormControl = new FormControl(false);
  notifyText: string = "";
  addressDetails:any;
  presentDataChange:Boolean=false;
  presentAddressID!:Number;
  permanentAddressID!:Number;
  permanentDataChange:Boolean=false;
  presetPresentData:Boolean =localStorage.getItem('type')==="updated";
  presetPermanentData:Boolean =localStorage.getItem('type')==="updated";
  constructor(private country: CountryStateDataService, private fb: FormBuilder, private employeeService: EmployeeService, public dialogService: DialogService) { }
  canDeactivate(): Observable<boolean> | boolean {

    if (!this.submitted && this.addressDetailsForm.touched) {

      return this.dialogService.confirm('Discard changes for the Employee Details?');
    }
    return true;
  }
  ngOnInit(): void {

    this.getFormInstance()
    if(localStorage.getItem('type')==="updated"){
      this.employeeService.getEmployeeDetails();
      this.employeeService.employee$.subscribe(data => {
      
      var addressDetails = {
        presentAddress: {
          flatName: "",
          area: "",
          city: "",
          country: "",
          state: "",
          streetName: "",
          pinCode: "",
          mapCoordinates: ""
        },
        permanentAddress:
        {
          flatName: "",
          area: "",
          city: "",
          country: "",
          state: "",
          streetName: "",
          pinCode: "",
          mapCoordinates: ""
        }

      };
      for (let list of data.addressList) {
        if (list.type === "permanent") {
          this.permanentAddressID=list.addressId
          addressDetails.permanentAddress.area = list.area;
          addressDetails.permanentAddress.city = list.city;
          addressDetails.permanentAddress.country = list.country;
          addressDetails.permanentAddress.state = list.state;
          addressDetails.permanentAddress.streetName = list.streetName;
          addressDetails.permanentAddress.mapCoordinates = list.mapCoordinates;
          addressDetails.permanentAddress.pinCode = list.pincode;
          addressDetails.permanentAddress.flatName = list.flatNumber;

        }
        else if(list.type === "present") {
          this.presentAddressID=list.addressId
          addressDetails.presentAddress.area = list.area;
          addressDetails.presentAddress.city = list.city;
          addressDetails.presentAddress.country = list.country;
          addressDetails.presentAddress.state = list.state;
          addressDetails.presentAddress.streetName = list.streetName;
          addressDetails.presentAddress.mapCoordinates = list.mapCoordinates;
          addressDetails.presentAddress.pinCode = list.pincode;
          addressDetails.presentAddress.flatName = list.flatNumber;
        }
      }
      this.addressDetails=addressDetails;
      this.employeeService.setAddressDetails(addressDetails);
      this.setFormData(addressDetails);
      this.presetPermanentData=true;
    })}
    this.getCountriesdata();
      }

      getFormData(){
        if(localStorage.getItem('type')==="updated"){
          this.employeeService.getEmployeeDetails();
          this.employeeService.employee$.subscribe(data => {
          
          var addressDetails = {
            presentAddress: {
              flatName: "",
              area: "",
              city: "",
              country: "",
              state: "",
              streetName: "",
              pinCode: "",
              mapCoordinates: ""
            },
            permanentAddress:
            {
              flatName: "",
              area: "",
              city: "",
              country: "",
              state: "",
              streetName: "",
              pinCode: "",
              mapCoordinates: ""
            }
    
          };
          for (let list of data.addressSet) {
            if (list.type === "permanent") {
              this.permanentAddressID=list.addressId
              addressDetails.permanentAddress.area = list.area;
              addressDetails.permanentAddress.city = list.city;
              addressDetails.permanentAddress.country = list.country;
              addressDetails.permanentAddress.state = list.state;
              addressDetails.permanentAddress.streetName = list.streetName;
              addressDetails.permanentAddress.mapCoordinates = list.mapCoordinates;
              addressDetails.permanentAddress.pinCode = list.pincode;
              addressDetails.permanentAddress.flatName = list.flatNumber;
    
            }
            else if(list.type === "present") {
              this.presentAddressID=list.addressId
              addressDetails.presentAddress.area = list.area;
              addressDetails.presentAddress.city = list.city;
              addressDetails.presentAddress.country = list.country;
              addressDetails.presentAddress.state = list.state;
              addressDetails.presentAddress.streetName = list.streetName;
              addressDetails.presentAddress.mapCoordinates = list.mapCoordinates;
              addressDetails.presentAddress.pinCode = list.pincode;
              addressDetails.presentAddress.flatName = list.flatNumber;
            }
          }
          this.addressDetails=addressDetails;
          this.employeeService.setAddressDetails(addressDetails);
          this.setFormData(addressDetails);
          this.presetPermanentData=true;
        })}
      }
  closeNotificationModal(closeModalEvent: Boolean) {
    this.notify = closeModalEvent;
    this.draft = closeModalEvent;
  }
  onPresentChangeCountry(countryValue: any, type: Boolean) {
    if(localStorage.getItem('type')==="updated"){
      this.presentDataChange=true
      this.presetPresentData=false
    }
      this.presentStateInfo = this.presentCountryInfo[countryValue].States;
      this.presentCountryName = this.presentCountryInfo[countryValue].CountryName;
   
  }
  onPermanentChangeCountry(countryValue: any, type: Boolean){
    if(localStorage.getItem('type')==="updated"){
    this.permanentDataChange=true
    this.presetPermanentData=false
    }
    this.permanentCountryCode=countryValue;
    this.permanentStateInfo = this.permanentCountryInfo[countryValue].States;
    this.permanentCountryName = this.permanentCountryInfo[countryValue].CountryName;
  }

  onChangeState(stateValue: any, type: Boolean) {
    if (type) {
      this.presentStateName = this.presentStateInfo[stateValue].StateName;
    }
    else {
      this.permanentStateName = this.permanentStateInfo[stateValue].StateName;

      this.permanentStateCode=stateValue;

    }
  }
  saveDraft() {
    let form = JSON.stringify(this.addressDetailsForm.getRawValue());
    let parseForm = JSON.parse(form)
    if (this.sameAddress===true) {
      this.permanentCountryName = this.presentCountryName;
      this.permanentStateName=this.presentStateName;
    }
    if(localStorage.getItem('type') === "new user"){
      parseForm.presentAddress.country = this.presentCountryName;
      parseForm.presentAddress.state = this.presentStateName;
      parseForm.permanentAddress.state = this.permanentStateName;
      parseForm.permanentAddress.country = this.permanentCountryName;
      }
      if(localStorage.getItem('type') === "updated"){
        if(this.presentDataChange===false && this.permanentDataChange===false){
          parseForm.presentAddress.country = this.addressDetails.presentAddress.country;
          parseForm.presentAddress.state = this.addressDetails.presentAddress.state;
          parseForm.permanentAddress.state =this.addressDetails.permanentAddress.country;
          parseForm.permanentAddress.country = this.addressDetails.permanentAddress.state;
        }
        if(this.permanentDataChange===true && this.presentDataChange===false){
          if(this.permanentStateName!==""){
          parseForm.presentAddress.country = this.addressDetails.presentAddress.country;
          parseForm.presentAddress.state = this.addressDetails.presentAddress.state;
          parseForm.permanentAddress.state = this.permanentStateName;
          parseForm.permanentAddress.country = this.permanentCountryName;
          }
          if(this.permanentStateName===""){
            parseForm.presentAddress.country = this.addressDetails.presentAddress.country;
            parseForm.presentAddress.state = this.addressDetails.presentAddress.state;
            parseForm.permanentAddress.state = this.addressDetails.permanentAddress.state;
            parseForm.permanentAddress.country =this.addressDetails.permanentAddress.country;
            }
        }
        if(this.presentDataChange===true && this.permanentDataChange===false || (this.presentDataChange===true && this.permanentDataChange===true)) {
          if(this.permanentStateName!==""){   
                parseForm.presentAddress.country = this.presentCountryName;
                parseForm.presentAddress.state = this.presentStateName;
                parseForm.permanentAddress.state = this.permanentStateName;
                parseForm.permanentAddress.country = this.permanentCountryName;
          }
          if(this.permanentStateName===""){
            parseForm.presentAddress.country = this.presentCountryName;
            parseForm.presentAddress.state = this.presentStateName;
            parseForm.permanentAddress.state = this.addressDetails.permanentAddress.state;
            parseForm.permanentAddress.country = this.addressDetails.permanentAddress.country;
          }
        }

      }
     this.employeeService.save(parseForm,this.presentAddressID,this.permanentAddressID).subscribe((data:any)=>{
      if(data.success==true){
        this.draft = !this.draft;
      this.notifyText = "User Details has been saved";
      }
      
     })
  }
  previous(): void {
    this.goToPrevious.emit({ 'current': 0 });
  }
  submitForm(): void {
    this.submitted = true;
    if (this.addressDetailsForm.valid) {
      let form = JSON.stringify(this.addressDetailsForm.getRawValue());
      let parseform = JSON.parse(form)
      if (this.sameAddress===true) {
        this.permanentCountryName = this.presentCountryName;
        this.permanentStateName=this.presentStateName;
      }
      if(localStorage.getItem('type') === "new user"){
      parseform.presentAddress.country = this.presentCountryName;
      parseform.presentAddress.state = this.presentStateName;
      parseform.permanentAddress.state = this.permanentStateName;
      parseform.permanentAddress.country = this.permanentCountryName;
      }
      if(localStorage.getItem('type') === "updated"){
        if(this.presentDataChange===false && this.permanentDataChange===false){
          parseform.presentAddress.country = this.addressDetails.presentAddress.country;
          parseform.presentAddress.state = this.addressDetails.presentAddress.state;
          parseform.permanentAddress.state =this.addressDetails.permanentAddress.country;
          parseform.permanentAddress.country = this.addressDetails.permanentAddress.state;
        }
        if(this.permanentDataChange===true && this.presentDataChange===false){
          if(this.permanentStateName!==""){
          parseform.presentAddress.country = this.addressDetails.presentAddress.country;
          parseform.presentAddress.state = this.addressDetails.presentAddress.state;
          parseform.permanentAddress.state = this.permanentStateName;
          parseform.permanentAddress.country = this.permanentCountryName;
          }
          if(this.permanentStateName===""){
            parseform.presentAddress.country = this.addressDetails.presentAddress.country;
            parseform.presentAddress.state = this.addressDetails.presentAddress.state;
            parseform.permanentAddress.state = this.addressDetails.permanentAddress.state;
            parseform.permanentAddress.country =this.addressDetails.permanentAddress.country;
            }
        }
        if(this.presentDataChange===true && this.permanentDataChange===false || (this.presentDataChange===true && this.permanentDataChange===true)) {
          if(this.permanentStateName!==""){   
                parseform.presentAddress.country = this.presentCountryName;
                parseform.presentAddress.state = this.presentStateName;
                parseform.permanentAddress.state = this.permanentStateName;
                parseform.permanentAddress.country = this.permanentCountryName;
          }
          if(this.permanentStateName===""){
            parseform.presentAddress.country = this.presentCountryName;
            parseform.presentAddress.state = this.presentStateName;
            parseform.permanentAddress.state = this.addressDetails.permanentAddress.state;
            parseform.permanentAddress.country = this.addressDetails.permanentAddress.country;
          }
        }

      }
      this.employeeService.register(parseform,this.presentAddressID,this.permanentAddressID).subscribe((data:any)=>{
        if (data) {
              this.notify = true;
              this.notifyText = "User Details has been forwarded Successfully";
              this.submitted = false;
            }
            else {
              this.notify = true;
              this.notifyText = "User Details has some issues";
            }
      })
    }
  }
  getFormInstance() {
    this.addressDetailsForm = this.fb.group({
      presentAddress: new FormGroup({
        flatName: new FormControl("",
          [
            Validators.required

          ]
        ),

        streetName: new FormControl("",
          [
            Validators.required
          ]
        ),

        area: new FormControl("",
          [
            Validators.required
          ]
        ),
        country: new FormControl("",
          [
            Validators.required
          ]
        ),
        state: new FormControl("",
          [
            Validators.required
          ]
        ),
        city: new FormControl("",
          [
            Validators.required
          ]
        ),

        mapCoordinates: new FormControl("",
          [
            Validators.required
          ]
        ),

        pinCode: new FormControl("",
          [
            Validators.required,
            Validators.pattern("^[0-9]*$"),
            Validators.minLength(6),
            Validators.maxLength(6)
          ]
        ),

      }),

      permanentAddress: new FormGroup({
        flatName: new FormControl("",
          [
            Validators.required

          ]
        ),

        streetName: new FormControl("",
          [
            Validators.required
          ]
        ),

        area: new FormControl("",
          [
            Validators.required
          ]
        ),
        country: new FormControl("",
          [
            Validators.required
          ]
        ),
        state: new FormControl("",
        [
          Validators.required
        ]
      ),
        city: new FormControl("",
          [
            Validators.required
          ]
        ),
        mapCoordinates: new FormControl("",
          [
            Validators.required
          ]
        ),

        pinCode: new FormControl("",
          [
            Validators.required,
            Validators.pattern("^[0-9]*$"),
            Validators.minLength(6),
            Validators.maxLength(6)
          ]
        ),

      }),
    })
    this.isSameAddressControl.valueChanges.pipe(distinctUntilChanged(),
      switchMap(isSameAddress => {
        this.sameAddress=!this.sameAddress;
        if (isSameAddress) {
          return this.addressDetailsForm.get('presentAddress')!
            .valueChanges
            .pipe(
              startWith(this.addressDetailsForm.get('presentAddress')!.value),
              tap(value =>
                this.addressDetailsForm.get('permanentAddress')!.setValue(value)
              )
            )
        }else {
          if(localStorage.getItem('type')==='updated'){
            this.setFormData(this.addressDetails);
            return EMPTY;

          }
          else{
          this.addressDetailsForm.get('permanentAddress')!.reset();
          return EMPTY;
          }
        }
      })
    )
      .subscribe();
  }
  getCountriesdata() {
    this.country.getAllCountriesSubject();
    this.country.countryData$.subscribe(data => {
      this.permanentCountryInfo = data.Countries;
      this.presentCountryInfo = data.Countries
      if (this.presentCountryInfo.length === 0) {
        this.notify = true;
        this.notifyText = "Country data failed to load";
      }
    }, err => {
      console.log(err)

    },
    )
  }

  get PresentAddress(){
    return this.addressDetailsForm.get("presentAddress");
  }
  get PermanentAddress(){
    return this.addressDetailsForm.get("permanentAddress");
  }
  setFormData(data:any){
   this.PresentAddress?.setValue(data.presentAddress)
   this.PermanentAddress?.setValue(data.permanentAddress)
  }
}