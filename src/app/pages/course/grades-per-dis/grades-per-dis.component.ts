import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../../services/students/students.service';
import { ActivatedRoute } from '@angular/router';
import { DecimalPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-grades-per-dis',
  imports: [NgFor, DecimalPipe],
  templateUrl: './grades-per-dis.component.html',
  styleUrl: './grades-per-dis.component.css'
})
export class GradesPerDisComponent implements OnInit {

  niveles: any[] = [];

  constructor(private studentsService: StudentsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idMateria = +params['id'];
      this.getGradesByDistributivo(idMateria);
    });
  }

  getGradesByDistributivo(id: number): void {
    this.studentsService.getGradesByDistributivo(id).subscribe(
      response => {
        this.niveles = response;
        this.initializeAccordionState(this.niveles);
      },
      error => {
        console.log(error);
      }
    );
  }

  initializeAccordionState(niveles: any[]): void {
    niveles.forEach(nivel => {
      nivel.open = false;
      nivel.niveles?.forEach((subNivel: any) => {
        subNivel.open = false;
        subNivel.siguientNivel?.forEach((siguienteNivel: any) => {
          siguienteNivel.open = false;
          siguienteNivel.nivelEntregas?.forEach((nivelEntrega: any) => {
            nivelEntrega.open = false;
          });
        });
      });
    });
  }

  toggleNivel(nivel: any): void {
    nivel.open = !nivel.open;
  }

  toggleSubNivel(subNivel: any): void {
    subNivel.open = !subNivel.open;
  }

  toggleSiguienteNivel(siguienteNivel: any): void {
    siguienteNivel.open = !siguienteNivel.open;
  }

  toggleNivelEntrega(nivelEntrega: any): void {
    nivelEntrega.open = !nivelEntrega.open;
  }

}
