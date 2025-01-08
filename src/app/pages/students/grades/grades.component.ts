import { Component } from '@angular/core';
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-grades',
  imports: [
    NgForOf
  ],
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.css'
})
export class GradesComponent {
  data = [
    {
      materia: 'Matemáticas',
      data: [
        {
          primerParcial: '8.5',
          segundoParcial: '9.0',
          promedio: '8.75'
        },
        {
          primerParcial: '8.5',
          segundoParcial: '9.0',
          promedio: '8.75'
        },
        {
          primerParcial: '8.5',
          segundoParcial: '9.0',
          promedio: '8.75'
        }
      ],
      promedio: '8.75'
    },
    {
      materia: 'Historia',
      data: [
        {
          primerParcial: '7.0',
          segundoParcial: '8.0',
          promedio: '7.5'
        },
        {
          primerParcial: '8.5',
          segundoParcial: '9.0',
          promedio: '8.75'
        },
        {
          primerParcial: '8.5',
          segundoParcial: '9.0',
          promedio: '8.75'
        }
      ],
      promedio: '7.5'
    }
  ];

}
