import { Component } from '@angular/core';
import { OpAdminService } from '../../../services/opAdmin/op-admin.service';
import { NgForOf, NgIf } from '@angular/common';
import { UtilityService } from '../../../shared/service/utility/utility.service';

@Component({
  selector: 'app-inscription-table',
  imports: [NgForOf, NgIf],
  templateUrl: './inscription-table.component.html',
  styleUrl: './inscription-table.component.css'
})
export class InscriptionTableComponent {

  students: any[] = [];
  paginatedStudents: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  showStudentInfoModal: boolean = false;
  selectedStudent: any = null;
  selectedInscrip: any = null;
  cursos: any[] = [];
  selectedCursoId: number | null = null;
  showModal: boolean = false;

  constructor(private opAdminService: OpAdminService, 
    protected utilityService: UtilityService) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.opAdminService.getInscripcionesPendientes().subscribe(
      data => {
        this.students = data;
        this.totalPages = Math.ceil(this.students.length / this.itemsPerPage);
        this.changePage(1);
      },
      error => {
        console.error('Error al cargar las inscripciones pendientes:', error);
      }
    );
  }

  changePage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedStudents = this.students.slice(startIndex, endIndex);
  }

  viewStudentInfo(cedula: string): void {
    this.opAdminService.getInscripcionByCedula(cedula).subscribe(
      data => {
        this.selectedStudent = data;
        this.showStudentInfoModal = true;
      },
      error => {
        console.error('Error al obtener la información del estudiante:', error);
      }
    );
  }

  openModal(matricula: any): void {
    this.selectedInscrip = matricula;
    this.loadCursosByGrado(matricula.grado);
    this.showModal = true;
  }

  loadSelectedCurso(event: Event): void {
    const selectedCursoId = (event.target as HTMLSelectElement).value;
    if (selectedCursoId) {
      this.selectedCursoId = Number(selectedCursoId);
    }
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

  acceptInscripcion(): void {
    if (this.selectedCursoId) {
      const selectedCurso = this.cursos.find(curso => curso.id === this.selectedCursoId);
      const requestBody = {
        cedulaEstudiante: this.selectedInscrip.cedula,
        grado: this.selectedInscrip.grado,
        paralelo: selectedCurso.paralelo
      };

      console.log('Aceptando inscripción:', requestBody);

      this.opAdminService.acceptInscripcion(requestBody).subscribe(
        () => {
          this.loadStudents(); // Recargar la tabla después de aceptar la matrícula
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

  closeModal(): void {
    this.showModal = false;
    this.selectedCursoId = null;
  }

  closeStudentInfoModal(): void {
    this.showStudentInfoModal = false;
    this.selectedStudent = null;
  }

  acceptStudent(cedula: string): void {
    // Lógica para aceptar al estudiante
    console.log(`Aceptar inscripción del estudiante con cédula: ${cedula}`);
  }

  rejectStudent(cedula: string): void {
    // Lógica para rechazar al estudiante
    console.log(`Rechazar inscripción del estudiante con cédula: ${cedula}`);
  }

}
