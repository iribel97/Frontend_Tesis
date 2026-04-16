import { Component, OnInit } from '@angular/core';
import { OpAdminService } from '../../../services/opAdmin/op-admin.service';
import { NgForOf, NgIf } from '@angular/common';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';
import { ModalService } from '../../../shared/service/modal/modal.service';

@Component({
  selector: 'app-estudents-table',
  imports: [
    NgForOf,
    NgIf,
    ModalComponent,
  ],
  templateUrl: './estudents-table.component.html',
  styleUrl: './estudents-table.component.css'
})
export class EstudentsTableComponent implements OnInit {

  estudiantes: any[] = [];
  filteredEstudiantes: any[] = []; // Estudiantes filtrados
  isSuspendModalOpen = false;
  selectedEstudiante: any = null;
  currentPage: number = 1; // Página actual
  itemsPerPage: number = 12; // Elementos por página
  totalPages: number = 1; // Total de páginas


  constructor(private opAdminService: OpAdminService, private modalService: ModalService) { }

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

  openSuspendModal(estudiante: any): void {
    this.modalService.openModal('suspendModal');
    this.selectedEstudiante = estudiante;
    this.isSuspendModalOpen = true;
  }

  closeSuspendModal(): void {
    this.modalService.closeModal('suspendModal');
    this.isSuspendModalOpen = false;
    this.selectedEstudiante = null;
  }

  suspendEstudiante(): void {
    if (this.selectedEstudiante) {
      this.opAdminService.suspendEstudiante(this.selectedEstudiante.cedula).subscribe({
        next: (data) => {
          console.log('Estudiante suspendido:', data);
          this.closeSuspendModal();
          this.loadEstudiantesMatriculados(); // Actualizar la lista de estudiantes
        },
        error: (error) => {
          console.error('Error al suspender el estudiante:', error);
        }
      });
    }
  }

  openActiveModal(estudiante: any): void {
    this.modalService.openModal('activeModal');
    this.selectedEstudiante = estudiante;
    this.isSuspendModalOpen = true;
  }

  closeActiveModal(): void {
    this.modalService.closeModal('activeModal');
    this.isSuspendModalOpen = false;
    this.selectedEstudiante = null;
  }

  activateEstudiante(): void {
    if (this.selectedEstudiante) {
      this.opAdminService.activateEstudiante(this.selectedEstudiante.cedula).subscribe({
        next: (data) => {
          console.log('Estudiante activado:', data);
          this.closeActiveModal();
          this.loadEstudiantesMatriculados(); // Actualizar la lista de estudiantes
        },
        error: (error) => {
          console.error('Error al activar el estudiante:', error);
        }
      });
    }
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
