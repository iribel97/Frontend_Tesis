import { NgForOf, NgIf, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-academic-calendar',
  imports: [
    NgForOf,
  ],
  templateUrl: './academic-calendar.component.html',
  styleUrls: ['./academic-calendar.component.css']
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
