import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {StudentsService} from "../../../services/students/students.service";

@Component({
    selector: 'app-assignment-view',
    templateUrl: './assignment-view.component.html',
    imports: [
        NgForOf,
        NgIf,
        NgClass
    ],
    styleUrls: ['./assignment-view.component.css']
})
export class AssignmentViewComponent implements OnInit {
    asignacion: any; // Declaramos la variable para asignar los datos de la asignación

    constructor(private studentsService: StudentsService) {
    }

    ngOnInit(): void {
        const assignmentId = parseInt(window.location.pathname.split('/').pop() || '0', 10);

        // Llamamos al método del servicio
        this.studentsService.getAssignmentById(assignmentId).subscribe({
            next: (data) => {
                this.asignacion = data; // Asignamos los datos devueltos por el servicio
                console.log(this.asignacion);
            },
            error: (err) => {
                console.error('Error al obtener la asignación:', err);
            }
        });
    }

}