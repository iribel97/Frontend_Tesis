import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";

@Component({
    selector: 'app-form-material',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './form-material.component.html',
    styleUrl: './form-material.component.css'
})
export class FormMaterialComponent implements OnInit {
    @Input() idTema!: number; // ID del tema vinculado al material.
    @Input() materialToEdit: any | null = null; // Material a editar, si es null, el formulario será de creación.
    @Output() onSubmit = new EventEmitter<any>(); // Evento para enviar datos al componente padre.

    materialForm!: FormGroup;
    fileBase64: string | null = null; // Archivo en formato Base64.
    fileMime: string | null = null; // Tipo MIME del archivo.
    isEditing = false; // Determina si el formulario está en modo edición.

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.initForm();

        // Si se proporcionan datos para editar, cargarlos en el formulario.
        if (this.materialToEdit) {
            this.loadMaterialData(this.materialToEdit);
            this.isEditing = true;
        }
    }

    // Inicializar el formulario
    private initForm(): void {
        this.materialForm = this.fb.group({
            link: [null, [Validators.pattern(/https?:\/\/.+/)]], // Link válido (formato URL).
            activo: [true, Validators.required], // Siempre debe ser true.
        }, {validators: this.atLeastOneValidator}); // Validación personalizada para asegurarse de que al menos un campo (link/documento) sea usado.
    }

    // Cargar datos si estamos en modo edición
    private loadMaterialData(material: any): void {
        this.materialForm.patchValue({
            link: material.link || null,
            activo: material.activo,
        });

        // Si hay un documento asociado al material, cargamos su información.
        if (material.documento) {
            this.fileBase64 = material.documento.base64;
            this.fileMime = material.documento.mime;
        }
    }

    // Validación: Al menos un campo debe estar completo (link o documento)
    private atLeastOneValidator(fileBase64Ref: () => string | null): ValidatorFn {
        return (control: AbstractControl): null | { [key: string]: boolean } => {
            if (!(control instanceof FormGroup)) {
                return null; // Si el control no es un FormGroup, no hacemos validación.
            }

            const link = control.get('link')?.value;
            const fileBase64 = fileBase64Ref(); // Leemos el valor actual desde la referencia.
            return link || fileBase64 ? null : {atLeastOne: true}; // Al menos uno debe estar presente.
        };
    }

    // Procesar cuando se selecciona un archivo
    onFileChange(event: any): void {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                this.fileBase64 = reader.result as string; // Guardamos el contenido base64.
                this.fileMime = file.type; // Guardamos el MIME del archivo.
                this.materialForm.get('link')?.reset(); // Si subimos un archivo, limpiamos el campo de enlace.
            };
            reader.readAsDataURL(file);
        }
    }

    // Procesar envío del formulario
    submitForm(): void {
        if (this.materialForm.valid) {
            // Preparar los datos para ser enviados al componente padre.
            const materialData = {
                link: this.materialForm.get('link')?.value,
                documento: this.fileBase64
                    ? {base64: this.fileBase64, mime: this.fileMime}
                    : null,
                activo: true, // Siempre será true.
                idTema: this.idTema, // Hay que vincular el material al tema correspondiente.
                idMaterial: this.materialToEdit?.idMaterial || null, // ID del material (si estamos editando).
            };

            // Emitir los datos
            this.onSubmit.emit(materialData);

            // Resetear el formulario si no estamos editando
            if (!this.isEditing) {
                this.resetForm();
            }
        }
    }

    // Resetear el formulario
    protected resetForm(): void {
        this.materialForm.reset({activo: true});
        this.fileBase64 = null;
        this.fileMime = null;
    }


}
