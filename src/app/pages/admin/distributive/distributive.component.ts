import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import { NgForOf, NgIf } from '@angular/common';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';
import { ModalService } from '../../../shared/service/modal/modal.service';
import { FormSubjectComponent } from '../../../forms/admin/form-subject/form-subject.component';

@Component({
  selector: 'app-distributive',
  imports: [
    NgForOf,
    NgIf,
    ModalComponent,
    FormSubjectComponent
  ],
  templateUrl: './distributive.component.html',
  styleUrl: './distributive.component.css'
})
export class DistributiveComponent implements OnInit {

  ciclos: any[] = []; // Lista de ciclos académicos
  distributivos: any[] = []; // Lista completa de distributivos
  paginatedDistributivos: any[] = []; // Subconjunto de distributivos paginados
  materias: any[] = [];
  paginatedMaterias: any[] = [];
  materiasCurrentPage = 1;
  materiasItemsPerPage = 5;
  materiasTotalPages = 0;
  grados: any[] = [];   // Lista de grados

  currentPage: number = 1; // Página actual
  itemsPerPage: number = 10; // Elementos por página
  totalPages: number = 1; // Total de páginas

  constructor(private adminService: AdminService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.fetchCiclos(); // Cargar los ciclos académicos al iniciar
    this.fetchMaterias();
    this.fetchGrados();
  }

  fetchCiclos(): void {
    this.adminService.getAllCiclos().subscribe({
      next: (data) => {
        this.ciclos = data;
        console.log('Ciclos académicos:', this.ciclos);
      },
      error: (err) => {
        console.error('Error al cargar ciclos académicos:', err);
      }
    });
  }

  fetchGrados(): void {
    this.adminService.getGrados().subscribe({
      next: (data) => {
        this.grados = data;
      },
      error: (err) => {
        console.error('Error al cargar grados:', err);
      }
    });
  }

  // Navegar a la página siguiente
  


  onCicloChange(event: Event): void {
    const selectedCicloId = (event.target as HTMLSelectElement).value;
    if (selectedCicloId) {
      this.fetchDistributivos(Number(selectedCicloId));
    }
  }

  fetchDistributivos(cicloId: number): void {
    this.adminService.getDistributivosByCicloId(cicloId).subscribe({
      next: (data) => {
        this.distributivos = data;
        this.updatePagination();
      },
      error: (err) => {
        console.error('Error al cargar distributivos:', err);
      }
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.distributivos.length / this.itemsPerPage);
    this.paginatedDistributivos = this.distributivos.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
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

  // Materia
  fetchMaterias(): void {
    this.adminService.getMaterias().subscribe(
      (data) => {
        this.materias = data;
        this.updateMateriasPagination();
      },
      (error) => {
        console.error('Error al cargar las materias:', error);
      }
    );
  }

  updateMateriasPagination(): void {
    this.materiasTotalPages = Math.ceil(this.materias.length / this.materiasItemsPerPage);
    this.paginatedMaterias = this.materias.slice(
      (this.materiasCurrentPage - 1) * this.materiasItemsPerPage,
      this.materiasCurrentPage * this.materiasItemsPerPage
    );
  }

  nextPageMaterias(): void {
    if (this.materiasCurrentPage < this.materiasTotalPages) {
      this.materiasCurrentPage++;
      this.updateMateriasPagination();
    }
  }

  previousPageMaterias(): void {
    if (this.materiasCurrentPage > 1) {
      this.materiasCurrentPage--;
      this.updateMateriasPagination();
    }
  }

  


  openModal(modalId: string): void {
    this.modalService.openModal(modalId);
  }
}
