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
