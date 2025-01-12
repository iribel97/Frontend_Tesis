import { NgForOf, NgIf, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';
import { ModalService } from '../../../shared/service/modal/modal.service';
import { FormAcademicCalendarComponent } from '../../../forms/admin/form-academic-calendar/form-academic-calendar.component';

@Component({
  selector: 'app-academic-calendar',
  imports: [
    NgForOf,
    ModalComponent,
    FormAcademicCalendarComponent,
  ],
  templateUrl: './academic-calendar.component.html',
  styleUrls: ['./academic-calendar.component.css']
})
export class AcademicCalendarComponent implements OnInit {

  events: any[] = [];

  constructor(private adminService: AdminService,
    private modalService: ModalService
  ) { }

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

  // Método para manejar el evento formSubmitted
  onFormSubmitted(): void {
    this.loadEvents();
  }

  openModal(modalId: string): void {
    this.modalService.openModal(modalId);
  }

}
