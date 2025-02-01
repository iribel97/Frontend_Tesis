import {AfterContentInit, Component, ContentChildren, Input, OnChanges, QueryList, TemplateRef} from '@angular/core';
import {NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-acordeon',
  templateUrl: './acordeon.component.html',
  styleUrls: ['./acordeon.component.css'],
  imports: [
    NgForOf,
    NgIf,
    NgTemplateOutlet
  ]
})
export class AcordeonComponent implements AfterContentInit {
  @Input() items: any[] = []; // Lista de ítems pasados al acordeón
  @Input() singleOpen: boolean = false; // Define si solo un acordeón puede estar abierto

  @ContentChildren(TemplateRef) templates!: QueryList<TemplateRef<any>>;
  openIndex: number | null = null; // Índice del acordeón actualmente abierto
  templatesArray: TemplateRef<any>[] = []; // Array de plantillas proyectadas

  constructor() {}

  ngAfterContentInit(): void {
    // Guardar las plantillas proyectadas en forma de array
    this.templatesArray = this.templates.toArray();
  }

  toggle(index: number): void {
    if (this.singleOpen) {
      this.openIndex = this.openIndex === index ? null : index;
    } else {
      this.openIndex = this.openIndex === index ? null : index;
    }
  }

  isOpen(index: number): boolean {
    return this.openIndex === index;
  }
}