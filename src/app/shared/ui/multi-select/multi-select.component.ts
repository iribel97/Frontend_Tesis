import {Component, forwardRef, Input, OnInit, Output, EventEmitter, NgZone} from '@angular/core';
import {ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {SelectItem} from "../../../model/selectItem.model";
import {MultiSelectSyncService} from "../../service/multiSelect/multi-select-sync.service";
import {ClickOutsideDirective} from "../../directivas/click-outside.directive";
import {NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'ui-multi-select',
    templateUrl: './multi-select.component.html',
    styleUrls: ['./multi-select.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MultiSelectComponent),
            multi: true
        }
    ],
    imports: [
        ClickOutsideDirective,
        FormsModule,
        NgForOf,
        NgIf
    ]
})
export class MultiSelectComponent implements OnInit, ControlValueAccessor {
    @Input() id: string = '';
    @Input() data_select: SelectItem[] = [];
    @Input() labelText: string = ''; // Texto para el label
    @Input() placeholderText: string = 'Selecciona una opción';
    @Input() required: boolean = false;
    @Input() sendform: boolean = false;
    @Input() groupId: string = '';
    @Output() errorsChange = new EventEmitter<{ id: string, errorMessage: string }>();

    multiSelectControl: FormControl = new FormControl();
    errorMessage: string = '';
    filteredItems: SelectItem[] = [];
    selectedItems: number[] = [];
    dropdownVisible: boolean = false;
    searchTerm: string = '';

    private onChange = (value: any) => {
    };
    private onTouched = () => {
    };

    constructor(private ngZone: NgZone, private multiSelectSyncService: MultiSelectSyncService) {
    }

    ngOnInit(): void {
        const validators = this.required ? [Validators.required] : [];
        this.multiSelectControl = new FormControl([], validators);

        // Inicializamos los elementos seleccionados
        this.selectedItems = Array.isArray(this.multiSelectControl.value) ? this.multiSelectControl.value : [];

        // Inicializa las opciones filtradas
        this.filteredItems = [...this.data_select];

        // Gestiona cambios locales del control
        this.multiSelectControl.valueChanges.subscribe(value => {
            this.ngZone.run(() => {
                this.onChange(value);
                this.checkValidation(this.multiSelectControl);

                // Actualizamos los elementos seleccionados asegurándonos de que el valor sea un array
                this.selectedItems = Array.isArray(value) ? value : [];

                if (this.groupId) {
                    this.multiSelectSyncService.updateSelectedItems(this.groupId, this.id, [...this.selectedItems]);
                }

                const currentSelections = new Set<number>(this.selectedItems);
                this.applyExclusions(currentSelections);
            });
        });

        // Suscripción al servicio para exclusiones (si aplica)
        if (this.groupId) {
            this.multiSelectSyncService.getExcludedItems(this.groupId).subscribe((excludedItems: number[]) => {
                this.applyExclusions(new Set(excludedItems));
            });
        }
    }


    toggleDropdown(): void {
        this.dropdownVisible = !this.dropdownVisible;
    }

    closeDropdown(): void {
        this.dropdownVisible = false;
    }

    onClickedOutside(): void {
        this.closeDropdown();
    }

    filterItems(): void {
        if (this.groupId) {
            // Invocamos el servicio para obtener las selecciones actuales
            this.multiSelectSyncService.getExcludedItems(this.groupId).subscribe(excludedItems => {
                this.filteredItems = this.data_select.filter(item => {
                    const matchesSearch = this.searchTerm
                        ? item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
                        : true; // Si no hay búsqueda, devolvemos todos
                    const isExcluded = excludedItems.includes(item.id);

                    return matchesSearch && !isExcluded; // Mostrar solo los elementos que cumplen ambas condiciones
                });
            });
        } else {
            // Si no hay groupId, solo filtramos localmente por término de búsqueda
            this.filteredItems = this.data_select.filter(item =>
                item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
    }

    toggleSelection(itemId: number): void {
        if (!Array.isArray(this.selectedItems)) {
            this.selectedItems = []; // Aseguramos que sea un array
        }

        // Verificar si el item ya está seleccionado
        const index = this.selectedItems.indexOf(itemId);
        if (index >= 0) {
            // Si existe, eliminarlo de la lista de seleccionados
            this.selectedItems.splice(index, 1);
        } else {
            // Si no existe, agregarlo a la lista
            this.selectedItems.push(itemId);
        }

        // Actualizar el control de formulario con los nuevos valores
        this.multiSelectControl.setValue([...this.selectedItems], { emitEvent: false });

        // Llamar al servicio para actualizar las exclusiones globales
        if (this.groupId && this.id) {
            this.multiSelectSyncService.updateSelectedItems(
                this.groupId,
                this.id,
                [...this.selectedItems]
            );
        }

        // Ocultar el dropdown automáticamente solo si es selección única
        if (!Array.isArray(this.multiSelectControl.value)) {
            this.closeDropdown();
        }
    }

    isSelected(itemId: number): boolean {
        return this.selectedItems.includes(itemId);
    }

    getDisplayText(): string {
        if (this.selectedItems.length === 0) {
            return this.placeholderText;
        }
        return this.data_select
            .filter(item => this.selectedItems.includes(item.id))
            .map(item => item.name)
            .join(', ');
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
            id: 'multiSelect',  // Cambia 'multiSelect' por el id adecuado según el contexto
            errorMessage: this.errorMessage
        });
    }

    writeValue(value: any): void {
        if (Array.isArray(value)) {
            this.selectedItems = value; // El valor es un array, se asigna directamente
        } else {
            this.selectedItems = []; // Si no es un array, inicializamos una selección vacía
        }

        this.multiSelectControl.setValue(this.selectedItems, { emitEvent: false }); // Aseguramos que el Control Value esté sincronizado
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        isDisabled ? this.multiSelectControl.disable() : this.multiSelectControl.enable();
    }

    applyExclusions(selectionSet: Set<number>): void {
        this.filteredItems = this.data_select.filter(item => {
            // Aseguramos que `selectedItems` es un array, o usamos un array vacío por defecto
            const selectedItems = Array.isArray(this.selectedItems) ? this.selectedItems : [];
            return !selectionSet.has(item.id) || selectedItems.includes(item.id);
        });
    }

}