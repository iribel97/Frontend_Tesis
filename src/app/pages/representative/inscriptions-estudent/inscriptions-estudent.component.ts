import { Component, OnInit } from '@angular/core';
import { RepresentService } from '../../../services/representative/represent.service';
import { NgForOf, NgIf } from '@angular/common';
import { InscriptionComponent } from '../../../forms/representative/inscription/inscription.component';

@Component({
  selector: 'app-inscriptions-estudent',
  imports: [NgForOf, NgIf, InscriptionComponent],
  templateUrl: './inscriptions-estudent.component.html',
  styleUrl: './inscriptions-estudent.component.css'
})
export class InscriptionsEstudentComponent implements OnInit {

  estudiantes: any[] = [];
  isModalOpen = false;

  constructor(private representService: RepresentService) { }

  ngOnInit(): void {
    this.loadEstudiantesInscritos();
  }

  loadEstudiantesInscritos(): void {
    this.representService.getInscripciones().subscribe(
      data => {
        this.estudiantes = data;
        console.log('Estudiantes inscritos:', this.estudiantes);
      },
      error => {
        console.error('Error al cargar los estudiantes inscritos:', error);
      }
    );
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  // Método para manejar el evento formSubmitted
  onFormSubmitted(): void {
    this.loadEstudiantesInscritos();
  }
}