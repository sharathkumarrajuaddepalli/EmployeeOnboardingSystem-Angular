import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrModule } from './Components/hr/hr.module';
import { EmployeeModule } from './Components/employee/employee.module';
import { LoginModule } from './Components/login/login.module';
import { LoginformComponent } from './Components/login/login-form.component';
import { ErrorpageComponent } from './Components/core/error-page/error-page.component';
import { RolebasedguardService } from './Services/role-based-guard.service';
import { HRTableComponent } from './Components/hr/hr-table/hr-table.component';
import { BasicDetailsFormComponent } from './Components/employee/basic-details-form/basic-details-form.component';
import { RouteDeactivationGuardService } from './Services/route-deactivation-guard.service';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  { path: 'login',  component: LoginformComponent },
  { path: 'employee', component:BasicDetailsFormComponent, canDeactivate:[RouteDeactivationGuardService],data: {roles: [localStorage.getItem('user')]}},
  { path: 'hr',component:HRTableComponent,canActivate:[RolebasedguardService],data: {roles: ['HR']}},
  {path:'**', component:ErrorpageComponent},
];

@NgModule({

  imports: [
    HrModule,
    LoginModule,
    EmployeeModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
