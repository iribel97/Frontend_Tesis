import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {InputComponent} from "../../shared/ui/input/input.component";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

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

    constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private ngZone: NgZone,
                private authService: AuthService, private router: Router) {
    }

    ngOnInit(): void {
        this.formLogin = this.fb.group({
            cedula: [''],
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
            this.authService.login(this.formLogin.value).subscribe(response => {
                this.router.navigate(['/home']);
            }, error => {
                console.error('Login error:', error);
            });
        }
    }
}
