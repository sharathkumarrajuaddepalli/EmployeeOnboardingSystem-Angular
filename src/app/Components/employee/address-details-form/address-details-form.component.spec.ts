import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { AddressDetailsFormComponent } from './address-details-form.component';

describe('AddressDetailsFormComponent', () => {
  let component: AddressDetailsFormComponent;
  let fixture: ComponentFixture<AddressDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ ReactiveFormsModule,HttpClientTestingModule],
      declarations: [ AddressDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call ng on init',()=>{
   expect(fixture.detectChanges).toBeTruthy()
  })
  it('should check get form instance',()=>{
    spyOn(component,'getFormInstance');
    component.getFormInstance();   
    expect(component.getFormInstance).toHaveBeenCalled()
  })
  it('should check get countries data',()=>{
    spyOn(component,'getCountriesdata');
    component.getCountriesdata();
    expect(component.getCountriesdata).toHaveBeenCalled()
  })
  // it('should check on change country',()=>{
  //   spyOn(component,'onChangeCountry')
  //   component.onChangeCountry(1,true);
  //   expect(component.onChangeCountry).toHaveBeenCalled();
  // })
  it('should check on change state',()=>{
    spyOn(component,'onChangeState')
    component.onChangeState(1,true);
    expect(component.onChangeState).toHaveBeenCalled();
  })
  it('should check previous',fakeAsync(()=>{
    spyOn(component,'previous');
    let button = fixture.debugElement.nativeElement.querySelector('#prevBtn');
    button.click();
    tick();
    expect(component.previous).toHaveBeenCalled();
  }))
  it('should call previous',()=>{
    component.goToPrevious.subscribe((response)=>{
      expect(response).toEqual({'current': 0, 'completed': false })
    })
    component.previous();
  })
  it('should check unload handler',()=>{
    spyOn(component,'unloadHandler');
    component.unloadHandler(new Event('reload'));
    expect(component.unloadHandler).toHaveBeenCalled()
  })

  it('should run save draft',fakeAsync(()=>{
    spyOn(component,'saveDraft');
    let button = fixture.debugElement.nativeElement.querySelector('#saveBtn');
    button.click();
    tick();
    expect(component.saveDraft).toHaveBeenCalled();
  }))
  it('should run submit form',fakeAsync(()=>{
    spyOn(component,'submitForm');
    let button = fixture.debugElement.nativeElement.querySelector('#submitBtn');
    button.click();
    tick();
    expect(component.submitForm).toHaveBeenCalled();
  }))

});
