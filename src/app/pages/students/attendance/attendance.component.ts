import { Component, OnInit } from '@angular/core';
import { NgForOf } from "@angular/common";
import { StudentsService } from "../../../services/students/students.service";
import { TeachersService } from '../../../services/teacher/teachers.service';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    imports: [
        NgForOf
    ],
    styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
    data: any;

    rolUser: string = ''; // Rol del usuario

    constructor(private studentsService: StudentsService, private teachersService: TeachersService) {
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
                } else {

                    // Llamar al servicio para obtener la materia correspondiente
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
}