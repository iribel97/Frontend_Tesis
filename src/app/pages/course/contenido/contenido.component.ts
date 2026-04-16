import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { TeachersService } from "../../../services/teacher/teachers.service";
import { StudentsService } from "../../../services/students/students.service";
import { UtilityService } from "../../../shared/service/utility/utility.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormMaterialComponent } from "../../../forms/teacher/form-material/form-material.component";
import { ModalComponent } from "../../../shared/ui/modal/modal.component";
import { ModalService } from "../../../shared/service/modal/modal.service";
import { AuthService } from "../../../services/auth/auth.service";

@Component({
    selector: 'app-contenido',
    imports: [
        NgIf,
        FormsModule,
        FormMaterialComponent,
        ModalComponent,
        NgForOf,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './contenido.component.html',
    styleUrl: './contenido.component.css'
})
export class ContenidoComponent implements OnInit {
    assignmentForm: FormGroup;
    sistemaCalificaciones: any[] = [];

    constructor(
        private teachersService: TeachersService,
        private studentsService: StudentsService,
        private router: Router,
        private route: ActivatedRoute,
        protected utilityService: UtilityService,
        private cdr: ChangeDetectorRef, // ¡Inyectar aquí!
        private modalService: ModalService,
        private authService: AuthService,
        private fb: FormBuilder,
    ) {
        this.RolUser = this.authService.getRolUsuario();
        console.log("RolUser:", this.RolUser);
        this.assignmentForm = this.fb.group({
            id: [null], // Campo para almacenar el ID de la asignación
            visualizar: [false],
            nombre: ['', Validators.required],
            descripcion: ['', Validators.required],
            fechaInicio: ['', Validators.required],
            horaInicio: ['', Validators.required],
            fechaFin: ['', Validators.required],
            horaFin: ['', Validators.required],
            idTema: [null],
            calif: this.fb.group({
                registro: [null],
                lvl1: [null],
                lvl2: [null],
                lvl3: [null],
                lvl4: [null]
            }),
            documentos: this.fb.array([])
        });
    }

    tema: any = {
        idTema: 1,
        materiales: [], // Lista de materiales asociados al tema
    };
    materialSeleccionado: any | null = null; // Variable temporal: qué material se edita o usa para crear uno


    tituloUnidad: string = '';       // Para almacenar el nombre de la unidad ingresado
    mostrarInput: boolean = false;   // Controla si mostrar el input o no
    materia: any = null; // Datos completos de la materia desde el backend
    rolUser: string = ''; // Rol del usuario
    idMateria: number = 0;
    RolUser: string | null = '';

    mostrarInputTema: boolean = false; // Controla la visibilidad del input del tema
    tituloTema: string = ''; // Título del tema a crear
    temas: Array<{ idTema: string; nombre: string }> = []; // Lista de temas
    isAddAssignmentModalOpen = false;
    selectedTemaId: number | null = null;

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

                // Inicializa unidades y contenido si están indefinidos
                if (this.materia?.unidades) {
                    this.materia.unidades = this.materia.unidades.map((unidad: any) => ({
                        idUnidad: unidad.idUnidad,
                        nombre: unidad.nombre || 'Sin Nombre',
                        contenido: unidad.contenido || [],    // Asegurarte de inicializar con un array vacío
                        activo: unidad.activo || true
                    }));
                }
            },
            (error) => {
                console.error('Error al cargar el contenido:', error);
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
        tema.descripcionTemporal = tema.descripcion;
    }

    guardarTema(unidad: any): void {
        const titulo = unidad.nuevoTituloTema?.trim();  // Capturar el título del input
        const detalle = unidad.detalleNuevoTema?.trim(); // Capturar la descripción del input

        if (!titulo) {
            console.warn('El título no puede estar vacío.');
            return;
        }

        if (!detalle) {
            console.warn('La descripción no puede estar vacía.');
            return;
        }

        // Crear el objeto para enviar al backend
        const nuevoTema = {
            activo: true,                       // Por defecto, el tema estará activo
            tema: titulo,                       // Título del tema ingresado
            detalle: detalle,                   // Descripción del tema
            idUnidad: unidad.idUnidad           // ID de la unidad a la que pertenece el tema
        };

        // Enviar el tema al backend usando el servicio
        this.teachersService.addTema(nuevoTema).subscribe(
            (response) => {
                console.log('Tema creado exitosamente:', response);

                // Agregar el nuevo tema con las claves correctas
                unidad.contenido.push({
                    idTema: response.id,             // ID generado por el backend
                    nombreTema: titulo,              // Asegúrate de usar nombreTema
                    descripcion: detalle,            // Asegúrate de usar descripcion
                    materiales: [],                  // Lista vacía inicial de materiales
                    open: false                      // Inicialmente está colapsado
                });

                // Resetear los valores de los inputs
                unidad.nuevoTituloTema = '';
                unidad.detalleNuevoTema = '';
                unidad.mostrarInputTema = false;
                // Llamar al endpoint para obtener la materia actualizada
                this.loadContenidoDocente(this.idMateria);

            },
            (error) => {
                console.error('Error al crear el tema:', error);
                // Manejo de error cuando el backend falla
            }
        );
    }

    guardarEdicionTema(tema: any, idUni: number, event: Event): void {
        event.stopPropagation(); // Evitar que se cierre el tema al guardar

        // Obtener los valores nuevos del tema (título y descripción, asegurándose de que estén definidos)
        const nuevoTitulo = tema.nombreTemporal?.trim(); // Nombre temporal ingresado
        const nuevaDescripcion = tema.descripcionTemporal?.trim(); // Descripción temporal ingresada

        if (!nuevoTitulo) {
            console.warn('El nombre del tema no puede estar vacío.');
            return;
        }

        if (!nuevaDescripcion) {
            console.warn('La descripción no puede estar vacía.');
            return;
        }

        // Crear el objeto que cumple la estructura esperada por el backend
        const temaActualizado = {
            id: tema.idTema,                 // ID del tema
            activo: tema.activo,             // Estado activo/inactivo del tema
            tema: nuevoTitulo,               // Nuevo título del tema
            detalle: nuevaDescripcion,       // Nueva descripción del tema
            idUnidad: idUni          // ID de la unidad a la que pertenece este tema
        };

        // Usar el servicio para enviar la solicitud al backend
        this.teachersService.updateTema(temaActualizado).subscribe(
            (response) => {
                console.log('Tema actualizado exitosamente:', response);

                // Actualizar los valores en la lista local tras una respuesta exitosa
                tema.nombreTema = nuevoTitulo;           // Actualiza el título del tema localmente
                tema.descripcion = nuevaDescripcion;     // Actualiza la descripción localmente
                tema.editando = false;                   // Salir del modo de edición
            },
            (error) => {
                console.error('Error al actualizar el tema:', error);
                // Opcional: muestra un mensaje en la UI si ocurre un error
            }
        );
    }

    cancelarEdicionTema(tema: any, event: Event): void {
        event.stopPropagation();
        tema.editando = false;
        tema.nombreTemporal = '';
        tema.descripcionTemporal = '';
    }

    activarEdicionUnidad(unidad: any): void {
        unidad.editando = true;
        unidad.editandoNombre = unidad.nombre;
    }

    cancelarEdicionUnidad(unidad: any): void {
        unidad.editando = false;
    }

    guardarCambiosUnidad(unidad: any): void {
        // Preparar los datos que requiere el endpoint
        const unidadActualizada = {
            id: unidad.idUnidad,                // Usar el ID de la unidad
            tema: unidad.editandoNombre,        // Nombre actualizado de la unidad
            activo: unidad.activo,              // Estado activo
            idDistributivo: this.materia.idDistributivo // ID del distributivo asociado
        };

        // Llamar al servicio para hacer la actualización
        this.teachersService.updateUnidad(unidadActualizada).subscribe(
            (response) => {
                console.log('Unidad actualizada exitosamente:', response);

                // Actualizar la información local después de la respuesta del backend
                unidad.nombre = unidad.editandoNombre; // Reflejar el cambio en la vista
                unidad.editando = false; // Salir del modo de edición
            },
            (error) => {
                console.error('Error al actualizar la unidad:', error);
                // Manejar errores si es necesario
            }
        );
    }


    // Abrir el modal para crear o editar un material
    AbrirModalMaterias(material: any | null): void {
        // Asignar el material seleccionado
        this.materialSeleccionado = material ? { ...material } : null;

        // Verifica que el valor es correcto antes de abrir el modal
        console.log('Material seleccionado para el formulario:', this.materialSeleccionado);

        // Abrir el modal después de asignar el material
        this.modalService.openModal('formularioMateria');
    }

    // Manejar el evento de envío desde el formulario
    onMaterialSubmit(materialData: any): void {
        if (this.materialSeleccionado) {
            // Actualizar el material existente
            const index = this.tema.materiales.findIndex(
                (mat: any) => mat.idMaterial === this.materialSeleccionado.idMaterial
            );
            if (index !== -1) {
                this.tema.materiales[index] = materialData;
            }
        } else {
            // Agregar un nuevo material
            materialData.idMaterial = new Date().getTime(); // Genera un ID único
            this.tema.materiales.push(materialData);
        }

        // Limpiar el material seleccionado y cerrar el modal
        this.CerrarModalMaterias();
        this.loadContenidoDocente(this.idMateria);
    }

    // Cerrar el modal
    CerrarModalMaterias(): void {
        this.modalService.closeModal('formularioMateria'); // Cierra el modal usando el servicio
        this.materialSeleccionado = null; // Limpiar el estado
    }

    openModal(modalId: string, temaId?: number, asignacion?: any): void {
        if (modalId === 'addAssignmentModal') {
            this.isAddAssignmentModalOpen = true;
            if (temaId !== undefined) {
                this.selectedTemaId = temaId;
                console.log('ID del tema:', temaId);
                this.assignmentForm.patchValue({ idTema: temaId });
            }
            if (asignacion) {
                this.assignmentForm.patchValue({
                    id: asignacion.idAsignacion,
                    visualizar: asignacion.activo,
                    nombre: asignacion.nombre,
                    descripcion: asignacion.descripcion,
                    fechaInicio: asignacion.fechaInicio,
                    horaInicio: asignacion.horaInicio,
                    fechaFin: asignacion.fechaFin,
                    horaFin: asignacion.horaFin,
                    calif: {
                        registro: asignacion.idCalificacion.registro,
                        lvl1: asignacion.idCalificacion.lvl1,
                        lvl2: asignacion.idCalificacion.lvl2,
                        lvl3: asignacion.idCalificacion.lvl3,
                        lvl4: asignacion.idCalificacion.lvl4
                    },
                    documentos: asignacion.documentos ? asignacion.documentos.map((doc: any) => this.fb.group({
                        id: doc.id,
                        nombre: doc.nombre,
                        base64: doc.base64,
                        mime: doc.mime
                    })) : [] // Asegúrate de que documentos sea un array vacío si es null o undefined

                });
            }
            this.getCalificaciones(this.materia.idDistributivo); // Llamar al método para obtener el sistema de calificaciones
        }
        this.modalService.openModal(modalId);
    }

    // traer el sistema de calificaciones por id de distributivo
    getCalificaciones(idDistributivo: number): void {
        this.teachersService.getCalificaciones(idDistributivo).subscribe(
            (data) => {
                this.sistemaCalificaciones = data;
                // Asignar el primer sistema de calificaciones al formulario (si existe)
                if (this.sistemaCalificaciones.length > 0) {
                    this.assignmentForm.patchValue({
                        calif: {
                            registro: this.sistemaCalificaciones[0].califID.registro,
                            lvl1: this.sistemaCalificaciones[0].califID.lvl1,
                            lvl2: this.sistemaCalificaciones[0].califID.lvl2,
                            lvl3: this.sistemaCalificaciones[0].califID.lvl3,
                            lvl4: this.sistemaCalificaciones[0].califID.lvl4
                        }
                    });
                }
            },
            (error) => {
                console.error('Error al obtener el sistema de calificaciones:', error);
            }
        );
    }

    closeModal(modalId: string): void {
        if (modalId === 'addAssignmentModal') {
            this.isAddAssignmentModalOpen = false;
        }
        this.modalService.closeModal(modalId);
    }

    get documentos(): FormArray {
        return this.assignmentForm.get('documentos') as FormArray;
    }

    onFileChange(event: any): void {
        const files = event.target.files;
        for (let file of files) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result as string;
                this.documentos.push(this.fb.group({
                    nombre: file.name,
                    base64: base64.split(',')[1],
                    mime: file.type
                }));
            };
            reader.readAsDataURL(file);
        }
    }

    onSubmitAssignment(): void {
        if (this.assignmentForm.valid) {
            const formValue = this.assignmentForm.value;
            const formattedData = {
                id: formValue.id, // Incluir el ID de la asignación
                visualizar: formValue.visualizar,
                nombre: formValue.nombre,
                descripcion: formValue.descripcion,
                fechaInicio: formValue.fechaInicio,
                horaInicio: formValue.horaInicio,
                fechaFin: formValue.fechaFin,
                horaFin: formValue.horaFin,
                idTema: formValue.idTema,
                calif: {
                    registro: formValue.calif.registro,
                    lvl1: formValue.calif.lvl1,
                    lvl2: formValue.calif.lvl2,
                    lvl3: formValue.calif.lvl3,
                    lvl4: formValue.calif.lvl4
                },
                documentos: formValue.documentos.map((doc: any) => ({
                    id: doc.id,
                    nombre: doc.nombre,
                    base64: doc.base64,
                    mime: doc.mime
                }))
            };
            if (formValue.id) {
                // Editar asignación existente
                this.teachersService.updateAsignacion(formattedData).subscribe(
                    (response) => {
                        if (response.error === false && response.codigo === 200) {
                            console.log('Asignación actualizada exitosamente');
                            this.closeModal('addAssignmentModal');
                            this.loadContenidoDocente(this.idMateria);
                        } else {
                            console.error('Error al actualizar la asignación:', response.mensaje);
                        }
                    },
                    (error) => {
                        console.error('Error al actualizar la asignación:', error);
                    }
                );
            } else {
                // Crear nueva asignación
                this.teachersService.uploadAsignacion(formattedData).subscribe(
                    (response) => {
                        console.log('Respuesta del backend:', response);
                        if (response.error === false && response.codigo === 200) {
                            console.log('Asignación guardada exitosamente');
                            this.closeModal('addAssignmentModal');
                            this.loadContenidoDocente(this.idMateria);
                        } else {
                            console.error('Error al guardar la asignación:', response.mensaje);
                        }
                    },
                    (error) => {
                        console.error('Error al guardar la asignación:', error);
                    }
                );
            }
        } else {
            console.error('Formulario inválido');
        }
    }

    onCalifChange(event: any): void {
        const selectedCalifID = event.target.value;
        const selectedCalifIDString = selectedCalifID.toString();
        const textBeforeColon = selectedCalifIDString.split(':')[0];
        const selectedCalif = this.sistemaCalificaciones[textBeforeColon];
        if (selectedCalif) {
            this.assignmentForm.patchValue({
                calif: {
                    registro: selectedCalif.califID.registro,
                    lvl1: selectedCalif.califID.lvl1,
                    lvl2: selectedCalif.califID.lvl2,
                    lvl3: selectedCalif.califID.lvl3,
                    lvl4: selectedCalif.califID.lvl4
                }
            });
        }
    }

    irADetalleAsignacion(idAsignacion: number, idDistributivo: number): void {
        if (this.RolUser === 'Docente') {
            this.router.navigate(['/course/assignment/view', idAsignacion], { state: { data: { idDistributivo } } });
            return;
        }
        console.log("idAsignacion:", idAsignacion, "idDistributivo:", idDistributivo);
        this.router.navigate(['/course/assignment', idAsignacion], { state: { data: { idDistributivo } } });
    }

}
