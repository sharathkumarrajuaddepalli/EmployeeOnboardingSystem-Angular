import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable ,Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryStateDataService {
  public countryData$:Subject<any> = new Subject();
  url: string = "https://raw.githubusercontent.com/sagarshirbhate/Country-State-City-Database/master/Contries.json";


  constructor(private http: HttpClient) { }

  getAllCountriesSubject() {
    return this.http.get(this.url).subscribe(data =>{
      this.countryData$.next(data); 
    });
 }

}
