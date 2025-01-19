import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-calendar',
  imports: [NgIf,
    NgForOf,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {

  calendario: any[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadAcademicCalendar();
  }

  // cargar calendario academico
  loadAcademicCalendar() {
    this.adminService.getCalendario().subscribe(
      (resp: any) => {
        this.calendario = resp;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
