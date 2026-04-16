import { Component, OnInit, ChangeDetectorRef, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from "../../shared/ui/input/input.component";
import { SelectComponent } from "../../shared/ui/select/select.component";
import { DatapikerComponent } from "../../shared/ui/datapiker/datapiker.component";
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";
import { ToastComponent } from "../../shared/ui/toast/toast.component";
import { NgForOf, NgIf } from '@angular/common';

@Component({
    selector: 'form-register',
    imports: [ReactiveFormsModule,
        ToastComponent,
        NgForOf,
        NgIf
    ],
    templateUrl: './form-register.component.html'
})
export class FormRegisterComponent implements OnInit {
    @ViewChild('toast', { static: true }) toast!: ToastComponent;
    formErrors: { [key: string]: string } = {};
    formRegister!: FormGroup;
    sendform = false;
    currentStep = 1;

    genderOptions: any[] = [
        { id: 1, name: 'Masculino' },
        { id: 2, name: 'Femenino' }
    ];

    constructor(private fb: FormBuilder,
        private cdr: ChangeDetectorRef,
        private ngZone: NgZone,
        private authService: AuthService,
        private router: Router) {
    }

    ngOnInit(): void {
        this.formRegister = this.fb.group({
            ci: ['' ],
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

    nextStep(): void {
        if (this.currentStep < 2) {
            this.currentStep++;
        }
    }

    previousStep(): void {
        if (this.currentStep > 1) {
            this.currentStep--;
        }
    }

    onSubmit(): void {
        this.sendform = true;

        if (this.formRegister.invalid) {
            console.log('Form has errors:', this.formRegister.errors);
            this.formRegister.markAllAsTouched(); // Marcar todos los campos como tocados para mostrar errores
        } else {
            // Transformar el formato del formulario
            const mappedData = this.mapFormData(this.formRegister.value);

            console.log('Mapped form data:', mappedData);
            this.authService.registerRepresentative(mappedData).subscribe(response => {
                this.router.navigate(['/home']);
            }, error => {
                this.toast.showToast('error', error.error.detalles, error.error.mensaje, 10000); // Show toast message
                console.error('Registration error:', error);
            });
        }
    }

    // Método para mapear los datos del formulario al formato esperado
    mapFormData(formData: any): any {
        return {
            cedula: formData.ci, // Mapea "ci" a "cedula"
            nombres: formData.name, // Mapea "name" a "nombres"
            apellidos: formData.last_name, // Mapea "last_name" a "apellidos"
            correo: formData.email, // Mapea "email" a "correo"
            password: formData.password, // Mapea "password" a "password"
            telefono: formData.phone, // Mapea "phone" a "telefono"
            direccion: formData.address, // Mapea "address" a "direccion"
            nacimiento: formData.birth_date, // Mapea "birth_date" a "nacimiento"
            genero: formData.gender, // Mapea "gender" a "genero"
            empresa: formData.company, // Mapea "company" a "empresa"
            direccionEmpresa: formData.company_address, // Mapea "company_address" a "direccionEmpresa"
            telefonoEmpresa: formData.company_phone // Mapea "company_phone" a "telefonoEmpresa"
        };
    }

    onErrorsChange(event: { id: string, errorMessage: string }): void {
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