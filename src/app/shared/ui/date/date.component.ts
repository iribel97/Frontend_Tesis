import { Component, Input, Output, EventEmitter, OnInit, forwardRef, NgZone } from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-date-input',
    templateUrl: './date.component.html',
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DateInputComponent),
            multi: true
        }
    ]
})
export class DateInputComponent implements OnInit, ControlValueAccessor {
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() minDate?: string;
  @Input() maxDate?: string;
  @Input() sendform: boolean = false;
  @Output() errorsChange = new EventEmitter<{ id: string, errorMessage: string }>();

  dateControl: FormControl = new FormControl();
  errorMessage: string = '';

  private onChange = (value: any) => { };
  private onTouched = () => { };

  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {
    const validators = this.buildValidators();
    this.dateControl = new FormControl('', validators);

    this.dateControl.valueChanges.subscribe(value => {
      this.ngZone.run(() => {
        this.onChange(value);
        this.checkValidation();
      });
    });

    this.dateControl.statusChanges.subscribe(() => {
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
    if (this.minDate) {
      validators.push(Validators.min(new Date(this.minDate).getTime()));
    }
    if (this.maxDate) {
      validators.push(Validators.max(new Date(this.maxDate).getTime()));
    }
    return validators;
  }

  checkValidation(): void {
    const errors = this.dateControl.errors;
    if (errors) {
      if (errors['required']) {
        this.errorMessage = 'Este campo es obligatorio';
      } else if (errors['min']) {
        this.errorMessage = `La fecha debe ser posterior a ${this.minDate}`;
      } else if (errors['max']) {
        this.errorMessage = `La fecha debe ser anterior a ${this.maxDate}`;
      } else {
        this.errorMessage = 'Fecha inválida';
      }
    } else {
      this.errorMessage = '';
    }
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.dateControl.setValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.dateControl.disable() : this.dateControl.enable();
  }
}