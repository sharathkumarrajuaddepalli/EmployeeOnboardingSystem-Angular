import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Role } from '../../../Interfaces/role';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HrService } from 'src/app/Services/hr.service';
@Component({
  selector: 'app-inviteform',
  templateUrl: './invite-form.component.html',
  styleUrls: ['./invite-form.component.css']
})
export class InviteformComponent implements OnInit {

  constructor(private fb: FormBuilder, public hrService: HrService) { }
  @Input()
  open: Boolean = false;
  @Output()
  closeInviteEvent = new EventEmitter<Boolean>();
  inviteForm!: FormGroup;
  public roles: any;



  close: Boolean = false;
  isSubmitted: Boolean = false;
  isLoaded: Boolean = true;

  ngOnInit(): void {
    this.getRoleData();
    this.inviteFormLoad()
  }
  getRoleData() {
    this.hrService.getRoles();
    this.hrService.roles$.subscribe((data:any) => {
      this.roles = data;
      if (this.roles.length > 0) {
        this.isLoaded = true
      }
      else {
        this.isLoaded = false
      }
    });
  }
  inviteFormLoad() {
    this.inviteForm = this.fb.group({
      name: ["",
        [
          Validators.required
        ]
      ],
      email: ["",
        [
          Validators.required,
          Validators.email
        ]
      ],
      role: ["",
        [
          Validators.required
        ]
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}"),
          Validators.minLength(8),
        ],
      ],
    });
  }
  get name() {
    return this.inviteForm.get("name");
  }
  get email() {
    return this.inviteForm.get("email");
  }
  get role() {
    return this.inviteForm.get("role");
  }
  get password() {
    return this.inviteForm.get("password");
  }
  closeInvite(): void {
    this.open = !this.open
    this.closeInviteEvent.emit(false);
  }
  createInvite(): void {
    this.isSubmitted = true;
    if (this.inviteForm.valid) {
      let form = JSON.stringify(this.inviteForm.getRawValue());
      let parseform = JSON.parse(form)
      this.hrService.createEmployee(parseform).subscribe((data:any) => {
        if (data === true) {
          this.open = !this.open
          this.closeInviteEvent.emit(false);
        }
      })

    }
  }
}
