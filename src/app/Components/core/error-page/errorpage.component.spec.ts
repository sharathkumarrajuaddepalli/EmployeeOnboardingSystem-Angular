import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { localStorageMock } from 'src/app/Interfaces/localStorageMock';
import { ErrorpageComponent } from './error-page.component';

describe('ErrorpageComponent', () => {
  let component: ErrorpageComponent;
  let fixture: ComponentFixture<ErrorpageComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule],
      declarations: [ ErrorpageComponent ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  });
  
 
  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
   
    var store = localStorage;

    spyOn(localStorage, 'getItem').and.callFake( (key:string):string => {
     return  store[key] || null;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key:string):void =>  {
      delete store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
      return store[key] = <string>value;
    });
    spyOn(localStorage, 'clear').and.callFake(() =>  {
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should redirect to hr route',()=>{
    routerSpy.navigate(['/hr'])
    localStorage.setItem('user','HR');
    if(localStorage.getItem('user')==='HR')
      expect (routerSpy.navigate).toHaveBeenCalledWith(['/hr']);
  })
  it('should redirect to employee route',()=>{
    routerSpy.navigate(['/employee'])
    localStorage.setItem('user','Employee');
    if(localStorage.getItem('user')==='Employee')
      expect (routerSpy.navigate).toHaveBeenCalledWith(['/employee']);
  })
  it('should redirect to login route',()=>{
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  })
});
