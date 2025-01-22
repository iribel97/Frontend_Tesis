import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../../DashBoard/calendar/calendar.component';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import { TeachersService } from '../../../services/teacher/teachers.service';
import { DecimalPipe, NgForOf, NgIf } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-teacher',
  imports: [CalendarComponent, NgForOf, DecimalPipe, NgIf],
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
        data: [0, 0, 0], // Datos quemados
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

  public averageBarChartConfig: any = {
    type: 'bar',
    data: {
      labels: [], // Etiquetas de las materias
      datasets: [
        {
          label: 'Asistencias',
          data: [], // Datos quemados para asistencias
          backgroundColor: 'rgb(197, 186, 255)'
        },
        {
          label: 'Inasistencias',
          data: [], // Datos quemados para inasistencias
          backgroundColor: 'rgb(252, 174, 174)'
        },
        {
          label: 'Justificaciones',
          data: [], // Datos quemados para justificaciones
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

  horario: any;
  asignacionesPendientes: any;
  promDistri: any;

  // VARIABLES EN CASO DE SER TUTOR
  isTutor: boolean = true;
  cursoTutor: any;
  estudentWorstProm: any;
  studentWordtAttendance: any;
  worstProm: any;

  constructor(private teachersService: TeachersService) { }

  ngOnInit(): void {
    this.attendancePieChart = new Chart('attendancePieCanvas', this.attendancePieChartConfig);
    this.averageBarChart = new Chart('averageBarCanvas', this.averageBarChartConfig);
    this.loadTutorData();
    this.loadHorarioHoy();
    this.loadAsignacionesPendientes();
    this.loadDashboardPromedios();
  }

  // cargar datos en caro de ser tutor
  loadTutorData() {
    this.teachersService.getTutoria().subscribe((data: any) => {
      if (data) {
        this.isTutor = true;
        this.cursoTutor = data.curso;
        this.estudentWorstProm = data.peorProm?.nombreEstudiante || null;
        this.studentWordtAttendance = data.estMasInasistencias ? `${data.estMasInasistencias.apellidos} ${data.estMasInasistencias.nombres}` : null;
        this.worstProm = data.notasEstudiantes || [];

        const asistenciasGeneral = data.asistenciasGeneral;
        if (asistenciasGeneral) {
          this.attendancePieChartConfig.data.datasets[0].data = [
            asistenciasGeneral.porcentajeCompleto,
            asistenciasGeneral.porcentajeIncompleto,
            asistenciasGeneral.porcentajeReservado
          ];
          this.attendancePieChart.update();
        }

        const asistenciaByMateria = data.asistenciaByMateria;
        if (asistenciaByMateria) {
          this.averageBarChartConfig.data.labels = asistenciaByMateria.map((item: any) => item.materia);
          this.averageBarChartConfig.data.datasets[0].data = asistenciaByMateria.map((item: any) => item.asistidos);
          this.averageBarChartConfig.data.datasets[1].data = asistenciaByMateria.map((item: any) => item.faltas);
          this.averageBarChartConfig.data.datasets[2].data = asistenciaByMateria.map((item: any) => item.justificados);
          this.averageBarChart.update();
        }
      } else {
        this.isTutor = false;
      }

    });
  }

  // cargar el horario del día de hoy del docente
  loadHorarioHoy() {
    this.teachersService.getHorarioHoy().subscribe((data: any) => {
      if (data && data.length > 0) {
        this.horario = data;
      } else {
        this.horario = null;
      }
    });
  }

  // cargar las asignaciones pendientes por revisar
  loadAsignacionesPendientes() {
    this.teachersService.getAsignacionesPendientes().subscribe((data: any) => {
      // si data es nulo que me devuelva un hola mundo
      if (data && data.length > 0) {
        this.asignacionesPendientes = data;
      } else {
        this.asignacionesPendientes = null;
      }
    });
  }

  // cargar el promedio de los distributivos que imparte el docente
  loadDashboardPromedios() {
    this.teachersService.getDashboardPromedios().subscribe((data: any) => {
      this.promDistri = data;
    });
  }
}
