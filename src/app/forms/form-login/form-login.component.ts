import {ChangeDetectorRef, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {InputComponent} from "../../shared/ui/input/input.component";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {ToastComponent} from "../../shared/ui/toast/toast.component";

@Component({
    selector: 'app-form-login',
    imports: [
        ReactiveFormsModule,
        InputComponent,
        ToastComponent,
    ],
    templateUrl: './form-login.component.html',
    styleUrl: './form-login.component.css'
})
export class FormLoginComponent implements OnInit {
    @ViewChild('toast', { static: true }) toast!: ToastComponent;
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
                if (response.rolUsuario === 'Admin') {
                    this.router.navigate(['admin/dashboard']);
                } else if (response.rolUsuario === 'Institucional') {
                    this.router.navigate(['institutional/dashboard']);
                } else if (response.rolUsuario === 'Docente') {
                    this.router.navigate(['teacher/dashboard']);
                } else if (response.rolUsuario === 'Estudiante') {
                    this.router.navigate(['student/dashboard']);
                } else if (response.rolUsuario === 'Representante') {
                    this.router.navigate(['representative/dashboard']);
                } else {
                    this.router.navigate(['home']);
                }
            }, error => {
                this.toast.showToast('error', error.error.detalles,error.error.mensaje,10000); // Show toast message
                console.error('Login error:', error);
            });
        }
    }
}
