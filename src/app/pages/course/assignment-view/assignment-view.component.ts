import {Component, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {StudentsService} from "../../../services/students/students.service";
import {UtilityService} from "../../../shared/service/utility/utility.service";
import {ButtonComponent} from "../../../shared/ui/button/button.component";
import {ModalComponent} from "../../../shared/ui/modal/modal.component";
import {ModalService} from "../../../shared/service/modal/modal.service";
import {SutmitAssignmentComponent} from "../../../forms/student/sutmit-assignment/sutmit-assignment.component";
import {Router} from "@angular/router";

@Component({
    selector: 'app-assignment-view',
    templateUrl: './assignment-view.component.html',
    imports: [
        NgClass,
        ButtonComponent,
        ModalComponent,
        SutmitAssignmentComponent
    ],
    styleUrls: ['./assignment-view.component.css']
})
export class AssignmentViewComponent implements OnInit {
    asignacion: any; // Declaramos la variable para asignar los datos de la asignación
    idAssignment: number = 0;
    idDistributivo?: number; // Almacenar el valor recibido

    constructor(private studentsService: StudentsService,
                protected utilityService: UtilityService,
                private modalService: ModalService,
                private router: Router) {
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

    goBack() {
        this.router.navigate([`/course/${this.idDistributivo}`]);
    }
}