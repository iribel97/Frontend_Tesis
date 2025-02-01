import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../../DashBoard/calendar/calendar.component';
import { DecimalPipe, NgForOf, NgIf } from '@angular/common';
import { ChartOptions, ChartType, Chart, plugins, registerables } from 'chart.js';
import { RepresentService } from '../../../services/representative/represent.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-representative',
  imports: [CalendarComponent, NgForOf, NgIf, DecimalPipe],
  templateUrl: './dashboard-representative.component.html',
  styleUrl: './dashboard-representative.component.css'
})
export class DashboardRepresentativeComponent implements OnInit {

  attendanceChart: any;
  gradesChart: any;
  selectedStudent: any;
  selectedStudentForGrades: any;

  representados = [
    { nombre: 'Estudiante 1', curso: 'Octavo A', asistencia: 90, promedio: 8.5, conducta: 9.0, materiaBaja: 'Matemáticas', assignments: [{ name: 'Tarea 1', timeRemaining: '2 días' }, { name: 'Tarea 2', timeRemaining: '5 días' }], materias: { Matemáticas: 8.0, Historia: 9.0, Ciencias: 8.5 } },
    { nombre: 'Estudiante 2', curso: 'Noveno B', asistencia: 85, promedio: 7.5, conducta: 8.0, materiaBaja: 'Historia', assignments: [{ name: 'Tarea 3', timeRemaining: '1 día' }, { name: 'Tarea 4', timeRemaining: '3 días' }], materias: { Matemáticas: 7.0, Historia: 7.5, Ciencias: 8.0 } },
    { nombre: 'Estudiante 3', curso: 'Décimo C', asistencia: 95, promedio: 9.0, conducta: 9.5, materiaBaja: 'Ciencias', assignments: [{ name: 'Tarea 5', timeRemaining: '4 días' }, { name: 'Tarea 6', timeRemaining: '6 días' }], materias: { Matemáticas: 9.0, Historia: 9.5, Ciencias: 8.5 } },
    { nombre: 'Estudiante 4', curso: 'Undécimo D', asistencia: 80, promedio: 7.0, conducta: 8.5, materiaBaja: 'Inglés', assignments: [{ name: 'Tarea 7', timeRemaining: '2 días' }, { name: 'Tarea 8', timeRemaining: '7 días' }], materias: { Matemáticas: 6.5, Historia: 7.0, Ciencias: 7.5 } }
  ];

  students: any;

  constructor(private representService : RepresentService) { }

  ngOnInit(): void {
    this.selectedStudent = this.representados[0]; // Selecciona el primer estudiante por defecto
    this.selectedStudentForGrades = this.representados[0]; // Selecciona el primer estudiante por defecto para el gráfico de promedio por materia

    this.getDashboard();

    this.attendanceChart = new Chart('attendanceChartCanvas', {
      type: 'bar',
      data: {
        labels: this.representados.map(rep => rep.nombre),
        datasets: [
          {
            type: 'bar',
            label: 'Asistencias',
            data: this.representados.map(rep => rep.asistencia),
            backgroundColor: 'rgb(168, 209, 209)'
          },
          {
            type: 'bar',
            label: 'Justificados',
            data: this.representados.map(rep => 100 - rep.asistencia), // Ejemplo de datos
            backgroundColor: 'rgba(255, 205, 86)'
          },
          {
            type: 'bar',
            label: 'Atrasado',
            data: this.representados.map(rep => rep.promedio),
            backgroundColor: 'rgb(253, 138, 138)'
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // cargar información general de sus estudiantes
  getDashboard(): void {
    this.representService.getDashboard().subscribe(
      data => {
        console.log(data);
        this.students = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  onStudentChange(event: any): void {
    const studentName = event.target.value;
    this.selectedStudent = this.representados.find(student => student.nombre === studentName);
  }

  onStudentChangeForGrades(event: any): void {
    const studentName = event.target.value;
    this.selectedStudentForGrades = this.representados.find(student => student.nombre === studentName);
    this.updateGradesChart();
  }

  updateGradesChart(): void {
    if (this.gradesChart) {
      this.gradesChart.destroy();
    }

    const materias = this.selectedStudentForGrades.materias;
    this.gradesChart = new Chart('gradesChartCanvas', {
      type: 'bar',
      data: {
        labels: Object.keys(materias),
        datasets: [
          {
            label: 'Promedio',
            data: Object.values(materias),
            backgroundColor: 'rgb(168, 209, 209)',
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
