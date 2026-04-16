import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {formatDate, NgForOf, NgIf} from "@angular/common";
import {ClickOutsideDirective} from "../../directivas/click-outside.directive";

@Component({
    selector: 'ui-datapiker',
    imports: [
        ReactiveFormsModule,
        NgIf,
        FormsModule,
        NgForOf,
        ClickOutsideDirective
    ],
    templateUrl: './datapiker.component.html',
    styleUrl: './datapiker.component.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR, // Registrar este componente como un Value Accessor
            useExisting: forwardRef(() => DatapikerComponent),
            multi: true,
        },
    ],
})
export class DatapikerComponent implements OnInit, ControlValueAccessor {
    selectedDate: string | null = null;
    showCalendar = false;
    currentMonth = new Date().getMonth();
    currentYear = new Date().getFullYear();
    daysInMonth: { day: number, empty: boolean, selectable: boolean }[] = [];
    monthsOfYear: string[] = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
        'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
    ];

    @Input() disableFutureDates: boolean = true;

    // Funciones de ControlValueAccessor
    private onChange!: (value: any) => void; // Callback para cambios en el valor
    private onTouched!: () => void; // Callback para marcar como "tocado"

    ngOnInit() {
        this.generateDaysInMonth(this.currentYear, this.currentMonth);
        this.setInitialDate();
    }

    setInitialDate() {
        const today = new Date();
        this.selectedDate = this.formatLocalDate(today);
    }

    formatLocalDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son de 0 a 11
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
    }

    toggleCalendar() {
        this.showCalendar = !this.showCalendar;
    }

    closeCalendar() {
        this.showCalendar = false;
        this.onTouched?.(); // Marcar el campo como "tocado" al cerrarse
    }

    prevMonth() {
        if (this.currentMonth === 0) {
            this.currentMonth = 11;
            this.currentYear -= 1;
        } else {
            this.currentMonth -= 1;
        }
        this.generateDaysInMonth(this.currentYear, this.currentMonth);
    }

    nextMonth() {
        if (this.currentMonth === 11) {
            this.currentMonth = 0;
            this.currentYear += 1;
        } else {
            this.currentMonth += 1;
        }
        this.generateDaysInMonth(this.currentYear, this.currentMonth);
    }

    selectDate(day: number) {
        const selected = new Date(this.currentYear, this.currentMonth, day);
        this.selectedDate = this.formatLocalDate(selected);
        this.showCalendar = false;

        // Informar a Angular sobre el nuevo valor
        this.onChange?.(this.selectedDate);
    }

    generateDaysInMonth(year: number, month: number) {
        this.daysInMonth = [];
        const date = new Date(year, month, 1); // Primer día del mes
        const today = new Date();

        // Generar los días válidos del mes
        while (date.getMonth() === month) {
            const day = date.getDate();
            const isFutureDate = date > today;
            this.daysInMonth.push({
                day,
                empty: false,
                selectable: !this.disableFutureDates || !isFutureDate,
            });
            date.setDate(day + 1); // Avanza al siguiente día
        }

        // Obtener el primer día del mes (0 = Domingo, 6 = Sábado)
        const firstDay = new Date(year, month, 1).getDay();

        // Ajustar para que la semana comience en lunes
        const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1; // Si es domingo (0), pásalo al final (6)

        // Añadir días vacíos al principio de la semana
        for (let i = 0; i < adjustedFirstDay; i++) {
            this.daysInMonth.unshift({day: 0, empty: true, selectable: false});
        }
    }

    formatDate(year: number, month: number, day: number): string {
        const date = new Date(year, month, day);
        return date.toISOString().split('T')[0];
    }

    writeValue(value: any): void {
        this.selectedDate = value || this.formatLocalDate(new Date());
    }

    registerOnChange(fn: any): void {
        this.onChange = fn; // Registrar el callback de cambios
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn; // Registrar el callback de "tocado"
    }

    setDisabledState?(isDisabled: boolean): void {
        // Deshabilitar el campo si es necesario
    }
}