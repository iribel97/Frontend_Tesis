import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {TeachersService} from "../../../services/teacher/teachers.service";
import {StudentsService} from "../../../services/students/students.service";
import {UtilityService} from "../../../shared/service/utility/utility.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-contenido',
    imports: [
        NgIf,
        FormsModule
    ],
    templateUrl: './contenido.component.html',
    styleUrl: './contenido.component.css'
})
export class ContenidoComponent implements OnInit {

    constructor(
        private teachersService: TeachersService,
        private studentsService: StudentsService,
        private router: Router,
        private route: ActivatedRoute,
        protected utilityService: UtilityService,
        private cdr: ChangeDetectorRef // ¡Inyectar aquí!
    ) {
    }


    tituloUnidad: string = '';       // Para almacenar el nombre de la unidad ingresado
    mostrarInput: boolean = false;   // Controla si mostrar el input o no
    materia: any = null; // Datos completos de la materia desde el backend
    rolUser: string = ''; // Rol del usuario
    idMateria: number = 0;

    ngOnInit(): void {

        // Escuchar cambios en los parámetros de la URL
        this.route.params.subscribe((params) => {
            this.idMateria = +params['id']; // Obtener el ID desde la ruta
            this.getInfoUser(this.idMateria);
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

    loadContenidoDocente(idMateria: number): void {
        this.teachersService.getContenido(idMateria).subscribe(
            (data) => {
                this.materia = data;

                // Verifica que cada unidad tenga los datos esperados
                if (this.materia?.unidades) {
                    this.materia.unidades = this.materia.unidades.map((unidad: any) => ({
                        idUnidad: unidad.idUnidad,
                        nombre: unidad.nombre || 'Sin Nombre', // Proporcionar valor por defecto si falta
                        contenido: unidad.contenido || [],    // Asegurar que el contenido sea un array
                        activo: unidad.activo || true         // Definir activo como verdadero por defecto
                    }));
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

                // Inicializar estado de los acordeones (si es necesario)
                if (this.materia?.unidades) {
                    this.materia.unidades.forEach((unidad: any) => {
                        unidad.open = false; // Asegurarte de que los acordeones estén colapsados inicialmente
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

    crearUnidad(): void {
        // Lógica para crear una nueva unidad
        console.log('Crear Unidad');
        // Aquí podrías abrir un modal o redirigir al usuario a un formulario.
    }

    // Mostrar el input al presionar el botón "Crear Unidad"
    mostrarInputUnidad(): void {
        this.mostrarInput = true;
        this.tituloUnidad = ''; // Limpia el campo cada vez que presionas el botón
    }

    // Captura y muestra en consola los datos al presionar Enter
    guardarUnidad(): void {
        if (this.tituloUnidad.trim() === '') {
            console.warn('El título no puede estar vacío.');
            return;
        }

        const datosUnidad = {
            tema: this.tituloUnidad, // Nombre ingresado por el usuario
            activo: true,            // Unidad activa por defecto
            idDistributivo: this.materia.idDistributivo || 0 // ID del distributivo
        };

        console.log('Datos para el backend:', datosUnidad);

        this.teachersService.addUnidad(datosUnidad).subscribe(
            (res) => {
                console.log('Respuesta del backend al crear la unidad:', res);

                // Verifica que la operación fue exitosa
                if (res.error === false && res.codigo === 200) {
                    console.log('Unidad creada exitosamente. Actualizando lista de datos...');

                    // Llamar al endpoint para obtener la materia actualizada
                    this.loadContenidoDocente(this.idMateria);
                } else {
                    console.error('Error al crear la unidad:', res.mensaje);
                }
            },
            (error) => {
                console.error('Error en la petición de creación:', error);
            }
        );

        // Reiniciar el input y ocultar
        this.mostrarInput = false;
        this.tituloUnidad = '';
    }


    ocultarInputUnidad() {
        this.mostrarInput = false;
    }


    activarEdicionUnidad(unidad: any): void {
        unidad.editando = true; // Activa el modo de edición
        unidad.editandoNombre = unidad.nombre; // Guarda el nombre actual como respaldo temporal
    }

    // Función para guardar cambios en el nombre de la unidad
    guardarCambiosUnidad(unidad: any): void {
        if (unidad.editandoNombre.trim() === '') {
            return; // No guardar si el campo está vacío
        }
        unidad.nombre = unidad.editandoNombre; // Actualiza el nombre de la unidad
        unidad.editando = false; // Salir del modo de edición

        // Si hace falta, puedes llamar al servicio para guardar los cambios en el servidor:
        // this.unidadesService.actualizarNombreUnidad(unidad.idUnidad, unidad.nombre).subscribe(...);
    }

    // Función para cancelar la edición
    cancelarEdicionUnidad(unidad: any): void {
        unidad.editando = false; // Sale del modo de edición
        unidad.editandoNombre = ''; // Limpia el respaldo temporal
    }

}
