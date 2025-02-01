import {ChangeDetectorRef, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ToastComponent} from "../../../shared/ui/toast/toast.component";
import {SelectComponent} from "../../../shared/ui/select/select.component";
import {AdminService} from "../../../services/admin/admin.service";

@Component({
    selector: 'form-create-distributivo',
    imports: [
        ReactiveFormsModule,
        ToastComponent,
        SelectComponent
    ],
    templateUrl: './create-distributivo.component.html',
    styleUrl: './create-distributivo.component.css'
})
export class CreateDistributivoComponent implements OnInit {
    @ViewChild('toast', {static: true}) toast!: ToastComponent;
    formErrors: { [key: string]: string } = {};
    formRegister!: FormGroup;
    sendform = false;

    constructor(private fb: FormBuilder,
                private cdr: ChangeDetectorRef,
                private ngZone: NgZone,
                private adminService: AdminService,) {
    }

    ciclos: any[] = [];
    cursos: any[] = [];
    materias: any[] = [];
    docentes: any[] = [];

    ngOnInit(): void {
        this.cargarDatos();
        this.formRegister = this.fb.group({
            cicloId: [''],
            aulaId: [''],
            materiaId: [''],
            cedulaDocente: [''],
        });
        this.formRegister.valueChanges.subscribe(() => {
            this.ngZone.run(() => {
                this.cdr.detectChanges();
            });
        });
    }

    onSubmit() {
        this.sendform = true;

        if (Object.keys(this.formErrors).length > 0) {
            console.log('Form has errors:', this.formErrors);
        } else {
            // Obtener el valor actual del formulario
            const formValue = this.formRegister.value;

            // Transformar los datos del formulario a la estructura esperada
            const sanitizedData = this.sanitizeFormData(formValue);

            console.log('Sanitized form data:', sanitizedData);

            this.adminService.addDistributivo(sanitizedData).subscribe(
                response => {
                    if (!response.error) {
                        // Si no hay error, mostrar el mensaje de éxito usando el toast
                        this.toast.showToast('success', response.detalles, response.mensaje, 10000);
                    } else {
                        // Si hay un error, mostrar el mensaje de error usando el toast
                        this.toast.showToast('error', response.detalles, response.mensaje, 10000);
                    }
                },
                error => {
                    // Este bloque captura errores a nivel del HTTP o del servidor
                    this.toast.showToast('error', error.error.detalles, error.error.mensaje, 10000);
                    console.error('Error del servidor:', error);
                }
            );

            // Aquí enviarías `sanitizedData` al backend
            // Por ejemplo: this.http.post('url-endpoint', sanitizedData).subscribe(...)
        }
    }

    // Método para sanitizar los datos del formulario
    sanitizeFormData(formData: any): any {
        return {
            id: null, // Puedes asignar un ID por defecto o dejarlo vacío si el backend lo genera automáticamente
            cicloId: formData.cicloId?.id || null, // Extraer solo el ID del ciclo
            aulaId: formData.aulaId?.id || null, // Extraer solo el ID del aula
            materiaId: formData.materiaId?.id || null, // Extraer solo el ID de la materia
            idDocente: formData.cedulaDocente?.id || "" // Extraer solo el name de la cédula del docente
        };
    }

    cargarDatos(): void {
        this.adminService.getMaterias().subscribe(data => {
            console.log('Materias:', data);
            this.materias = data.map((materia: any) => {
                return {
                    id: materia.id,
                    name: materia.nombre + " - " + materia.nombreGrado
                };
            });
            console.log('Materias transformadas:', this.materias);
        })

        this.adminService.getCursos().subscribe(data => {
            this.cursos = data.map((curso: any) => {
                return {
                    id: curso.id,
                    name: curso.nombreGrado + " " + curso.paralelo
                };
            })
        })

        this.adminService.getDocentes().subscribe(data => {
            console.log('Docentes:', data);
            this.docentes = data.map((docente: any) => {
                return {
                    id: docente.docente.id,
                    name: docente.nombres + " " + docente.apellidos
                };
            })
        })

        this.adminService.getAllCiclos().subscribe(data => {
            console.log('Ciclos:', data);
            this.ciclos = data.map((ciclo: any) => {
                return {
                    id: ciclo.id,
                    name: ciclo.nombre
                };
            })
        })

    }

}
