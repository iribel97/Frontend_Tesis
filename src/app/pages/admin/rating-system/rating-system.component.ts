import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-rating-system',
  imports: [
    NgForOf,
    NgIf,
  ],
  templateUrl: './rating-system.component.html',
  styleUrl: './rating-system.component.css'
})
export class RatingSystemComponent implements OnInit {

  ratings: any[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadRatings();
  }

  // obtener las calificaciones
  loadRatings(): void {
    this.adminService.getCalificacionesByCiclo(5).subscribe(
      (data) => {
        this.ratings = data;
        console.log('Calificaciones:', this.ratings);
      },
      (error) => {
        console.error('Error al cargar las calificaciones:', error);
      }
    );
  }

  // Alternar el estado de apertura de la calificación nivel 1
  toggleRanking(ranking: any): void {
    ranking.open = !ranking.open;
  }

  // Alternar el estado de apertura de la calificación nivel 2
  toggleRanking2(level2: any): void {
    level2.open = !level2.open;
  }

  // Alternar el estado de apertura de la calificación nivel 3
  toggleRanking3(level3: any): void {
    level3.open = !level3.open;
  }

}
