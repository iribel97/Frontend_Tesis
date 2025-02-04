import { Component, OnInit, ViewChild } from '@angular/core';
import { TeachersService } from '../../../services/teacher/teachers.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from '../../../shared/service/utility/utility.service';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from '../../../shared/ui/toast/toast.component';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { ModalService } from '../../../shared/service/modal/modal.service';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';

@Component({
  selector: 'app-assigment-view-docent',
  imports: [
    ToastComponent,
    ModalComponent,
    ButtonComponent,
    FormsModule,
    NgForOf,
    NgIf,
    NgClass,
  ],
  templateUrl: './assigment-view-docent.component.html',
  styleUrl: './assigment-view-docent.component.css'
})
export class AssigmentViewDocentComponent implements OnInit {

  idAssignment: number = 0;
  idDistributivo?: number; // Almacenar el valor recibido
  asignacion: any = {};
  selectedEntrega: any = null;
  nota: number = 0; // Nota a enviar

  @ViewChild('toast', { static: true }) toast!: ToastComponent;

  constructor(private teachersService: TeachersService,
    private router: Router,
    private http: HttpClient,
    protected modalService: ModalService,
    protected utilityService: UtilityService,
  ) { }

  ngOnInit(): void {
    // traer el id de la url
    const assignmentId = parseInt(window.location.pathname.split('/').pop() || '0', 10);

    // Verificar si el estado viene desde la navegación activa
    const navigation = this.router.getCurrentNavigation();
    let state = navigation?.extras.state;

    // Si el estado es undefined, intentamos usar la API de historial
    if (!state || !state['data']) {
      state = window.history.state;
      console.log('Estado recuperado desde window.history.state:', state);
    } else {
      console.log('Estado recibido desde getCurrentNavigation:', state);
    }

    // Si el estado incluye data, asignamos idDistributivo
    if (state && state['data']) {
      this.idDistributivo = state['data'].idDistributivo;
      console.log('idDistributivo recibido:', this.idDistributivo);
    } else {
      console.log('No se recibió información desde el estado.');
    }

    // llamar al servicio donde trae la asignación y 
    this.teachersService.getAsignacion(assignmentId).subscribe(
      (response: any) => {
        this.asignacion = response; // Asignamos los datos devueltos por el servicio
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  goBack() {
    this.router.navigate([`/course/${this.idDistributivo}`]);
  }

  openModal(modalId: string): void {
    this.modalService.openModal(modalId);
  }

  openEntregaModal(entrega: any): void {
    this.selectedEntrega = entrega;
    this.openModal('openEntrega');
  }

  closeEntregaModal(): void {
    this.selectedEntrega = null;
    this.modalService.closeModal('openEntrega');
  }

  // Método para enviar la calificación al backend
  enviarCalificacion(event: Event, idEntrega: number): void {
    event.preventDefault();

    const payload = {
      idEntrega: idEntrega,
      nota: this.nota.toString(), // Convertir a cadena según el formato del backend
    };

    this.http.put('http://localhost:8080/api/docente/entrega/calificar', payload).subscribe({
      next: (response: any) => {
        if (!response.error) {
          this.toast.showToast('success', '¡Éxito!', 'Calificación enviada correctamente.', 10000);
          // actializar los datos de la entrega
          this.selectedEntrega.nota = this.nota;
          this.selectedEntrega.estado = 'Calificado';
        } else {
          this.toast.showToast('error', 'Error al calificar', response.mensaje, 10000);
        }
      },
      error: (error) => {
        console.error('Error al enviar la calificación', error);
        this.toast.showToast('error', 'Error', 'No se pudo enviar la calificación.', 10000);
      },
      complete: () => {
        this.modalService.closeModal('calificarEntrega'); // Cerrar el modal
      }
    });
  }

}
