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

  students: any[] = [];
  estudiantes: any[] = []; // para el select de estudiantes
  promedios: any[] = [];

  constructor(private representService: RepresentService) { }

  ngOnInit(): void {
    this.selectedStudent = this.representados[0]; // Selecciona el primer estudiante por defecto
    this.selectedStudentForGrades = this.representados[0]; // Selecciona el primer estudiante por defecto para el gráfico de promedio por materia

    this.getDashboard();
    this.loadEstudiantes();
    this.loadAttendanceChart();
    this.getpromGeneral();
  }

  loadAttendanceChart(): void {
    this.representService.getAsistencias().subscribe(
      data => {
        let labels = [];
        let attendanceData = [];
        let justifiedData = [];
        let lateData = [];

        if (data && data.length > 0) {
          labels = data.map((item: any) => item.apellidos + ' ' + item.nombres);
          attendanceData = data.map((item: any) => item.data.totalAsist);
          justifiedData = data.map((item: any) => item.data.totalJustificadas);
          lateData = data.map((item: any) => item.data.totalFaltas);
        } else {
          // Valores por defecto cuando no hay datos
          labels = [' '];
          attendanceData = [0];
          justifiedData = [0];
          lateData = [0];
        }

        this.attendanceChart = new Chart('attendanceChartCanvas', {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                type: 'bar',
                label: 'Asistencias',
                data: attendanceData,
                backgroundColor: 'rgb(168, 209, 209)'
              },
              {
                type: 'bar',
                label: 'Justificados',
                data: justifiedData,
                backgroundColor: 'rgba(255, 205, 86)'
              },
              {
                type: 'bar',
                label: 'Atrasado',
                data: lateData,
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
      },
      error => {
        console.log(error);
        // Valores por defecto en caso de error
        const labels = [''];
        const attendanceData = [0];
        const justifiedData = [0];
        const lateData = [0];

        this.attendanceChart = new Chart('attendanceChartCanvas', {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                type: 'bar',
                label: 'Asistencias',
                data: attendanceData,
                backgroundColor: 'rgb(168, 209, 209)'
              },
              {
                type: 'bar',
                label: 'Justificados',
                data: justifiedData,
                backgroundColor: 'rgba(255, 205, 86)'
              },
              {
                type: 'bar',
                label: 'Atrasado',
                data: lateData,
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
    );
  }

  // cargar información general de sus estudiantes
  getDashboard(): void {
    this.representService.getDashboard().subscribe(
      data => {
        this.students = data;
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
    this.representService.getAsignaciones(studentCedula).subscribe(
      data => {
        this.selectedStudent = data;
      },
      error => {
        console.error('Error al cargar las asignaciones:', error);
      }
    );
  }

  getpromGeneral(): void {
    this.representService.getPromedios().subscribe(
      data => {
        this.promedios = data;
      },
      error => {
        console.error('Error al cargar los promedios:', error);
      }
    );
  }

  onStudentChangeForGrades(event: any): void {
    const studentCedula = event.target.value;
    this.representService.getPromedioByEst(studentCedula).subscribe(
      data => {
        this.selectedStudentForGrades = data;
        this.updateGradesChart();
      },
      error => {
        console.error('Error al cargar las notas:', error);
      }
    );
  }

  updateGradesChart(): void {
    if (this.gradesChart) {
      this.gradesChart.destroy();
    }

    const labels = this.selectedStudentForGrades.map((item: any) => item.nombreMateria);
    const data = this.selectedStudentForGrades.map((item: any) => item.promedio);

    this.gradesChart = new Chart('gradesChartCanvas', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Promedio',
            data: data,
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
