import { Component, OnInit } from '@angular/core';
import { OpAdminService } from '../../../services/opAdmin/op-admin.service';
import { AdminService } from '../../../services/admin/admin.service';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-matriculate',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './matriculate.component.html',
  styleUrl: './matriculate.component.css'
})
export class MatriculateComponent implements OnInit{

  matriculasPendientes: any[] = [];
  cursos: any[] = [];
  selectedMatricula: any = null;
  selectedCursoId: number | null = null;
  showModal: boolean = false;

  constructor(private opAdminService: OpAdminService) { }

  ngOnInit(): void {
    this.loadMatriculasPendientes();
  }

  loadMatriculasPendientes(): void {
    this.opAdminService.getMatriculasPendientes().subscribe(
      (data) => {
        this.matriculasPendientes = data;
      },
      (error) => {
        console.error('Error al cargar las matrículas pendientes:', error);
      }
    );
  }

  openModal(matricula: any): void {
    this.selectedMatricula = matricula;
    this.loadCursosByGrado(matricula.grado);
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedCursoId = null;
  }

  loadCursosByGrado(grado: string): void {
    this.opAdminService.getCursosByGrado(grado).subscribe(
      (data) => {
        this.cursos = data;
      },
      (error) => {
        console.error('Error al cargar los cursos:', error);
      }
    );
  }

  loadSelectedCurso(event: Event): void {
    const selectedCursoId = (event.target as HTMLSelectElement).value;
    if (selectedCursoId) {
      this.selectedCursoId = Number(selectedCursoId);
    }
  }

  acceptMatricula(): void {
    if (this.selectedCursoId) {
      const selectedCurso = this.cursos.find(curso => curso.id === this.selectedCursoId);
      const requestBody = {
        id: this.selectedMatricula.id,
        cedulaEstudiante: this.selectedMatricula.cedulaEstudiante,
        grado: this.selectedMatricula.grado,
        paralelo: selectedCurso.paralelo
      };

      this.opAdminService.acceptMatricula(requestBody).subscribe(
        () => {
          this.loadMatriculasPendientes(); // Recargar la tabla después de aceptar la matrícula
          this.closeModal();
        },
        (error) => {
          console.error('Error al aceptar la matrícula:', error);
        }
      );
    } else {
      alert('Seleccione un curso válido.');
    }
  }

}
 