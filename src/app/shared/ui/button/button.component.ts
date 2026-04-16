import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent {
  @Input() id: string = ''; // ID del botón para posibles referencias
  @Input() buttonType: 'button' | 'submit' | 'reset' = 'button'; // Define el tipo de botón
  @Input() disabled: boolean = false; // Estado deshabilitado
  @Input() buttonClass: string = 'px-4 py-2 font-medium text-white bg-primary hover:bg-primary-dark rounded-lg'; // Clases CSS del botón
  @Output() clicked = new EventEmitter<Event>(); // Emite un evento cuando se hace clic en el botón

  onClick(event: Event) {
    if (!this.disabled) {
      this.clicked.emit(event); // Emite el evento de clic si el botón no está deshabilitado
    }
  }
}