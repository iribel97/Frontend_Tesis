import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../../DashBoard/calendar/calendar.component';
import { OpAdminService } from '../../../services/opAdmin/op-admin.service';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import { NgForOf } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-op-admin',
  imports: [CalendarComponent],
  templateUrl: './dashboard-op-admin.component.html',
  styleUrl: './dashboard-op-admin.component.css'
})
export class DashboardOpAdminComponent implements OnInit {

  // MUESTRA EL ESTADO DE LA MATRICULA DE LOS ESTUDIANTES
  public enrollmentPieChartConfig: any = {
    type: 'pie',
    data: {
      labels: ['Aceptadas', 'Pendientes', 'Suspendidas'],
      datasets: [{
        label: 'Estado de Matrículas',
        data: [10, 20, 5], // Datos quemados
        backgroundColor: [
          'rgb(199, 199, 255)',
          'rgb(75, 192, 192)',
          'rgb(255, 99, 132)'
        ],
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context: any) {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              if (context.raw !== null) {
                label += context.raw;
              }
              return label;
            }
          }
        }
      }
    }
  };

  // MUESTRA LA CANTIDAD DE ESTUDIANTES POR CURSO
  public courseBarChartConfig: any = {
    type: 'bar',
    data: {
      labels: ['Octavo', 'Noveno', 'Décimo'], // Etiquetas de los grados
      datasets: [
        {
          label: 'Curso A',
          data: [30, 28, 26], // Datos quemados para Curso A
          backgroundColor: 'rgba(255, 99, 132)',
        },
        {
          label: 'Curso B',
          data: [25, 22, 24], // Datos quemados para Curso B
          backgroundColor: 'rgba(54, 162, 235)',
        },
        {
          label: 'Curso C',
          data: [20, 18, 19], // Datos quemados para Curso C
          backgroundColor: 'rgba(75, 192, 192)',
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

  //MUESTRA EL ESTADO DE LAS MATRICULAS DE LOS ESTUDIANTES
  public studentStatusPieChartConfig: any = {
    type: 'pie',
    data: {
      labels: ['Aceptados', 'Pendientes', 'Rechazados'],
      datasets: [{
        label: 'Estado de Estudiantes',
        data: [50, 30, 10], // Datos quemados
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(255, 99, 132)'
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
                label += context.raw;
              }
              return label;
            }
          }
        }
      }
    }
  };

  enrollmentPieChart: any;
  studentStatusPieChart: any;
  courseBarChart: any;

  
  constructor(private opAdminService: OpAdminService) { }

  ngOnInit(): void {
    this.enrollmentPieChart = new Chart('enrollmentPieCanvas', this.enrollmentPieChartConfig);
    this.studentStatusPieChart = new Chart('studentStatusPieCanvas', this.studentStatusPieChartConfig);
    this.courseBarChart = new Chart('courseBarCanvas', this.courseBarChartConfig);

  }


}
