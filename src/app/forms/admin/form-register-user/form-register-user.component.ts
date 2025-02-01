import { Component, OnInit, ChangeDetectorRef, NgZone, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AdminService } from '../../../services/admin/admin.service';
import { DatapikerComponent } from '../../../shared/ui/datapiker/datapiker.component';
import { InputComponent } from '../../../shared/ui/input/input.component';
import { SelectComponent } from '../../../shared/ui/select/select.component';
import { ToastComponent } from '../../../shared/ui/toast/toast.component';

@Component({
  selector: 'form-register-user',
  imports: [ReactiveFormsModule, 
    InputComponent, 
    SelectComponent, 
    DatapikerComponent, 
    ToastComponent],
  templateUrl: './form-register-user.component.html'
})
export class FormRegisterUserComponent implements OnInit {
  @ViewChild('toast', { static: true }) toast!: ToastComponent;
  @Output() userAdded = new EventEmitter<any>(); // Emitir evento cuando se agrega un usuario
  formErrors: { [key: string]: string } = {};
  formRegister!: FormGroup;
  sendform = false;

  genderOptions: { id: number; name: string }[] = [
    { id: 1, name: 'Masculino' },
    { id: 2, name: 'Femenino' }
  ];

  roleOptions: { id: number; name: string }[] = [
    { id: 1, name: 'Administrador' },
    { id: 2, name: 'Institucional' },
    { id: 3, name: 'Docente' }
  ];

  constructor(private fb: FormBuilder,
              private cdr: ChangeDetectorRef,
              private ngZone: NgZone,
              private adminService: AdminService) { }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      cedula: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      rol: ['', Validators.required],
      titulo: [''],
      especialidad: [''],
      aniosExperiencia: ['']
    });

    this.formRegister.get('rol')?.valueChanges.subscribe((value) => {
      this.onRoleChange(value);
    });
  }

  onSubmit() {
    this.sendform = true;
  
    if (this.formRegister.invalid) {
      this.formErrors = this.getFormErrors();
      console.log('Form has errors:', this.formErrors);
    } else {
      const mappedData = this.mapFormData(this.formRegister.value);
  
      this.adminService.registerUser(mappedData.rol, mappedData).subscribe(
        (response) => {
          this.userAdded.emit(response); // Emitir evento cuando se agrega un usuario
          this.formRegister.reset();
          this.sendform = false;
        },
        (error) => {
          console.error('Error al agregar el usuario:', error);
          this.toast.showToast('error', error.error.detalles, error.error.mensaje, 10000);
        }
      );
    }
  }

  mapFormData(formData: any): any {
    return {
      cedula: formData.cedula,
      nombres: formData.nombres,
      apellidos: formData.apellidos,
      correo: formData.correo,
      telefono: formData.telefono,
      direccion: formData.direccion,
      nacimiento: formData.fechaNacimiento,
      genero: formData.genero.name,
      rol: formData.rol,
      titulo: formData.titulo,
      especialidad: formData.especialidad,
      aniosExperiencia: formData.aniosExperiencia
    };
  }

  onRoleChange(role: string): void {
    console.log(' entro al metodo Role changed:', role);
    const tituloControl = this.formRegister.get('titulo');
    const especialidadControl = this.formRegister.get('especialidad');
    const aniosExperienciaControl = this.formRegister.get('aniosExperiencia');

    if (role === 'Docente') {
      tituloControl?.setValidators([Validators.required]);
      especialidadControl?.setValidators([Validators.required]);
      aniosExperienciaControl?.setValidators([Validators.required]);
    } else {
      tituloControl?.clearValidators();
      especialidadControl?.clearValidators();
      aniosExperienciaControl?.clearValidators();
    }

    tituloControl?.updateValueAndValidity();
    especialidadControl?.updateValueAndValidity();
    aniosExperienciaControl?.updateValueAndValidity();
  
    // Ensure the form detects the changes
    this.cdr.detectChanges();
  }

  getFormErrors(): { [key: string]: string } {
    const errors: { [key: string]: string } = {};
    Object.keys(this.formRegister.controls).forEach(key => {
      const controlErrors = this.formRegister.get(key)?.errors;
      if (controlErrors) {
        errors[key] = Object.keys(controlErrors).map(errorKey => errorKey).join(', ');
      }
    });
    return errors;
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