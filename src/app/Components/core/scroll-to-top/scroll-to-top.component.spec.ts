import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ScrollToTopComponent } from './scroll-to-top.component';

describe('ScrollToTopComponent', () => {
  let component: ScrollToTopComponent;
  let fixture: ComponentFixture<ScrollToTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollToTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollToTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be calling Scroll method',()=>{
    spyOn(component,'scrollToTop').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#scroll');
    button.click();
    expect(component.scrollToTop).toHaveBeenCalled();
  })
});
