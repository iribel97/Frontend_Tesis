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

    mostrarInputTema: boolean = false; // Controla la visibilidad del input del tema
    tituloTema: string = ''; // Título del tema a crear
    temas: Array<{ idTema: string; nombre: string }> = []; // Lista de temas


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

    toggleUnidad(unidad: any): void {
        // Alternar el estado abierto/cerrado de la unidad
        unidad.open = !unidad.open;
    }

    toggleTema(tema: any): void {
        // Alternar el estado abierto/cerrado del tema
        tema.open = !tema.open;
    }

    activarInputTema(unidad: any): void {
        // Activar el input para añadir un nuevo tema
        unidad.mostrarInputTema = true;
        unidad.nuevoTituloTema = ''; // Resetear campo
    }

    cancelarAgregarTema(unidad: any): void {
        // Cancelar añadir un tema
        unidad.mostrarInputTema = false;
        unidad.nuevoTituloTema = '';
    }

    activarEdicionTema(tema: any, event: Event): void {
        event.stopPropagation(); // Evitar que el clic active otros eventos, como abrir/cerrar el tema
        tema.editando = true; // Habilitar el modo de edición
        tema.nombreTemporal = tema.nombreTema; // Guardar el nombre original por si se cancela la edición
    }

    guardarTema(unidad: any): void {
        if (!unidad.nuevoTituloTema.trim()) {
            console.warn('El título no puede estar vacío.');
            return;
        }

        const nuevoTema = {
            idTema: Math.random().toString(36).substr(2, 9), // ID generado
            nombreTema: unidad.nuevoTituloTema,
            descripcion: '',
            materiales: [],
            open: false, // Inicialmente cerrado
        };

        unidad.contenido.push(nuevoTema); // Añadir el nuevo tema
        unidad.mostrarInputTema = false;  // Ocultar el input
    }

    guardarEdicionTema(tema: any, event: Event): void {
        event.stopPropagation(); // Evitar que se active apertura/cierre del tema
        if (!tema.nombreTemporal || tema.nombreTemporal.trim() === '') {
            console.warn('El nombre del tema no puede estar vacío.');
            return;
        }
        tema.nombreTema = tema.nombreTemporal; // Aplicar el nuevo nombre
        tema.editando = false; // Salir del modo de edición
    }

    cancelarEdicionTema(tema: any, event: Event): void {
        event.stopPropagation(); // Prevenir eventos no deseados
        tema.editando = false; // Salir del modo de edición
        tema.nombreTemporal = ''; // Limpiar el nombre temporal
    }

    activarEdicionUnidad(unidad: any): void {
        unidad.editando = true;
        unidad.editandoNombre = unidad.nombre;
    }

    cancelarEdicionUnidad(unidad: any): void {
        unidad.editando = false;
    }

    guardarCambiosUnidad(unidad: any): void {
        unidad.nombre = unidad.editandoNombre; // Actualizar el nombre
        unidad.editando = false;
    }


}
