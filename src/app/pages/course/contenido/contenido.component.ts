import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {TeachersService} from "../../../services/teacher/teachers.service";
import {StudentsService} from "../../../services/students/students.service";
import {UtilityService} from "../../../shared/service/utility/utility.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-contenido',
    imports: [
        NgIf
    ],
    templateUrl: './contenido.component.html',
    styleUrl: './contenido.component.css'
})
export class ContenidoComponent implements OnInit {

    constructor(private teachersService: TeachersService,
                private studentsService: StudentsService, // Servicio para obtener datos
                private router: Router,
                private route: ActivatedRoute, // Escucha cambios en la ruta
                protected utilityService: UtilityService
    ) {
    }

    materia: any = null; // Datos completos de la materia desde el backend
    rolUser: string = ''; // Rol del usuario

    ngOnInit(): void {

        // Escuchar cambios en los parámetros de la URL
        this.route.params.subscribe((params) => {
            const idMateria = +params['id']; // Obtener el ID desde la ruta

            this.getInfoUser(idMateria);
        });
    }

    getInfoUser(idMateria: number): void {
        this.studentsService.getUser().subscribe(data => {
            console.log('Información del usuario:', data); // Útil para depuración
            // Verifica que data tenga todas las propiedades necesarias
            if (data && data.cedula && data.nombres && data.apellidos) {
                this.rolUser = data.rol; // Asigna la información del usuario al objeto local
                if (this.rolUser === 'Docente') {
                    this.loadContenidoDocente(idMateria);
                } else {

                    // Llamar al servicio para obtener la materia correspondiente
                    this.getMateria(idMateria);

                }
            } else {
                console.error('Datos incompletos recibidos:', data);
            }
        });
    }

    // Obtener el contenido de la materia del docente
    loadContenidoDocente(idMateria: number): void {
        this.teachersService.getContenido(idMateria).subscribe(
            (data) => {
                this.materia = data;

                // Inicializar estado de los acordeones
                if (this.materia?.unidades) {
                    this.materia.unidades.forEach((unidad: any) => {
                        unidad.open = false;
                        unidad.contenido?.forEach((tema: any) => {
                            tema.open = false;
                        });
                    });
                }
            },
            (error) => {
                console.error('Error al obtener el contenido de la materia del docente:', error);
            }
        );
    }

    // Obtener materia desde el servicio
    getMateria(id: number): void {
        this.studentsService.getMateriaById(id).subscribe(
            (data) => {
                this.materia = data;

                // Inicializar estado de los acordeones
                if (this.materia?.unidades) {
                    this.materia.unidades.forEach((unidad: any) => {
                        unidad.open = false;
                        unidad.contenido?.forEach((tema: any) => {
                            tema.open = false;
                        });
                    });
                }
            },
            (error) => {
                console.error('Error al obtener la materia:', error);
            }
        );
    }

    // Alternar el estado de una unidad
    toggleUnidad(unidad: any): void {
        unidad.open = !unidad.open;
    }

    // Alternar el estado de un tema
    toggleTema(tema: any): void {
        tema.open = !tema.open;
    }

    irADetalleAsignacion(idAsignacion: number, idDistributivo: number): void {
        console.log("idAsignacion:", idAsignacion, "idDistributivo:", idDistributivo);
        this.router.navigate(['/course/assignment', idAsignacion], {state: {data: {idDistributivo}}});
    }

}
