import { Component, OnInit } from '@angular/core';
import { RepresentService } from '../../../services/representative/represent.service';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-matriculate-studens',
  imports: [NgIf,
    NgForOf,
  ],
  templateUrl: './matriculate-studens.component.html',
  styleUrl: './matriculate-studens.component.css'
})
export class MatriculateStudensComponent implements OnInit {

  matriculas: any[] = [];

  constructor(private representService: RepresentService) { }

  ngOnInit(): void {
    this.loadMatriculas();
  }

  loadMatriculas(): void {
    this.representService.getMatriculas().subscribe(
      data => {
        this.matriculas = data;
       
      },
      error => {
        console.error('Error al cargar las matrículas:', error);
      }
    );
  }

}
