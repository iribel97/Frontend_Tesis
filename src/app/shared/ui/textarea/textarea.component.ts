import { Component, Input, Output, EventEmitter, OnInit, forwardRef, HostListener, NgZone } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from "@angular/common";

@Component({
  selector: 'ui-textarea',
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './textarea.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    }
  ]
})
export class TextareaComponent implements OnInit, ControlValueAccessor {
  @Input() id: string = '';
  @Input() rows: number = 4; // Número de filas por defecto
  @Input() cols: number = 50; // Número de columnas por defecto
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() minlength?: number;
  @Input() maxlength?: number;
  @Input() permissivePattern?: string; // Patrón permitido para caracteres
  @Input() sendform: boolean = false;
  @Output() valueChange = new EventEmitter<string>();
  @Output() errorsChange = new EventEmitter<{ id: string, errorMessage: string }>();

  textareaControl: FormControl = new FormControl();
  textareaClass: string = 'block w-full py-2 text-textMuted bg-white border rounded-lg px-4 focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40';
  showError: boolean = false;
  errorMessage: string = '';

  private onChange = (value: any) => { };
  private onTouched = () => { };

  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {
    const validators = this.buildValidators();
    this.textareaControl = new FormControl(this.value, validators);

    this.textareaControl.valueChanges.subscribe(value => {
      this.ngZone.run(() => {
        this.onChange(value);
        this.valueChange.emit(value);
        this.checkValidation();
      });
    });

    this.textareaControl.statusChanges.subscribe(() => {
      this.ngZone.run(() => {
        this.checkValidation();
        this.errorsChange.emit({ id: this.id, errorMessage: this.errorMessage });
      });
    });
  }

  buildValidators() {
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
    return validators;
  }

  checkValidation(): void {
    const errors = this.textareaControl.errors;
    this.showError = !!errors;

    if (errors) {
      if (errors['required']) {
        this.errorMessage = 'Este campo es obligatorio';
      } else if (errors['minlength']) {
        this.errorMessage = `Debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
      } else if (errors['maxlength']) {
        this.errorMessage = `No debe exceder ${errors['maxlength'].requiredLength} caracteres`;
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
      this.textareaControl.setValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.textareaControl.disable() : this.textareaControl.enable();
  }

  // Agregar el @HostListener para escuchar el evento keypress
  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent): boolean {
    // Si no hay patrón definido, permitimos todas las teclas
    if (!this.permissivePattern) {
      return true;
    }

    // Creamos una expresión regular basada en el patrón proporcionado
    const regex = new RegExp(this.permissivePattern);

    // Si la tecla presionada no coincide con el patrón, evitamos que se ingrese
    if (!regex.test(event.key)) {
      event.preventDefault();  // Evita que se ingrese el carácter no permitido
      return false;
    }

    // Si la tecla coincide con el patrón, permitimos el ingreso
    return true;
  }
}
