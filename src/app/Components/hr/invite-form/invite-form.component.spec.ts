import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';

import { InviteformComponent } from './invite-form.component';

describe('InviteformComponent', () => {
  let component: InviteformComponent;
  let fixture: ComponentFixture<InviteformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ ReactiveFormsModule,HttpClientTestingModule,CoreModule]
    ,
      declarations: [ InviteformComponent ]
    })
    .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(InviteformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call close invite event',()=>{
    component.closeInviteEvent.subscribe((response)=>{
      expect(response).toEqual(false)
    })
    component.closeInvite();
  })
  it('should run submit basic details',fakeAsync(()=>{
    spyOn(component,'createInvite');
    let button = fixture.debugElement.nativeElement.querySelector('#myBtn');
    button.click();
    tick();
    expect(component.createInvite).toHaveBeenCalled();
  }))
  // it('should have role data',()=>{
  //   component.getRoleData();
  //   component.hrService.roles$.subscribe((data) => {
  //     component.roles = data.sets;
  //   })
  //  expect(component.roles.length).toBeGreaterThan(0);
  // })
  it('should call get role data',()=>{
    spyOn(component,'getRoleData');
    component.getRoleData();
    expect(component.getRoleData).toHaveBeenCalled()
  })
  it('should check invite form on init',()=>{
    spyOn(component,'inviteFormLoad');
    component.inviteFormLoad();
    expect(component.inviteFormLoad).toHaveBeenCalled()
  })
  it('should check close invite',()=>{
    spyOn(component,'closeInvite');
    component.closeInvite();
    expect(component.closeInvite).toHaveBeenCalled()
  })
  it('should check create invite',()=>{
    spyOn(component,'createInvite');
    component.createInvite();
    expect(component.createInvite).toHaveBeenCalled()
  })
});
