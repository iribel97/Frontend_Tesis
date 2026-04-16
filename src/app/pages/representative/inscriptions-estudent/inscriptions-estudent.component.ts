import { Component, OnInit } from '@angular/core';
import { RepresentService } from '../../../services/representative/represent.service';
import { NgForOf, NgIf } from '@angular/common';
import { InscriptionComponent } from '../../../forms/representative/inscription/inscription.component';
import { OpAdminService } from '../../../services/opAdmin/op-admin.service';
import { UtilityService } from '../../../shared/service/utility/utility.service';

@Component({
  selector: 'app-inscriptions-estudent',
  imports: [NgForOf, NgIf, InscriptionComponent],
  templateUrl: './inscriptions-estudent.component.html',
  styleUrl: './inscriptions-estudent.component.css'
})
export class InscriptionsEstudentComponent implements OnInit {

  estudiantes: any[] = [];
  isModalOpen = false;
  selectedStudent: any = null;
  showStudentInfoModal: boolean = false;

  constructor(private representService: RepresentService,
    private opAdminService: OpAdminService,
    protected utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.loadEstudiantesInscritos();
  }

  loadEstudiantesInscritos(): void {
    this.representService.getInscripciones().subscribe(
      data => {
        this.estudiantes = data;
        console.log('Estudiantes inscritos:', this.estudiantes);
      },
      error => {
        console.error('Error al cargar los estudiantes inscritos:', error);
      }
    );
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  // Método para manejar el evento formSubmitted
  onFormSubmitted(): void {
    this.loadEstudiantesInscritos();
  }

  // Método para eliminar estudiante
  eliminarEstudiante(cedula: string): void {
    if (confirm('¿Está seguro de que desea eliminar este estudiante?')) {
      this.representService.eliminarInscripcion(cedula).subscribe(
        () => {
          console.log(`Estudiante con cédula ${cedula} eliminado`);
          this.loadEstudiantesInscritos();
        },
        error => {
          console.error('Error al eliminar el estudiante:', error);
        }
      );
    }
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
}