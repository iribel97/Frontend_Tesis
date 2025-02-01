import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../../DashBoard/calendar/calendar.component';
import { ChartOptions, ChartType, Chart, registerables, plugins } from 'chart.js';
import { AdminService } from '../../../services/admin/admin.service';

Chart.register(...registerables);
@Component({
  selector: 'app-dashboard-admin',
  imports: [CalendarComponent],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent implements OnInit {

  // PARA CONOCER LA CANTIDAD DE DOCENTE QUE SE ENCUENTRAN ASIGNADOS Y SIN ASIGNAR EN EL DISTRIBUTIVO
  public pieChartConfig: any = {
    type: 'pie',
    data: {
      labels: ['Asignados', 'Sin asignar'],
      datasets: [{
        label: 'Distribución de Docentes',
        data: [0, 0], // Datos iniciales
        backgroundColor: [
          'rgb(199, 199, 255)',
          'rgb(255, 216, 190)'
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
                label += context.raw + '%';
              }
              return label;
            }
          }
        }
      }
    }
  };

  // PARA CONOCER LA CANTIDAD DE USUARIOS REGISTRADOS POR ROL
  public barChartConfig: any = {
    type: 'bar',
    data: {
      labels: ['Admin', 'Institucional', 'Docentes', 'Estudiantes', 'Representantes'],
      datasets: [{
        label: 'Cantidad',
        data: [0, 0, 0, 0, 0], // Datos quemados
        backgroundColor: [
          'rgb(199, 199, 255)',
          'rgb(255, 216, 190)',
          'rgb(169, 236, 191)',
          'rgb(255, 239, 184)',
          'rgb(190, 220, 255)'
        ],
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        }
      }
    }
  };

  // PARA CONOCER LA CANTIDAD DE ESTUDIANTES POR GRADO
  public mixedChartConfig: any = {
    data: {
      labels: ['Octavo', 'Noveno', 'Décimo'],
      datasets: [
        {
          type: 'bar',
          label: 'Total',
          data: [0, 0, 0], // Datos quemados
          backgroundColor: 'rgb(199, 199, 255)',
        },
        {
          type: 'bar',
          label: 'Asignados',
          data: [0, 0, 0], // Datos quemados
          backgroundColor: 'rgb(255, 216, 190)',
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

  public attendancePieChartConfig: any = {
    type: 'pie',
    data: {
      labels: ['Asistencias', 'Inasistencias', 'Justificaciones'],
      datasets: [{
        label: 'Porcentaje de Asistencias',
        data: [0, 0, 0], // Datos quemados
        backgroundColor: [
          
          'rgb(199, 199, 255)',
          'rgb(255, 216, 190)',
          'rgb(255, 239, 184)',
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
                label += context.raw + '%';
              }
              return label;
            }
          }
        }
      }
    }
  };


  pieChart: any;
  barChart: any;
  mixedChart: any;
  attendancePieChart: any;
  intervalId: any;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.pieChart = new Chart('pieCanvas', this.pieChartConfig);
    this.barChart = new Chart('barCanvas', this.barChartConfig);
    this.mixedChart = new Chart('mixedCanvas', this.mixedChartConfig);
    this.attendancePieChart = new Chart('attendancePieCanvas', this.attendancePieChartConfig);


    this.loadChartData();
    this.loadUserChartData();
    this.loadMixedChartData();
    this.loadAttendanceChartData();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loadChartData(): void {
    this.adminService.getDocentesAsignados().subscribe(
      (data: any) => {
        this.pieChartConfig.data.datasets[0].data = [data.porcentajeCompleto, data.porcentajeIncompleto];
        this.pieChart.update();
      },
      (error: any) => {
        console.error('Error fetching chart data', error);
      }
    );
  }

  loadUserChartData(): void {
    this.adminService.getUsersCount().subscribe(
      (data: any) => {
        this.barChartConfig.data.datasets[0].data = [data.cantAdmin, data.cantAdminOp, data.cantDocente, data.cantEstudiante, data.cantRepresentante];
        this.barChart.update();
      },
      (error: any) => {
        console.error('Error fetching chart data', error);
      }
    );
  }

  loadMixedChartData(): void {
    this.adminService.getStudentsCountPerGrade().subscribe(
      (data: any) => {
        console.log(data);
        const totalEstudiantes = data.map((item: any) => item.totalEstudiantes);
        const asigEstudiantes = data.map((item: any) => item.asigEstudiantes);

        this.mixedChartConfig.data.datasets[0].data = totalEstudiantes;
        this.mixedChartConfig.data.datasets[1].data = asigEstudiantes;
        this.mixedChart.update();
      },
      (error: any) => {
        console.error('Error fetching chart data', error);
      }
    );
  }

  loadAttendanceChartData(): void {
    this.adminService.getAsistenciasByCiclo().subscribe(
      (data: any) => {
        this.attendancePieChartConfig.data.datasets[0].data = [data.porcentajeCompleto, data.porcentajeIncompleto, data.porcentajeReservado];
        this.attendancePieChart.update();
      },
      (error: any) => {
        console.error('Error fetching chart data', error);
      }
    );
  }
}
