import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartConfiguration, ChartOptions } from 'chart.js';

Chart.register(...registerables);

@Component({
    selector: 'app-home',
    imports: [
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
// Datos y configuración para el gráfico de barras
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartData: ChartConfiguration['data'] = {
    labels: this.barChartLabels,
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ]
  };

  // Datos y configuración para el gráfico de línea
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartData: ChartConfiguration['data'] = {
    labels: this.lineChartLabels,
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        fill: false,
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'Series B',
        fill: false,
      }
    ]
  };

  // Datos y configuración para el gráfico de pastel
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public pieChartData: ChartConfiguration['data'] = {
    labels: this.pieChartLabels,
    datasets: [
      {
        data: [300, 500, 100]
      }
    ]
  };
}
