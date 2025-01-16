import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../../DashBoard/calendar/calendar.component';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import { TeachersService } from '../../../services/teacher/teachers.service';
import { NgForOf } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-teacher',
  imports: [CalendarComponent],
  templateUrl: './dashboard-teacher.component.html',
  styleUrl: './dashboard-teacher.component.css'
})
export class DashboardTeacherComponent implements OnInit {

  public attendancePieChartConfig: any = {
    type: 'pie',
    data: {
      labels: ['Asistencias', 'Inasistencias', 'Justificaciones'],
      datasets: [{
        label: 'Porcentaje de Asistencias',
        data: [70, 20, 10], // Datos quemados
        backgroundColor: [
          'rgb(197, 186, 255)',
          'rgb(252, 174, 174)',
          'rgb(255, 232, 147)'
        ],
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true, // Mostrar la leyenda
        },
        tooltip: {
          callbacks: {
            label: function(context: any) {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              if (context.raw !== null) {
                label += context.raw + '%';
              }
              return label;
            }
          }
        }
      }
    }
  };

  public averageBarChartConfig: any = {
    type: 'bar',
    data: {
      labels: ['Matemáticas', 'Ciencias', 'Historia'], // Etiquetas de las materias
      datasets: [
        {
          label: 'Asistencias',
          data: [60, 70, 65], // Datos quemados para asistencias
          backgroundColor: 'rgb(197, 186, 255)'
        },
        {
          label: 'Inasistencias',
          data: [30, 20, 25], // Datos quemados para inasistencias
          backgroundColor: 'rgb(252, 174, 174)'
        },
        {
          label: 'Justificaciones',
          data: [10, 10, 10], // Datos quemados para justificaciones
          backgroundColor: 'rgb(255, 232, 147)'
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
  };

  attendancePieChart: any;
  subjectAttendancePieChart: any;
  averageBarChart: any;

  constructor(private teachersService: TeachersService) { }

  ngOnInit(): void {
    this.attendancePieChart = new Chart('attendancePieCanvas', this.attendancePieChartConfig);
    this.averageBarChart = new Chart('averageBarCanvas', this.averageBarChartConfig);
  }
}
