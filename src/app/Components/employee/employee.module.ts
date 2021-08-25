import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressDetailsFormComponent } from './address-details-form/address-details-form.component';
import { BasicDetailsFormComponent } from './basic-details-form/basic-details-form.component';


@NgModule({
  declarations: [
    AddressDetailsFormComponent,
    BasicDetailsFormComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
