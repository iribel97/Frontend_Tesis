import { Component, Input, Output, EventEmitter, OnInit, forwardRef, NgZone } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf, NgFor } from "@angular/common";

@Component({
    selector: 'app-select',
    imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor],
    templateUrl: './select.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        }
    ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() options: string[] = [];
  @Input() required: boolean = false;
  @Input() sendform: boolean = false;
  @Output() valueChange = new EventEmitter<string>();
  @Output() errorsChange = new EventEmitter<{ id: string, errorMessage: string }>();

  selectControl: FormControl = new FormControl();
  errorMessage: string = '';

  private onChange = (value: any) => { };
  private onTouched = () => { };

  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {
    const validators = this.buildValidators();
    this.selectControl = new FormControl('', validators);

    this.selectControl.valueChanges.subscribe(value => {
      this.ngZone.run(() => {
        this.onChange(value);
        this.valueChange.emit(value);
        this.checkValidation();
      });
    });

    this.selectControl.statusChanges.subscribe(() => {
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
    return validators;
  }

  checkValidation(): void {
    const errors = this.selectControl.errors;
    if (errors) {
      if (errors['required']) {
        this.errorMessage = 'Este campo es obligatorio';
      } else {
        this.errorMessage = 'Entrada inválida';
      }
    } else {
      this.errorMessage = '';
    }
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.selectControl.setValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.selectControl.disable() : this.selectControl.enable();
  }
}