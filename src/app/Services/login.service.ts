import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public login$: Subject<any> = new Subject();
  constructor(private http: HttpClient) { }
  checkUser = (data: any) => {
    return  this.http.post("http://localhost:8082/login", data);
  };
  
}
