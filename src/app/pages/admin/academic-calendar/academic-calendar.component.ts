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
  paginatedEvents: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;
  isAddCalendarModalOpen = false;

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
        this.updatePagination();
      },
      (error) => {
        console.error('Error al cargar los eventos:', error);
      }
    );
  }

  // Método para manejar el evento formSubmitted
  onFormSubmitted(): void {
    this.loadEvents();
    this.closeModal('addCalendar'); // Cerrar el modal después de enviar el formulario
  }

  openModal(modalId: string): void {
    this.isAddCalendarModalOpen = true;
    this.modalService.openModal(modalId);
  }

  closeModal(modalId: string): void {
    this.isAddCalendarModalOpen = false;
    this.modalService.closeModal(modalId);
  }

  editEvent(event: any): void {
    // Lógica para editar el evento
  }

  deleteEvent(event: any): void {
    // Lógica para eliminar el evento
  }

  // Paginación
  updatePagination(): void {
    this.totalPages = Math.ceil(this.events.length / this.itemsPerPage);
    this.paginatedEvents = this.events.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

}
