import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { StudentsService } from "../../../services/students/students.service";
import { TeachersService } from '../../../services/teacher/teachers.service';
import { RepresentService } from '../../../services/representative/represent.service';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    imports: [
        NgForOf,
        NgIf,
    ],
    styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
    data: any;
    estudiantes: any[] = [];
    selectedStudent: string = '';
    rolUser: string = ''; // Rol del usuario

    constructor(
        private studentsService: StudentsService,
        private teachersService: TeachersService,
        private representService: RepresentService,
    ) {
    }

    ngOnInit(): void {
        this.getInfoUser();
    }

    getInfoUser(): void {
        this.studentsService.getUser().subscribe(data => {
            // Verifica que data tenga todas las propiedades necesarias
            if (data && data.cedula && data.nombres && data.apellidos) {
                this.rolUser = data.rol; // Asigna la información del usuario al objeto local
                if (this.rolUser === 'Docente') {
                    this.getDataDocente();
                } else if (this.rolUser === 'Representante') {
                    this.loadEstudiantes();
                } else {
                    this.getdata();
                }
            } else {
                console.error('Datos incompletos recibidos:', data);
            }
        });
    }

    getDataDocente() {
        this.teachersService.getAsistenciasGeneral().subscribe(data => {
            this.data = data;
        });
    }

    getdata() {
        this.studentsService.getAttendance().subscribe(data => {
            console.log(data);
            this.data = data;
        });
    }

    loadEstudiantes(): void {
        this.representService.getEstudiantes().subscribe(
            data => {
                this.estudiantes = data;
            },
            error => {
                console.error('Error al cargar los estudiantes:', error);
            }
        );
    }

    onStudentChange(event: any): void {
        const studentCedula = event.target.value;
        this.representService.getAsistenciasByEst(studentCedula).subscribe(
            data => {
                this.data = data;
            },
            error => {
                console.error('Error al cargar las asistencias:', error);
            }
        );
    }
}