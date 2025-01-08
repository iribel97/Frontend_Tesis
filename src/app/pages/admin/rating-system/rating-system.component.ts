import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-rating-system',
  imports: [
    NgForOf,
  ],
  templateUrl: './rating-system.component.html',
  styleUrl: './rating-system.component.css'
})
export class RatingSystemComponent implements OnInit{

  ratings: any[] = [];

  constructor(private adminService : AdminService) { }

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

}
