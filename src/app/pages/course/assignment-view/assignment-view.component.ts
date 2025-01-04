import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {StudentsService} from "../../../services/students/students.service";
import {UtilityService} from "../../../shared/service/utility/utility.service";
import {ButtonComponent} from "../../../shared/ui/button/button.component";
import {ModalComponent} from "../../../shared/ui/modal/modal.component";
import {ModalService} from "../../../shared/service/modal/modal.service";
import {SutmitAssignmentComponent} from "../../../forms/student/sutmit-assignment/sutmit-assignment.component";

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

    constructor(private studentsService: StudentsService, protected utilityService: UtilityService, private modalService: ModalService) {
    }

    ngOnInit(): void {
        const assignmentId = parseInt(window.location.pathname.split('/').pop() || '0', 10);

        // Llamamos al método del servicio
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

}