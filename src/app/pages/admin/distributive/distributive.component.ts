import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-distributive',
  imports: [
    NgForOf,
    NgIf,
  ],
  templateUrl: './distributive.component.html',
  styleUrl: './distributive.component.css'
})
export class DistributiveComponent implements OnInit {

  ciclos: any[] = []; // Lista de ciclos académicos
  distributivos: any[] = []; // Lista completa de distributivos
  paginatedDistributivos: any[] = []; // Subconjunto de distributivos paginados

  currentPage: number = 1; // Página actual
  itemsPerPage: number = 10; // Elementos por página
  totalPages: number = 1; // Total de páginas

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchCiclos(); // Cargar los ciclos académicos al iniciar
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
}
