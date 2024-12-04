import {Component, OnInit, ChangeDetectorRef, NgZone, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {InputComponent} from "../../shared/ui/input/input.component";
import {SelectComponent} from "../../shared/ui/select/select.component";
import {DateInputComponent} from "../../shared/ui/date/date.component";
import  {RegisterRepresentante} from "../../models/request/register.representante.model";
import {RegisterService} from "../../services/register/register.service";
import {adaptRegisRepresentative} from '../../adapters/register.representative.adapter';

@Component({
    selector: 'form-register',
    imports: [ReactiveFormsModule, InputComponent, SelectComponent, DateInputComponent],
    templateUrl: './form-register.component.html'
})
export class FormRegisterComponent implements OnInit {
    formRegister!: FormGroup;
    sendform = false;
    registerService = inject(RegisterService);


    constructor(private fb: FormBuilder) {
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
    }

    onSubmit() {
        this.sendform = true;
        if (this.formRegister.valid) {
            const adaptedData = adaptRegisRepresentative(this.formRegister.value);
            this.registerService.registerRepresentante(adaptedData).subscribe(
                (response) => {
                    console.log('Form submitted successfully:', response);
                },
                (error) => {
                    console.log('Form submission failed:', error);
                }
            )
        } else {
            console.log('Form submission failed: form has errors');
        }
    }

}
