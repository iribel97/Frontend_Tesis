import { Component, Input, Output, EventEmitter, OnInit, forwardRef, HostListener, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() id: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() minlength?: number;
  @Input() maxlength?: number;
  @Input() pattern?: string;
  @Input() min?: number | string;
  @Input() max?: number | string;
  @Input() enablePasswordValidation: boolean = false;
  @Output() valueChange = new EventEmitter<string>();
  @Output() errorsChange = new EventEmitter<{ id: string, errorMessage: string }>();

  inputControl: FormControl = new FormControl();
  inputClass: string = 'block w-full py-2 text-textMuted bg-white border rounded-lg px-4 focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40';
  showError: boolean = false;
  errorMessage: string = '';

  private onChange = (value: any) => { };
  private onTouched = () => { };

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const validators = this.buildValidators();
    this.inputControl = new FormControl(this.value, validators);

    this.inputControl.valueChanges.subscribe(value => {
      this.onChange(value);
      this.valueChange.emit(value);
      this.checkValidation();
      this.cdr.detectChanges();
    });

    this.inputControl.statusChanges.subscribe(() => {
      this.checkValidation();
      this.errorsChange.emit({ id: this.id, errorMessage: this.errorMessage });
      this.cdr.detectChanges();
    });
  }

  buildValidators() {
    console.log('inputControl', this.inputControl);
    console.log('pattern', this.pattern);
    const validators = [];
    if (this.required) {
      validators.push(Validators.required);
    }
    if (this.minlength !== undefined) {
      validators.push(Validators.minLength(this.minlength));
    }
    if (this.maxlength !== undefined) {
      validators.push(Validators.maxLength(this.maxlength));
    }
    if (this.pattern) {
      validators.push(Validators.pattern(this.pattern));
    }
    if (this.min !== undefined) {
      validators.push(Validators.min(Number(this.min)));
    }
    if (this.max !== undefined) {
      validators.push(Validators.max(Number(this.max)));
    }
    return validators;
  }

  checkValidation(): void {
    const errors = this.inputControl.errors;
    this.showError = !!errors;

    if (errors) {
      if (errors['required']) {
        this.errorMessage = 'Este campo es obligatorio';
      } else if (errors['minlength']) {
        this.errorMessage = `Debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
      } else if (errors['maxlength']) {
        this.errorMessage = `No debe exceder ${errors['maxlength'].requiredLength} caracteres`;
      } else if (errors['pattern']) {
        this.errorMessage = 'Formato inválido';
      } else if (errors['min']) {
        this.errorMessage = `Debe ser mayor o igual a ${errors['min'].min}`;
      } else if (errors['max']) {
        this.errorMessage = `Debe ser menor o igual a ${errors['max'].max}`;
      } else {
        this.errorMessage = 'Entrada inválida';
      }
    } else {
      this.errorMessage = '';
    }
  }

  // Métodos necesarios para ControlValueAccessor
  writeValue(value: any): void {
    if (value !== undefined) {
      this.inputControl.setValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.inputControl.disable() : this.inputControl.enable();
  }

  // Agregar el @HostListener para escuchar el evento keypress
  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent): boolean {

    // Si no hay patrón definido, permitimos todas las teclas
    if (!this.pattern) {
      return true;
    }

    // Creamos una expresión regular basada en el patrón proporcionado
    const regex = new RegExp(this.pattern);

    // Si la tecla presionada no coincide con el patrón, evitamos que se ingrese
    if (!regex.test(event.key)) {
      event.preventDefault();  // Evita que se ingrese el carácter no permitido
      return false;
    }

    // Si la tecla coincide con el patrón, permitimos el ingreso
    return true;
  }
}
