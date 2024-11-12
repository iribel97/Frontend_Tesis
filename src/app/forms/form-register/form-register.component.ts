import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import {NgForOf, NgIf} from "@angular/common";
import {InputComponent} from "../../shared/ui/input/input.component";


@Component({
  selector: 'form-register',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, NgIf, InputComponent, NgForOf],
  templateUrl: './form-register.component.html',
})
export class FormRegisterComponent implements OnInit {
  registerForm!: FormGroup;
  formErrors: string[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z ]*')
      ]],
      cedula: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]{10}$')
      ]]
    });

    console.log('Formulario inicializado:', this.registerForm);
  }

  onSubmit(): void {
    console.log('Método onSubmit llamado');

    if (this.registerForm.invalid) {
      this.formErrors = [];
      const detailedErrors: { field: string; errors: ValidationErrors | null; }[] = [];

      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        const controlErrors = control?.errors;
        if (control && control.invalid) {
          detailedErrors.push({
            field: key,
            errors: control.errors
          });

          if (controlErrors) {
            Object.keys(controlErrors).forEach(keyError => {
              if (keyError === 'required') {
                this.formErrors.push(`${key} es obligatorio`);
              } else if (keyError === 'minlength') {
                this.formErrors.push(`${key} debe tener al menos ${controlErrors[keyError].requiredLength} caracteres`);
              } else if (keyError === 'maxlength') {
                this.formErrors.push(`${key} no debe exceder ${controlErrors[keyError].requiredLength} caracteres`);
              } else if (keyError === 'pattern') {
                this.formErrors.push(`${key} tiene un formato inválido`);
              }
            });
          }
        }
      });

      console.log('Errores del formulario:', this.formErrors);
      console.log('Errores detallados del formulario:', detailedErrors);

      return; // Sale de la función porque el formulario es inválido
    } else {
      console.log('Formulario válido', this.registerForm.value);
    }
  }

  onButtonClick(): void {
    console.log('Método onButtonClick llamado');
    if (this.registerForm.invalid) {
      this.formErrors = [];
      Object.keys(this.registerForm.controls).forEach(key => {
        const controlErrors = this.registerForm.get(key)?.errors;
        if (controlErrors) {
          Object.keys(controlErrors).forEach(keyError => {
            if (keyError === 'required') {
              this.formErrors.push(`${key} es obligatorio22222`);
            } else if (keyError === 'minlength') {
              this.formErrors.push(`${key} debe tener al menos ${controlErrors[keyError].requiredLength} caracteres222`);
            } else if (keyError === 'maxlength') {
              this.formErrors.push(`${key} no debe exceder ${controlErrors[keyError].requiredLength} caracteres2222`);
            } else if (keyError === 'pattern') {
              this.formErrors.push(`${key} tiene un formato inválido22222`);
            }
          });
        }
      });

      console.log('Errores del formulario:', this.formErrors);
    }
  }
}