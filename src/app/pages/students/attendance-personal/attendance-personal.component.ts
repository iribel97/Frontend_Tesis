import { NgForOf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../../services/students/students.service';
import { UtilityService } from '../../../shared/service/utility/utility.service';

@Component({
  selector: 'app-attendance-personal',
  imports: [NgForOf],
  templateUrl: './attendance-personal.component.html',
  styleUrl: './attendance-personal.component.css'
})
export class AttendancePersonalComponent implements OnInit {

  asistencia: any = null; // Datos de asistencia del estudiante

  constructor(private cdr: ChangeDetectorRef,
          private route: ActivatedRoute, // Escucha cambios en la ruta
          private studentsService: StudentsService, // Servicio para obtener datos
          protected utilityService: UtilityService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idMateria = +params['id']; // Obtener el ID desde la ruta

      this.getAsistencia(idMateria);
  });
  }

  
    // Obtener asistencia desde el servicio
    getAsistencia(idDistributivo: number): void {
      this.studentsService.getAttendanceByDistributivo(idDistributivo).subscribe(
          (data) => {
              this.asistencia = data;
          },
          (error) => {
              console.error('Error al obtener la asistencia:', error);
          }
      );
  }

}
