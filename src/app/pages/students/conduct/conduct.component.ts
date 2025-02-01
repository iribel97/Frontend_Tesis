import { Component } from '@angular/core';
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-conduct',
  imports: [
    NgForOf
  ],
  templateUrl: './conduct.component.html',
  styleUrl: './conduct.component.css'
})
export class ConductComponent {

  data = [
    {
      materia: 'Matemáticas',
      data: [
        {
          primerParcial: 'A',
          segundoParcial: 'A',
          promedio: 'A'
        },
        {
          primerParcial: 'A',
          segundoParcial: 'A',
          promedio: 'A'
        },
        {
          primerParcial: 'A',
          segundoParcial: 'A',
          promedio: 'A'
        }
      ],
      promedio: 'A'
    },
    {
      materia: 'Historia',
      data: [
        {
          primerParcial: 'A',
          segundoParcial: 'A',
          promedio: 'A'
        },
        {
          primerParcial: 'A',
          segundoParcial: 'A',
          promedio: 'A'
        },
        {
          primerParcial: 'A',
          segundoParcial: 'A',
          promedio: 'A'
        }
      ],
      promedio: 'A'
    }
  ];

}
