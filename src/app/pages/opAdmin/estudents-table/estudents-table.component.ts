import { Component, OnInit } from '@angular/core';
import { OpAdminService } from '../../../services/opAdmin/op-admin.service';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-estudents-table',
  imports: [
    NgForOf,
  ],
  templateUrl: './estudents-table.component.html',
  styleUrl: './estudents-table.component.css'
})
export class EstudentsTableComponent implements OnInit {

  estudiantes: any[] = [];

  filteredEstudiantes: any[] = []; // Estudiantes filtrados
  currentPage: number = 1; // Página actual
  itemsPerPage: number = 12; // Elementos por página
  totalPages: number = 1; // Total de páginas

  constructor(private opAdminService: OpAdminService) { }

  ngOnInit(): void {
    this.loadEstudiantesMatriculados();
  }

  loadEstudiantesMatriculados(): void {
    this.opAdminService.getEstudiantesMatriculados().subscribe(
      (data) => {
        this.estudiantes = data;
        this.updatePagination();
      },
      (error) => {
        console.error('Error al cargar los estudiantes matriculados:', error);
      }
    );
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.estudiantes.length / this.itemsPerPage);
    this.filteredEstudiantes = this.estudiantes.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

}
