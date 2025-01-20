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
      labels: ['Aceptadas', 'Suspendidas', 'Pendientes'],
      datasets: [{
        label: 'Estado de Matrículas',
        data: [0, 0, 0], // Datos quemados
        backgroundColor: [
          'rgb(199, 199, 255)',
          'rgb(255, 216, 190)',
          'rgb(255, 239, 184)'
        ],
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context: any) {
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
          data: [0, 0, 0], // Datos quemados para Curso A
          backgroundColor: 'rgba(255, 99, 132)',
        },
        {
          label: 'Curso B',
          data: [0, 0, 0], // Datos quemados para Curso B
          backgroundColor: 'rgba(54, 162, 235)',
        },
        {
          label: 'Curso C',
          data: [0, 0, 0], // Datos quemados para Curso C
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

  //MUESTRA EL ESTADO DE LAS INSCRIPCIONES DE LOS ESTUDIANTES
  public studentStatusPieChartConfig: any = {
    type: 'pie',
    data: {
      labels: ['Aceptados', 'Pendientes', 'Rechazados'],
      datasets: [{
        label: 'Estado de Estudiantes',
        data: [0, 0, 0], // Datos quemados
        backgroundColor: [
          'rgb(199, 199, 255)',
          'rgb(255, 216, 190)',
          'rgb(255, 239, 184)'
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
            label: function (context: any) {
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

    this.loadDashInscriptions();
    this.loadDashEnrollments();
    this.loadDashCourses();
  }

  // cargar la cantidad de inscripciones
  loadDashInscriptions() {
    this.opAdminService.getInscripcionesCount().subscribe(
      (data: any) => {
        this.studentStatusPieChartConfig.data.datasets[0].data = [data.completo, data.reservado, data.incompleto];
        this.studentStatusPieChart.update();

      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  // cargar la cantidad de matriculas
  loadDashEnrollments() {
    this.opAdminService.getMatriculasCount().subscribe(
      (data: any) => {
        this.enrollmentPieChartConfig.data.datasets[0].data = [data.completo, data.reservado, data.incompleto];
        this.enrollmentPieChart.update();
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  // cargar la cantidad de estudiantes por curso
  loadDashCourses() {
    this.opAdminService.getEstudiantesPorCurso().subscribe(
      (data: any) => {
        const labels = ['Octavo', 'Noveno', 'Décimo'];
        const colors = [
          'rgb(199, 199, 255)', // lila suave
          'rgb(255, 216, 190)', // naranja pastel
          'rgb(169, 236, 191)', // verde pastel
          'rgb(255, 239, 184)', // amarillo pastel cálido
          'rgb(190, 220, 255)'  // azul pastel frío
        ];
        const datasets = data.map((item: any, index: number) => {
          return {
            label: item.etiqueta,
            data: item.datos.map((d: any) => d.asigEstudiantes),
            backgroundColor: colors[index % colors.length]
          };
        });

        this.courseBarChartConfig.data.labels = labels;
        this.courseBarChartConfig.data.datasets = datasets;
        this.courseBarChart.update();
      },
      (error: any) => {
        console.log(error);
      }
    )
  }


}
