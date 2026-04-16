import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {NgClass, NgForOf, NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'ui-tabs',
  imports: [
    NgForOf,
    NgTemplateOutlet,
    NgClass
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {
  @Input() tabs: { id: string; title: string; content: any; data?: any }[] = []; // Entrada: Las tabs dinámicas
  @Output() tabChange: EventEmitter<any> = new EventEmitter<any>(); // Salida: Evento al cambiar de tab

  selectedTab: number = 0; // Tab actualmente activa

  // Cambiar de tab
  selectTab(index: number): void {
    this.selectedTab = index; // Actualizar la tab activa
    const activeTab = this.tabs[index]; // Obtener la tab activa
    this.tabChange.emit(activeTab); // Emitir un evento con los datos de la tab activa
  }
}
