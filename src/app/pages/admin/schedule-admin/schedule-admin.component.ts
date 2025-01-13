import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentsService } from '../../../services/students/students.service';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';
import { ModalService } from '../../../shared/service/modal/modal.service';
import { FormAddScheduleComponent } from '../../../forms/adminOp/form-add-schedule/form-add-schedule.component';

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
  selectedCursoId: number | null = null;
  horarios: any[] = [];
  loadingHorarios = false;
  

  rolUser = '';

  constructor(private adminService: AdminService,
    private studentsService: StudentsService,
    private modalService: ModalService) {

  }

  ngOnInit(): void {
    this.loadCursos();
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

  getInfoUser() {
    this.studentsService.getUser().subscribe(data => {
      console.log('Información del usuario:', data); // Útil para depuración
      // Verifica que data tenga todas las propiedades necesarias
      if (data && data.cedula && data.nombres && data.apellidos) {
        this.rolUser = data.rol; // Asigna la información del usuario al objeto local
      } else {
        console.error('Datos incompletos recibidos:', data);
      }
    });
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