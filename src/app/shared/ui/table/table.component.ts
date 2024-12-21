import { Component, ContentChild, ContentChildren, Input, QueryList, TemplateRef, OnInit } from '@angular/core';
import { NgForOf, NgIf, NgTemplateOutlet } from "@angular/common";

@Component({
  selector: 'ui-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [
    NgForOf,
    NgIf,
    NgTemplateOutlet
  ]
})
export class TableComponent implements OnInit {
  @Input() data: any[] = []; // Datos completos de la tabla
  @ContentChild('headerTemplate') headerTemplate!: TemplateRef<any>; // Template para la cabecera
  @ContentChildren('columnTemplate') columnTemplates!: QueryList<TemplateRef<any>>; // Templates para las columnas

  paginatedData: any[] = []; // Datos paginados
  currentPage = 1; // Página actual
  itemsPerPage = 10; // Elementos por página

  ngOnInit(): void {
    this.updatePaginatedData(); // Inicializar datos paginados
  }

  /**
   * Actualiza los datos paginados en función de la página actual
   */
  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.data.slice(startIndex, endIndex);
  }

  /**
   * Número total de páginas
   */
  get totalPages(): number {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }

  /**
   * Cambia a la página siguiente
   */
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  /**
   * Cambia a la página anterior
   */
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }
}