import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-errorpage',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorpageComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    let user=localStorage.getItem('user');
    if(user==='HR'){
      this.router.navigate(['/hr'])
    }
    else if(user==='Employee'){
      this.router.navigate(['/employee'])
    }
    else{
      this.router.navigate(['/login'])
    }
  }

}
