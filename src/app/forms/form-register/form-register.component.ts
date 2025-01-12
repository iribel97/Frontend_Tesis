import {Component, OnInit, ChangeDetectorRef, NgZone, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {InputComponent} from "../../shared/ui/input/input.component";
import {SelectComponent} from "../../shared/ui/select/select.component";
import {DatapikerComponent} from "../../shared/ui/datapiker/datapiker.component";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {ToastComponent} from "../../shared/ui/toast/toast.component";

@Component({
    selector: 'form-register',
    imports: [ReactiveFormsModule, InputComponent, SelectComponent, DatapikerComponent, ToastComponent],
    templateUrl: './form-register.component.html'
})
export class FormRegisterComponent implements OnInit {
    @ViewChild('toast', {static: true}) toast!: ToastComponent;
    formErrors: { [key: string]: string } = {};
    formRegister!: FormGroup;
    sendform = false;

    genderOptions: { id: number; name: string }[] = [
        {id: 1, name: 'Masculino'},
        {id: 2, name: 'Femenino'}
    ];

    constructor(private fb: FormBuilder,
                private cdr: ChangeDetectorRef,
                private ngZone: NgZone,
                private authService: AuthService,
                private router: Router,) {
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
            // Transformar el formato del formulario
            const mappedData = this.mapFormData(this.formRegister.value);

            console.log('Mapped form data:', mappedData);
            this.authService.registerRepresentative(mappedData).subscribe(responde => {
                    this.router.navigate(['/home']);
                }, error => {
                    this.toast.showToast('error', error.error.detalles, error.error.mensaje, 10000); // Show toast message
                    console.error('Login error:', error);
                }
            );

            // Aquí envías `mappedData` al backend
            // ejemplo: this.httpClient.post('url-endpoint', mappedData).subscribe(...)
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
            genero: formData.gender?.name || '', // Extrae solo `name` de `gender`
            ocupacion: 'Ocupación x', // Si no existe en el formulario, coloca un valor por defecto
            empresa: formData.company, // Mapea "company" a "empresa"
            direccionEmpresa: formData.company_address, // Mapea "company_address" a "direccionEmpresa"
            telefonoEmpresa: formData.company_phone // Mapea "company_phone" a "telefonoEmpresa"
        };
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
