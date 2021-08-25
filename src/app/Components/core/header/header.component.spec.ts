import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
let router = {
  navigate: jasmine.createSpy('navigate')
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ RouterTestingModule],
      declarations: [ HeaderComponent ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be calling logout method',fakeAsync(()=>{
    spyOn(component,'logout');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(component.logout).toHaveBeenCalled();
  }))
  it('should check logout method',()=>{
    spyOn(component,'logout');
    component.logout();
    expect(component.logout).toHaveBeenCalled()
  })
  it('should redirect to login route',()=>{
    component.logout()
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  })
});


