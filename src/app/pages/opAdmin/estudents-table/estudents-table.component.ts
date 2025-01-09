import { Component, OnInit } from '@angular/core';
import { OpAdminService } from '../../../services/opAdmin/op-admin.service';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-estudents-table',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './estudents-table.component.html',
  styleUrl: './estudents-table.component.css'
})
export class EstudentsTableComponent implements OnInit {

  estudiantes: any[] = [];

  constructor(private opAdminService: OpAdminService) { }

  ngOnInit(): void {
    this.loadEstudiantesMatriculados();
  }

  // cargar metodo estudiantes matriculados
  loadEstudiantesMatriculados(): void {
    this.opAdminService.getEstudiantesMatriculados().subscribe(
      (data) => {
        this.estudiantes = data;
        console.log("Estudiantes matriculados:", this.estudiantes);
      },
      (error) => {
        console.error('Error al cargar los estudiantes matriculados:', error);
      }
    );
  }

}
