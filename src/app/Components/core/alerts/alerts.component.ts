import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modals',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  constructor() { }
  @Input()
  content: String = "";
  @Input()
  type:Boolean=true
  @Output()
  closeModalEvent = new EventEmitter<Boolean>();
  close: Boolean = false;

  ngOnInit(): void {
  }
  closeModal(): void {
    this.closeModalEvent.emit(false);
  }

}
