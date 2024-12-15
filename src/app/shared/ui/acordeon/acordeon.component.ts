import { Component, Input } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-acordeon',
  templateUrl: './acordeon.component.html',
  styleUrls: ['./acordeon.component.css'],
  imports: [
    NgForOf,
    NgIf
  ]
})
export class AcordeonComponent {
  @Input() items: { title: string, content?: string }[] = [];
  @Input() singleOpen: boolean = true; // Permite elegir el comportamiento
  activeIndexes: Set<number> = new Set<number>();

  toggle(index: number) {
    if (this.singleOpen) {
      // Solo permite una sección abierta a la vez
      this.activeIndexes.clear();
      this.activeIndexes.add(index);
    } else {
      // Alterna el estado de una sección sin afectar las demás
      if (this.activeIndexes.has(index)) {
        this.activeIndexes.delete(index);
      } else {
        this.activeIndexes.add(index);
      }
    }
  }

  isOpen(index: number): boolean {
    return this.activeIndexes.has(index);
  }
}