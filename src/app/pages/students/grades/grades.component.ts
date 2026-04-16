import { Component, OnInit } from '@angular/core';
import { DecimalPipe, NgForOf, NgIf } from "@angular/common";
import { StudentsService } from '../../../services/students/students.service';
import { TeachersService } from '../../../services/teacher/teachers.service';
import { RepresentService } from '../../../services/representative/represent.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-grades',
  imports: [
    NgForOf,
    DecimalPipe,
    NgIf,
  ],
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.css'
})
export class GradesComponent implements OnInit {

  materias: any[] = [];
  estudiantes: any[] = [];
  selectedStudent: string = '';
  rolUser: string = ''; // Rol del usuario

  constructor(
    private studentsService: StudentsService, 
    private teachersService : TeachersService,
    private representService: RepresentService,
  ) { }

  ngOnInit(): void {
    this.getInfoUser();
  }

  getInfoUser(): void {
    this.studentsService.getUser().subscribe(data => {
      // Verifica que data tenga todas las propiedades necesarias
      if (data && data.cedula && data.nombres && data.apellidos) {
        this.rolUser = data.rol; // Asigna la información del usuario al objeto local
        if (this.rolUser === 'Docente') {
          this.loadNotasDocente();
        } else if (this.rolUser === 'Representante') {
          this.loadEstudiantes();
        } else {
          this.getGrades();
        }
      } else {
        console.error('Datos incompletos recibidos:', data);
      }
    });
  }

  // Obtener las notas del docente
  loadNotasDocente(): void {
    this.teachersService.getNotas().subscribe(
      (data) => {
        this.materias = data;
      },
      (error) => {
        console.error('Error al obtener las notas del docente:', error);
      }
    );
  }

  // traer todas las notas
  getGrades(): void {
    this.studentsService.getGrades().subscribe(
      response => {
        this.materias = response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
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

  onStudentChange(event: any): void {
    const studentCedula = event.target.value;
    this.representService.getPromedioByEst(studentCedula).subscribe(
      data => {
        this.materias = data;
      },
      error => {
        console.error('Error al cargar los promedios:', error);
      }
    );
  }


}
