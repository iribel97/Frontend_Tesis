import {Component, OnInit, ViewChild} from '@angular/core';
import {TeachersService} from '../../../services/teacher/teachers.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {DatapikerComponent} from "../../../shared/ui/datapiker/datapiker.component";
import {ToastComponent} from "../../../shared/ui/toast/toast.component";

@Component({
    selector: 'app-attendance-per-subject',
    imports: [ReactiveFormsModule, NgIf, NgForOf, DatapikerComponent, DatapikerComponent, FormsModule, ToastComponent],
    templateUrl: './attendance-per-subject.component.html',
    styleUrls: ['./attendance-per-subject.component.css']
})
export class AttendancePerSubjectComponent implements OnInit {

    asistencias: any[] = [];
    idDistributivo: number = 0;
    attendanceForm: FormGroup;
    studentsList: any[] = [];

    @ViewChild('toast', {static: true}) toast!: ToastComponent;

    constructor(
        private teachersService: TeachersService,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {
        this.attendanceForm = this.fb.group({
            fecha: [''] // Campo de fecha en el formulario
        });
    }

    ngOnInit(): void {
        // Obtener el idDistributivo del curso desde los parámetros de la ruta
        this.route.params.subscribe(params => {
            this.idDistributivo = +params['id'];
        });

        // Escuchar cambios en la fecha del formulario
        this.attendanceForm.get('fecha')?.valueChanges.subscribe((fecha) => {
            if (fecha) {
                this.loadAsistencias(); // Recargar asistencias basadas en la fecha seleccionada
            }
        });

        // Cargar datos iniciales
        this.loadInitialData();
    }

    loadInitialData(): void {
        const fecha = new Date().toISOString().split('T')[0]; // Fecha actual inicial
        this.attendanceForm.get('fecha')?.setValue(fecha); // Establecer la fecha actual por defecto
        this.loadAsistencias(); // Intentar cargar asistencias basadas en la fecha inicial
    }

    // Cargar asistencias según la fecha y el distributivo
    loadAsistencias(): void {
        const fecha = this.attendanceForm.get('fecha')?.value;
        if (this.idDistributivo && fecha) {
            this.teachersService.getAsistencias(this.idDistributivo, fecha).subscribe(
                (data) => {
                    if (data && data.asistencias) {
                        this.asistencias = data.asistencias.map((asistencia: {
                            cedulaEstudiante: string;
                            nombresEstudiante: string;
                            apellidosEstudiante: string;
                            estado: string;
                            observaciones?: string;
                        }) => {
                            return {
                                ...asistencia,
                                estado: asistencia.estado || 'Ausente', // Valor predeterminado
                                observaciones: asistencia.observaciones || '' // Observaciones vacías si no tiene valor
                            };
                        });
                    } else {
                        this.asistencias = [];
                    }

                    console.log('Asistencias:', this.asistencias);

                    // Cargar estudiantes si no hay asistencias
                    if (this.asistencias.length === 0) {
                        this.getEstudentsCourse();
                    }
                },
                (error) => {
                    console.error('Error al cargar las asistencias:', error);
                    this.getEstudentsCourse();
                }
            );
        }
    }

    // Cargar estudiantes del curso según el distributivo
    getEstudentsCourse(): void {
        this.teachersService.getEstudiantes(this.idDistributivo).subscribe(
            (data) => {
                console.log('Estudiantes del curso:', data);
                // Transformar la lista de estudiantes para que encaje con la estructura de asistencias
                this.studentsList = (data || []).map((student: {
                    cedula: string,
                    nombres: string,
                    apellidos: string
                }) => ({
                    cedulaEstudiante: student.cedula, // Cédula desde el estudiante
                    nombresEstudiante: student.nombres,         // Nombres desde el estudiante
                    apellidosEstudiante: student.apellidos,     // Apellidos desde el estudiante
                    estado: 'Presente',                         // Estado por defecto
                    observaciones: ''                           // Observaciones vacías
                }));

                console.log('Lista de estudiantes transformada:', this.studentsList);
            },
            (error) => {
                console.error('Error al cargar los estudiantes:', error);
            }
        );
    }

    actualizarAsistencias(): void {
        if (this.asistencias.length === 0) {
            alert('No hay asistencias para actualizar.');
            return;
        }

        // Transformar las asistencias en el formato esperado por el backend
        const asistenciasPayload = this.asistencias.map(asistencia => ({
            idAsistencia: asistencia.idAsistencia,  // ID único de la asistencia
            estado: asistencia.estado,             // Estado actual ("Presente", "Ausente", etc.)
            observaciones: asistencia.observaciones || '' // Observaciones (vacías si no hay)
        }));

        console.log('Payload para actualizar asistencias:', asistenciasPayload);

        // Utilizamos el servicio para enviar las asistencias actualizadas
        this.teachersService.updateAsistencias(asistenciasPayload).subscribe(
            (response) => {
                console.log('Asistencias actualizadas correctamente:', response);
                this.toast.showToast('success', response.detalles, response.mensaje, 5000);
            },
            (error) => {
                console.error('Error al actualizar asistencias:', error);
                this.toast.showToast('error', error.error.detalles, error.error.mensaje, 10000);
            }
        );
    }

    registrarAsistencias(): void {
        if (!this.idDistributivo || !this.attendanceForm.get('fecha')?.value) {
            alert('El distributivo o la fecha no está disponible.');
            return;
        }

        // Transformar la lista de estudiantes para que coincida con el formato esperado por el backend
        const fecha = this.attendanceForm.get('fecha')?.value;
        const asistenciasPayload = this.studentsList.map(student => ({
            estado: student.estado,                   // "Presente", "Ausente", etc.
            fecha: fecha,                             // La fecha seleccionada en el formulario
            distributivoID: this.idDistributivo,      // ID del distributivo actual
            cedulaEstudiante: student.cedulaEstudiante, // Cédula del estudiante
            observaciones: student.observaciones || '' // Observaciones del estudiante
        }));

        console.log('Payload enviado al backend:', asistenciasPayload);

        // Llamar al servicio para guardar las asistencias
        this.teachersService.saveAsistencia(asistenciasPayload).subscribe(
            (response) => {
                console.log('Asistencias registradas correctamente:', response);
                this.toast.showToast('success', response.detalles, response.mensaje, 5000);
                this.loadAsistencias(); // Refresca la lista de asistencias
            },
            (error) => {
                console.error('Error al registrar asistencias:', error);
                this.toast.showToast('error', error.error.detalles, error.error.mensaje, 10000);
            }
        );
    }

    // Acción al hacer submit en el formulario (Cargar asistencias manualmente)
    onSubmit(): void {
        this.loadAsistencias();
    }

}