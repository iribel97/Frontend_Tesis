import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { StudentsService } from "../../../services/students/students.service";
import { UtilityService } from "../../../shared/service/utility/utility.service";
import { TabsComponent } from '../../../shared/ui/tabs/tabs.component';
import { NgForOf, NgIf } from '@angular/common';
import { TeachersService } from '../../../services/teacher/teachers.service';

@Component({
    selector: 'app-home-course',
    templateUrl: './home-course.component.html',
    imports: [
        TabsComponent,
        NgForOf,
        NgIf,
    ],
    styleUrl: './home-course.component.css'
})
export class HomeCourseComponent implements AfterViewInit, OnInit {

    @ViewChild('tab1Content', { static: true }) tab1Content!: TemplateRef<any>;
    @ViewChild('tab2Content', { static: true }) tab2Content!: TemplateRef<any>;
    @ViewChild('tab3Content', { static: true }) tab3Content!: TemplateRef<any>;
    @ViewChild('tab4Content', { static: true }) tab4Content!: TemplateRef<any>;

    tabs: { id: string; title: string; content: TemplateRef<any> }[] = [];
    materia: any = null; // Datos completos de la materia desde el backend
    asistencia: any = null; // Datos de asistencia del estudiante
    rolUser: string = ''; // Rol del usuario

    constructor(
        private cdr: ChangeDetectorRef,
        private route: ActivatedRoute, // Escucha cambios en la ruta
        private studentsService: StudentsService, // Servicio para obtener datos
        private teachersService: TeachersService,
        private router: Router,
        protected utilityService: UtilityService
    ) {
    }

    ngAfterViewInit(): void {
        this.tabs = [
            { id: 'tab1', title: 'Contenido', content: this.tab1Content },
            { id: 'tab2', title: 'Notas', content: this.tab2Content },
            { id: 'tab3', title: 'Asistencias', content: this.tab3Content },
            { id: 'tab4', title: 'Conducta', content: this.tab4Content },
        ];
        // Forzar la detección de cambios
        this.cdr.detectChanges();
    }

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

                    // Llamar al servicio para obtener la asistencia correspondiente
                    this.getAsistencia(idMateria);

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

    // Obtener asistencia desde el servicio
    getAsistencia(idDistributivo: number): void {
        this.studentsService.getAttendanceByDistributivo(idDistributivo).subscribe(
            (data) => {
                this.asistencia = data;

                console.log('Asistencia:', this.asistencia);
            },
            (error) => {
                console.error('Error al obtener la asistencia:', error);
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
        this.router.navigate(['/course/assignment', idAsignacion], { state: { data: { idDistributivo } } });
    }
}