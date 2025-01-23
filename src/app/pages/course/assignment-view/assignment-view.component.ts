import {Component, OnInit, ViewChild} from '@angular/core';
import {NgClass} from "@angular/common";
import {StudentsService} from "../../../services/students/students.service";
import {UtilityService} from "../../../shared/service/utility/utility.service";
import {ButtonComponent} from "../../../shared/ui/button/button.component";
import {ModalComponent} from "../../../shared/ui/modal/modal.component";
import {ModalService} from "../../../shared/service/modal/modal.service";
import {SutmitAssignmentComponent} from "../../../forms/student/sutmit-assignment/sutmit-assignment.component";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastComponent} from "../../../shared/ui/toast/toast.component";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-assignment-view',
    templateUrl: './assignment-view.component.html',
    imports: [
        NgClass,
        ButtonComponent,
        ModalComponent,
        SutmitAssignmentComponent,
        ToastComponent,
        FormsModule
    ],
    styleUrls: ['./assignment-view.component.css']
})
export class AssignmentViewComponent implements OnInit {
    asignacion: any; // Declaramos la variable para asignar los datos de la asignación
    idAssignment: number = 0;
    idDistributivo?: number; // Almacenar el valor recibido
    nota: number = 1; // Nota a enviar

    @ViewChild('toast', {static: true}) toast!: ToastComponent;


    constructor(private studentsService: StudentsService,
                protected utilityService: UtilityService,
                protected modalService: ModalService,
                private router: Router,
                private http: HttpClient
    ) {
    }

    ngOnInit(): void {
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

        // Llamamos al método del servicio para obtener la asignación por ID
        this.studentsService.getAssignmentById(assignmentId).subscribe({
            next: (data) => {
                this.asignacion = data; // Asignamos los datos devueltos por el servicio
                this.idAssignment = data.entregaEst.id;
            },
            error: (err) => {
                console.error('Error al obtener la asignación:', err);
            }
        });
    }

    openModal(modalId: string): void {
        this.modalService.openModal(modalId);
    }

    // Método para enviar la calificación al backend
    enviarCalificacion(event: Event): void {
        event.preventDefault();

        const payload = {
            idEntrega: this.idAssignment,
            nota: this.nota.toString(), // Convertir a cadena según el formato del backend
        };

        this.http.put('http://localhost:8080/api/docente/entrega/calificar', payload).subscribe({
            next: (response: any) => {
                if (!response.error) {
                    this.toast.showToast('success', '¡Éxito!', 'Calificación enviada correctamente.', 10000);
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

    goBack() {
        this.router.navigate([`/course/${this.idDistributivo}`]);
    }

}