import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule-admin',
  imports: [
    NgForOf,
    NgIf,
    FormsModule, // Agregar FormsModule a los imports
  ],
  templateUrl: './schedule-admin.component.html',
  styleUrl: './schedule-admin.component.css'
})
export class ScheduleAdminComponent implements OnInit {

  cursos: any[] = [];
  selectedCursoId: number | null = null;
  horarios: any[] = [];
  loadingHorarios = false;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadCursos();
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
}