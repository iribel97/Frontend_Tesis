import { Component, OnInit } from '@angular/core';
import { TeachersService } from '../../../services/teacher/teachers.service';
import { NgForOf, NgIf, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-citation-teacher',
  imports: [
    NgForOf, 
    NgIf,
    FormsModule,
    DatePipe,
  ],
  templateUrl: './citation-teacher.component.html',
  styleUrl: './citation-teacher.component.css'
})
export class CitationTeacherComponent implements OnInit {

  citaciones: any[] = [];

  newCitacion: any = {
    fecha: '',
    hora: '',
    motivo: '',
    observaciones: '',
    estudiante: ''
  };

  isModalOpen: boolean = false;
  cursos: any[] = [];
  estudiantes: any[] = [];
  selectedCurso: number | null = null;


  constructor(private teachersService : TeachersService) { }

  ngOnInit(): void {
    this.getCourses();
    this.getCitations();
  }

  // taer todos los cursos
  getCourses(): void {
    this.teachersService.getCursos()
      .subscribe(
        response => {
          console.log(response);
          this.cursos = response;
        },
        error => {
          console.log(error);
        }
      );
  }

  // listar los estudiantes por curso
  getStudentsByCourse(idCurso: number): void {
    this.teachersService.getEstudiantes(idCurso)
      .subscribe(
        response => {
          console.log(response);
          this.estudiantes = response;
        },
        error => {
          console.log(error);
        }
      );
  }

  // listar citaciones
  getCitations(): void {
    this.teachersService.getCitaciones()
      .subscribe(
        response => {
          console.log(response);
          this.citaciones = response.map((citacion: any) => {
            return {
              ...citacion,
              hora: this.convertTimeToDate(citacion.hora)
            };
          });
        },
        error => {
          console.log(error);
        }
      );
  }

  convertTimeToDate(time: string): Date {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds, 0);
    return date;
  }

  onCursoChange(): void {
    if (this.selectedCurso) {
      this.getStudentsByCourse(this.selectedCurso);
    } else {
      this.estudiantes = [];
    }
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  createCitacion(): void {
    // Mostrar los datos en la consola
    console.log('Datos de la nueva citación:', this.newCitacion);

    // Preparar los datos para enviar al backend
    const citacionData = {
      fecha: this.newCitacion.fecha,
      hora: this.newCitacion.hora,
      motivo: this.newCitacion.motivo,
      observaciones: this.newCitacion.observaciones,
      cedulaEst: this.newCitacion.estudiante
    };

    // Enviar los datos al backend
    this.teachersService.createCitacion(citacionData).subscribe(
      response => {
        console.log('Citación creada:', response);
        this.getCitations();
        this.newCitacion = {
          fecha: '',
          hora: '',
          motivo: '',
          observaciones: '',
          estudiante: ''
        };
        this.closeModal();
      },
      error => {
        console.error('Error al crear la citación:', error);
      }
    );
  }

  changeStateCitacion(idCitacion: any, asistencia: boolean): void {
    if (asistencia) {
      this.teachersService.changeStateCitacion(idCitacion).subscribe(
        response => {
          this.getCitations();
        },
        error => {
          console.error('Error al cambiar el estado de la citación:', error);
        }
      );
    }
  }

}
