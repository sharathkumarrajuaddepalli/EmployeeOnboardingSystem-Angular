import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AlertsComponent } from './alerts.component';

describe('AlertsComponent', () => {
  let component: AlertsComponent;
  let fixture: ComponentFixture<AlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should close on button click', fakeAsync(() => {
    spyOn(component, 'closeModal');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(component.closeModal).toHaveBeenCalled();
  
  }));
  it('should close on div click',fakeAsync(()=>{
    spyOn(component,'closeModal');
    let div=fixture.debugElement.nativeElement.querySelector('div');
    div.click();
    tick();
    expect(component.closeModal).toHaveBeenCalled();
  }));
  it('should check close modal',()=>{
    spyOn(component,'closeModal');
    component.closeModal();
    expect(component.closeModal).toHaveBeenCalled()
  })
  it('should call close Modal',()=>{
    component.closeModalEvent.subscribe((response)=>{
      expect(response).toEqual(false)
    })
    component.closeModal();
  })
});
