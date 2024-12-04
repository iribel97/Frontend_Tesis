import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {InputComponent} from "../../shared/ui/input/input.component";

@Component({
    selector: 'app-form-login',
    imports: [
        ReactiveFormsModule,
        InputComponent,
    ],
    templateUrl: './form-login.component.html',
    styleUrl: './form-login.component.css'
})
export class FormLoginComponent implements OnInit {


    formErrors: { [key: string]: string } = {};
    sendform = false;
    formLogin!: FormGroup;

    constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private ngZone: NgZone) {
    }

    ngOnInit(): void {
        this.formLogin = this.fb.group({
            user: [''],
            password: [''],
        });
        this.formLogin.valueChanges.subscribe(() => {
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
}
