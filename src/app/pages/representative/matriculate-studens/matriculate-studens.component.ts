import { Component, OnInit, ViewChild } from '@angular/core';
import { RepresentService } from '../../../services/representative/represent.service';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from '../../../shared/ui/toast/toast.component';

@Component({
  selector: 'app-matriculate-studens',
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    ToastComponent,
  ],
  templateUrl: './matriculate-studens.component.html',
  styleUrl: './matriculate-studens.component.css'
})
export class MatriculateStudensComponent implements OnInit {
  @ViewChild('toast', { static: true }) toast!: ToastComponent;

  matriculas: any[] = [];
  estudiantes: any[] = [];
  grados: any[] = [];
  selectedStudent: string = '';
  selectedGrade: string = '';
  isModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  matriculaIdToDelete: number | null = null;

  constructor(private representService: RepresentService) { }

  ngOnInit(): void {
    this.loadMatriculas();
  }

  loadMatriculas(): void {
    this.representService.getMatriculas().subscribe(
      data => {
        this.matriculas = data;
       
      },
      error => {
        console.error('Error al cargar las matrículas:', error);
      }
    );
  }

  openModal(): void {
    this.isModalOpen = true;
    this.loadEstudiantes();
    this.loadGrados();
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  loadEstudiantes(): void {
    this.representService.getEstudiantes().subscribe(
      data => {
        this.estudiantes = data;
      },
      error => {
        console.error('Error al cargar los estudiantes:', error);
      }
    );
  }

  loadGrados(): void {
    this.representService.getGrados().subscribe(
      data => {
        this.grados = data;
      },
      error => {
        console.error('Error al cargar los grados:', error);
      }
    );
  }

  createMatricula(): void {
    const matricula = {
      cedulaEstudiante: this.selectedStudent,
      grado: this.selectedGrade
    };
    this.representService.createMatricula(matricula).subscribe(
      data => {
        this.toast.showToast('success', data.detalles, data.mensaje, 10000);
        this.loadMatriculas();
        this.closeModal();
      },
      error => {
        this.toast.showToast('error', error.error.detalles, error.error.mensaje, 10000);
      }
    );
  }

  confirmDeleteMatricula(id: number): void {
    this.matriculaIdToDelete = id;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.matriculaIdToDelete = null;
  }


  deleteMatricula(): void {
    if (this.matriculaIdToDelete !== null) {
      this.representService.deleteMatricula(this.matriculaIdToDelete).subscribe(
        data => {
          this.toast.showToast('success', data.detalles, data.mensaje, 10000);
          this.loadMatriculas();
          this.closeDeleteModal();
        },
        error => {
          console.error('Error al eliminar la matrícula:', error);
          this.toast.showToast('error', error.error.detalles, error.error.mensaje, 10000);
        }
      );
    }
  }

}
