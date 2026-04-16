import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentsService } from '../../../services/students/students.service';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';
import { ModalService } from '../../../shared/service/modal/modal.service';
import { FormAddScheduleComponent } from '../../../forms/adminOp/form-add-schedule/form-add-schedule.component';
import { TeachersService } from '../../../services/teacher/teachers.service';
import { RepresentService } from '../../../services/representative/represent.service';

@Component({
  selector: 'app-schedule-admin',
  imports: [
    NgForOf,
    NgIf,
    FormsModule, // Agregar FormsModule a los imports
    ModalComponent,
    FormAddScheduleComponent,
  ],
  templateUrl: './schedule-admin.component.html',
  styleUrl: './schedule-admin.component.css'
})
export class ScheduleAdminComponent implements OnInit {

  cursos: any[] = [];
  estudiantes: any[] = [];
  selectedCursoId: number | null = null;
  selectedEstudianteId: number | null = null;
  horarios: any[] = [];
  loadingHorarios = false;
  

  rolUser = '';

  constructor(private adminService: AdminService,
    private studentsService: StudentsService,
    private teachersService:TeachersService,
    private representService: RepresentService,
    private modalService: ModalService) {

  }

  ngOnInit(): void {
    this.getInfoUser();
  }

  // Cargar cursos al iniciar el componente
  loadCursos(): void {
    this.adminService.getCursos().subscribe(
      (data) => {
        this.cursos = data;
      },
      (error) => {
        console.error('Error al cargar los cursos:', error);
      }
    );
  }

  // Cargar horarios por curso
  loadHorariosByCurso(event: Event): void {
    const selectedCursoId = (event.target as HTMLSelectElement).value;
    if (selectedCursoId) {
      this.selectedCursoId = Number(selectedCursoId);
      this.loadingHorarios = true;
      this.adminService.getHorariosByCurso(this.selectedCursoId).subscribe(
        (data) => {
          this.horarios = data;
          this.loadingHorarios = false;
        },
        (error) => {
          console.error('Error al cargar los horarios:', error);
          this.loadingHorarios = false;
        }
      );
    }
  }

  // carga horarios por estudiante
  loadHorariosByEstudiante(event: any): void { 
    const estudianteId = event.target.value;
    this.selectedEstudianteId = estudianteId;
    this.loadHorarios();
  }

  loadHorarios(): void {
    this.loadingHorarios = true;
    if (this.rolUser === 'Representante' && this.selectedEstudianteId) {
      this.representService.getHorarios(this.selectedEstudianteId).subscribe(
        data => {
          this.horarios = data;
          this.loadingHorarios = false;
        },
        error => {
          console.error('Error al cargar los horarios:', error);
          this.loadingHorarios = false;
        }
      );
    } else if (this.rolUser === 'Estudiante') {
      this.studentsService.getHorarios().subscribe(
        data => {
          this.horarios = data;
          this.loadingHorarios = false;
        },
        error => {
          console.error('Error al cargar los horarios del estudiante:', error);
          this.loadingHorarios = false;
        }
      );
    }
  }

  getInfoUser() {
    this.studentsService.getUser().subscribe(data => {
      console.log('Información del usuario:', data); // Útil para depuración
      // Verifica que data tenga todas las propiedades necesarias
      if (data && data.cedula && data.nombres && data.apellidos) {
        this.rolUser = data.rol; // Asigna la información del usuario al objeto local
        if (this.rolUser === 'Docente') {
          this.loadHorariosDocente();
        } else if (this.rolUser === 'Representante') {
          this.loadEstudiantes();
        } else if (this.rolUser === 'Estudiante') {
          this.loadHorarios();
        } else {
          this.loadCursos();
        }
      } else {
        console.error('Datos incompletos recibidos:', data);
      }
    });
  }

  loadEstudiantes(): void {
    this.representService.getEstudiantes().subscribe(
      data => {
        this.estudiantes = data;
        console.log('Estudiantes:', this.estudiantes); // Útil para depuración
      },
      error => {
        console.error('Error al cargar los estudiantes:', error);
      }
    );
  }

  // Cargar horarios de los docentes
  loadHorariosDocente(): void {
    this.loadingHorarios = true;
    this.teachersService.getHorario().subscribe(
      (data) => {
        console.log('Horarios del docente:', data); // Útil para depuración
        this.horarios = data;
        this.loadingHorarios = false;
      },
      (error) => {
        console.error('Error al cargar los horarios del docente:', error);
        this.loadingHorarios = false;
      }
    );
  }

  // Verificar si el usuario tiene el rol institucional
  isInstitutionalRole(): boolean {
    return this.rolUser === 'Institucional';
  }

  openModal(modalId: string): void {
    this.modalService.openModal(modalId);
  }

  // Manejar el evento formSubmitted
  onFormSubmitted(): void {
    if (this.selectedCursoId) {
      this.loadHorariosByCurso({ target: { value: this.selectedCursoId } } as unknown as Event);
    }
  }
}