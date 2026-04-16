import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {TeachersService} from "../../../services/teacher/teachers.service";

@Component({
    selector: 'app-form-material',
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
    templateUrl: './form-material.component.html',
    styleUrl: './form-material.component.css'
})
export class FormMaterialComponent implements OnInit, OnChanges {
    @Input() idTema!: number; // ID del tema vinculado al material.
    @Input() materialToEdit: any | null = null; // Material a editar, si es null, el formulario será de creación.
    @Output() onSubmit = new EventEmitter<any>(); // Evento para enviar datos al componente padre.

    materialForm!: FormGroup;
    fileBase64: string | null = null; // Archivo en formato Base64.
    fileMime: string | null = null; // Tipo MIME del archivo.
    isEditing = false; // Por defecto, es falso.

    constructor(private fb: FormBuilder, private teachersService: TeachersService) {
    }


    ngOnInit(): void {
        this.initForm(); // Inicializar el formulario.

        if (this.materialToEdit) {
            this.loadMaterialData(this.materialToEdit); // Solo cargar si ya hay datos.
            this.isEditing = true;
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.materialForm) return; // Asegúrate de que el formulario está inicializado.

        if (changes['materialToEdit']) {
            console.log('Datos activos en materialToEdit:', this.materialToEdit);
            this.loadMaterialData(this.materialToEdit);
        }
    }

    private initForm(): void {
        this.materialForm = this.fb.group(
            {
                tipoMaterial: ['link'], // Selección inicial: 'link'
                link: [null, [Validators.pattern(/https?:\/\/.+/)]], // Formato válido de URL.
                activo: [true], // Indica estado activo.
            },
            {validators: this.atLeastOneValidator(() => this.fileBase64)} // Validación personalizada.
        );
    }

    private loadMaterialData(material: any | null): void {
        if (!material) {
            this.materialForm?.reset({tipoMaterial: 'link', activo: true}); // Restablecer el formulario por defecto.
            this.fileBase64 = null;
            this.fileMime = null;
            return;
        }

        // Asegúrate de que exista el control 'link'
        if (this.materialForm.get('link')) {
            this.materialForm.patchValue({
                link: material.link || null,
                activo: material.activo || true,
                tipoMaterial: material.link ? 'link' : 'documento',
            });
        }

        if (material.documento) {
            this.fileBase64 = material.documento.base64;
            this.fileMime = material.documento.mime;
        }
    }

    // Validador para asegurarse de que al menos un campo esté lleno: link o documento
    private atLeastOneValidator(fileBase64Ref: () => string | null): ValidatorFn {
        return (control: AbstractControl): null | { [key: string]: boolean } => {
            const link = control.get('link')?.value;
            const fileBase64 = fileBase64Ref();
            return link || fileBase64 ? null : {atLeastOne: true};
        };
    }

    submitForm(): void {
        if (this.materialForm.valid) {
            // Construir el objeto esperado por el backend
            const materialData = {
                link: this.materialForm.get('link')?.value, // Link del material (string)
                documento: this.fileBase64
                    ? {base64: this.fileBase64, mime: this.fileMime} // Documento si existe
                    : null, // O null si no hay archivo
                activo: true, // Material estará activo por defecto
                idTema: this.idTema // ID del tema relacionado
            };

            // Llamar al servicio para enviar el material al backend con la estructura adecuada
            this.teachersService.addmaterialescursos(materialData).subscribe(
                (response) => {
                    console.log('Material agregado exitosamente:', response);

                    // Opcional: emitir un evento para actualizar la lista de materiales en el componente padre
                    this.onSubmit.emit(materialData);

                    // Restablecer el formulario después de procesar
                    this.resetForm();
                },
                (error) => {
                    console.error('Error al agregar el material:', error);
                    // Manejar errores (ejemplo: mostrar un mensaje en la interfaz)
                }
            );
        } else {
            console.warn('Formulario de material no válido.');
        }
    }

    // Resetear el formulario
    resetForm(): void {
        this.materialForm.reset(); // Reiniciar valores del formulario
        this.fileBase64 = null;    // Borrar el archivo almacenado
        this.fileMime = null;      // Borrar el MIME almacenado
        this.materialToEdit = null; // Restablecer material a editar (si aplica)
    }

    onFileChange(event: any): void {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                this.fileBase64 = reader.result as string; // Convertir a Base64
                this.fileMime = file.type; // Guardar el tipo MIME del archivo.
                this.materialForm.get('link')?.reset(); // Si subimos un archivo, limpiamos el campo de link.
            };
            reader.readAsDataURL(file);
        }
    }

    onFileSelected(file: File): void {
        const maxSizeInMB = 5;
        if (file.size / 1024 / 1024 > maxSizeInMB) {
            console.warn('El archivo excede el tamaño máximo permitido (5MB).');
            return;
        }

        if (!['application/pdf', 'image/png', 'image/jpeg'].includes(file.type)) {
            console.warn('Tipo de archivo no permitido. Solo se permiten PDFs e imágenes.');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            this.fileBase64 = reader.result as string;
            this.fileMime = file.type;
        };
        reader.readAsDataURL(file);
    }


}
