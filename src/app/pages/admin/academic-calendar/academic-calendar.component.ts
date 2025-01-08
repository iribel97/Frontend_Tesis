import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-academic-calendar',
  imports: [
    NgForOf,
    NgIf,
  ],
  templateUrl: './academic-calendar.component.html',
  styleUrl: './academic-calendar.component.css'
})
export class AcademicCalendarComponent implements OnInit {

  events : any[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  // Cargar eventos del calendario académico
  loadEvents(): void {
    this.adminService.getCalendarioByCiclo(5).subscribe(
      (data) => {
        this.events = data;
      },
      (error) => {
        console.error('Error al cargar los eventos:', error);
      }
    );
  }

}
