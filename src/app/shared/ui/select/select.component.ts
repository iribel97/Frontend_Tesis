import {Component, Input, Output, EventEmitter, OnInit, forwardRef, NgZone} from '@angular/core';
import {ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {NgIf, NgFor, NgForOf} from "@angular/common";
import {MultiSelectSyncService} from "../../service/multiSelect/multi-select-sync.service";
import {ClickOutsideDirective} from "../../directivas/click-outside.directive";

@Component({
    selector: 'ui-select',
    templateUrl: './select.component.html',
    styleUrl: './select.component.css',
    imports: [
        FormsModule,
        NgIf,
        NgForOf,
        ClickOutsideDirective
    ],
    // Usa los mismos estilos
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
    @Input() labelText: string = ''; // Texto para el label
    @Input() placeholderText: string = 'Selecciona una opción';
    @Input() options: { id: number, name: string }[] = [];
    @Input() required: boolean = false;
    @Input() sendform: boolean = false;
    @Input() groupId: string = '';
    @Output() valueChange = new EventEmitter<string>();
    @Output() errorsChange = new EventEmitter<{ id: string, errorMessage: string }>();

    selectControl: FormControl = new FormControl();
    errorMessage: string = '';
    filteredOptions: { id: number, name: string }[] = [];
    searchTerm: string = '';
    dropdownOpen: boolean = false;

    private onChange = (value: any) => {
    };
    private onTouched = () => {
    };

    constructor(private ngZone: NgZone, private multiSelectSyncService: MultiSelectSyncService) {
    }

    ngOnInit(): void {
        const validators = this.required ? [Validators.required] : [];
        this.selectControl = new FormControl('', validators);

        // Inicialmente, mostrar todas las opciones
        this.filteredOptions = [...this.options];

        // Suscribirse a los valores seleccionados globales desde el servicio
        if (this.groupId) {
            this.multiSelectSyncService.getExcludedItems(this.groupId).subscribe(excludedItems => {
                this.applyExclusions(excludedItems);
            });
        }

        // Detectar cambios en el valor seleccionado localmente
        this.selectControl.valueChanges.subscribe(value => {
            this.ngZone.run(() => {
                if (this.groupId && this.id) {
                    // Notificar al servicio el nuevo valor seleccionado
                    this.multiSelectSyncService.updateSelectedItems(this.groupId, this.id, value.id);
                }

                this.onChange(value);
                this.valueChange.emit(value?.id);
                this.checkValidation(this.selectControl);
            });
        });
    }

    private applyExclusions(excludedItems: number[]): void {
        // Filtramos las opciones excluyendo las seleccionadas globalmente
        this.filteredOptions = this.options.filter(option => !excludedItems.includes(option.id));
    }

    toggleDropdown(): void {
        this.dropdownOpen = !this.dropdownOpen;
    }

    buildValidators() {
        const validators = [];
        if (this.required) {
            validators.push(Validators.required);
        }
        return validators;
    }

    checkValidation(control: FormControl): void {
        const errors = control.errors;
        if (errors) {
            if (errors['required']) {
                this.errorMessage = 'Este campo es obligatorio';
            } else {
                this.errorMessage = 'Entrada inválida';
            }
        } else {
            this.errorMessage = '';
        }

        this.errorsChange.emit({
            id: this.id,
            errorMessage: this.errorMessage
        });
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

    selectOption(option: { id: number, name: string }): void {
        this.selectControl.setValue(option);
        this.dropdownOpen = false;
    }

    closeDropdown(): void {
        this.dropdownOpen = false;
    }


    handleSearchTermChange(term: string): void {
        this.searchTerm = term;
        this.filteredOptions = this.filteredOptions.filter(option =>
            option.name.toLowerCase().includes(term.toLowerCase()));
    }
}