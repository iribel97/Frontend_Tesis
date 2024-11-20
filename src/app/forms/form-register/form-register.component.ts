import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgForOf, NgIf } from "@angular/common";
import { InputComponent } from "../../shared/ui/input/input.component";

@Component({
  selector: 'form-register',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, NgIf, NgForOf],
  templateUrl: './form-register.component.html',
})
export class FormRegisterComponent implements OnInit {
  formErrors: { [key: string]: string } = {};
  formRegister!: FormGroup;
  sendform = false;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      ci: [''],
      name: [''],
      last_name: [''],
      email: [''],
      password: [''],
      phone: [''],
      address: [''],
      birth_date: [''],
      gender: [''],
      company: [''],
      company_phone: [''],
      company_address: [''],
    });
    this.formRegister.valueChanges.subscribe(() => {
      this.ngZone.run(() => {
        this.cdr.detectChanges();
      });
    });
  }

  onSubmit() {
    this.sendform = true;
    if (Object.keys(this.formErrors).length > 0) {
      console.log('Form has errors:', this.formErrors);
    } else {
      console.log('Form submitted successfully');
    }
  }

  onErrorsChange(event: { id: string, errorMessage: string }) {
    if (event.errorMessage) {
      this.formErrors[event.id] = event.errorMessage;
    } else {
      delete this.formErrors[event.id];
    }
    this.cdr.detectChanges(); // Trigger change detection manually
  }

  getFormErrorsKeys(): string[] {
    return Object.keys(this.formErrors);
  }
}
