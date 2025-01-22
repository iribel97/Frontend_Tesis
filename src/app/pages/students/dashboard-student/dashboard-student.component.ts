import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../../DashBoard/calendar/calendar.component';
import { DecimalPipe, NgForOf } from '@angular/common';
import { StudentsService } from '../../../services/students/students.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-student',
  imports: [CalendarComponent, NgForOf, DecimalPipe],
  templateUrl: './dashboard-student.component.html',
  styleUrl: './dashboard-student.component.css'
})
export class DashboardStudentComponent implements OnInit {

  tareas: any;

  principal: any;

  grades: any;


  constructor(private studentsService: StudentsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadPrincipal();
    this.loadTareas();
    this.loadNotas();
  }

  // cargar principal
  loadPrincipal() {
    this.studentsService.getPrincipal().subscribe(data => {
      this.principal = data;
    });
  }

  // cargar tareas pendientes
  loadTareas() {
    this.studentsService.getAssignmentsDash().subscribe(data => {
      this.tareas = data;
    });
  }

  // cargar las notas
  loadNotas() {
    this.studentsService.getGrades().subscribe(data => {
      this.grades = data;
    });
  }

  irADetalleAsignacion(idAsignacion: number, idDistributivo: number): void {
    console.log("idAsignacion:", idAsignacion, "idDistributivo:", idDistributivo);
    this.router.navigate(['/course/assignment', idAsignacion], { state: { data: { idDistributivo } } });
  }


  currentIndex = 0;

  get currentTranslate() {
    return -this.currentIndex * 320; // Ancho de la tarjeta + espacio
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextSlide() {
    if (this.currentIndex < this.grades.length - 1) {
      this.currentIndex++;
    }
  }

}
