import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HRTableComponent } from './hr-table/hr-table.component';
import { CoreModule } from '../core/core.module';
import { DataTablesModule } from 'angular-datatables';
import { InviteformComponent } from './invite-form/invite-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserdetailsviewComponent } from './user-details-view/user-details-view.component';
import { HrService } from 'src/app/Services/hr.service';

@NgModule({
  declarations: [
    HRTableComponent,
    InviteformComponent,
    UserdetailsviewComponent
  ],
  imports: [
    CommonModule, CoreModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HrService]
})
export class HrModule { }
