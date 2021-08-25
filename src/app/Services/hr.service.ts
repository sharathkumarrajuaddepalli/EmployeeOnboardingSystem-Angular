import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HrService {
  public roles$: Subject<any> = new Subject();
  public employees$: Subject<any>=new Subject();

  baseurl="http://localhost:8082/hr/";
  constructor(private http: HttpClient) { }
  getRoles(){
   return this.http.get(this.baseurl+"roles").subscribe(data=>{
     this.roles$.next(data);
   })
    
  }
  
  getEmployees(){
    return this.http.get(this.baseurl+'employees').subscribe(data=>{
      this.employees$.next(data);
    })
  }
  createEmployee(data:any){
    console.log(data);
    return this.http.post(this.baseurl+'employee',data);
  }
  rejectEmployeeData(data:any){
    return this.http.put(this.baseurl+'action',data)
  }
  notifyEmployee(data:any){
    return this.http.post(this.baseurl+`/notification/${data}`,data);
  }
  
}
