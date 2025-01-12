import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {DatapikerComponent} from "../../../shared/ui/datapiker/datapiker.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputComponent} from "../../../shared/ui/input/input.component";
import {SelectComponent} from "../../../shared/ui/select/select.component";
import {FileUploaderComponent} from "../../../shared/ui/file-uploader/file-uploader.component";
import {DecimalPipe, NgIf} from "@angular/common";

@Component({
    selector: 'form-inscription',
    imports: [
        DatapikerComponent,
        FormsModule,
        InputComponent,
        ReactiveFormsModule,
        SelectComponent,
        FileUploaderComponent,
        NgIf,
        DecimalPipe
    ],
    templateUrl: './inscription.component.html',
    styleUrl: './inscription.component.css'
})
export class InscriptionComponent implements OnInit {
    formErrors: { [key: string]: string } = {};
    form!: FormGroup;
    sendform = false;


    genderOptions: { id: number; name: string }[] = [
        {id: 1, name: 'Masculino'},
        {id: 2, name: 'Femenino'},
        {id: 3, name: 'Otros'},
    ];

    gradeOptions: { id: number; name: string }[] = [
        {id: 1, name: 'Octavo'},
        {id: 2, name: 'Noveno'},
        {id: 3, name: 'Décimo'},
    ];

    constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private ngZone: NgZone) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            cedula: [''],
            nombres: [''],
            apellidos: [''],
            email: [''],
            telefono: [''],
            direccion: [''],
            fechaNacimiento: [''],
            genero: [''],
            grado: [''],
            nombresPadre: [''],
            apellidosPadre: [''],
            correoPadre: [''],
            telefonoPadre: [''],
            ocupacionPadre: [''],
            cedulaPadre: [[]],
            nombresMadre: [''],
            apellidosMadre: [''],
            correoMadre: [''],
            telefonoMadre: [''],
            ocupacionMadre: [''],
            cedulaMadre: [[]],
            cedulaEstudiante: [[]],
            certificadoNotas: this.fb.control([], []), // Control para subir archivos
            serviciosBasicos: this.fb.control([], []), // Control para subir archivos
            representanteId: [''],
        });
        this.form.valueChanges.subscribe(() => {
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
            console.log('Form submitted successfully');
            console.log('Form value:', this.form.value);
        }
    }

    onErrorsChange(event: { id: string, errorMessage: string }) {
        if (event.errorMessage) {
            this.formErrors[event.id] = event.errorMessage;
        } else {
            delete this.formErrors[event.id];
        }
        this.cdr.detectChanges(); // Trigger change detection manually
    }

    getFormErrorsKeys(): string[] {
        return Object.keys(this.formErrors);
    }


    selectedFile: File | null = null;

    handleFileInput(controlName: string, event: Event): void {
        const input = event.target as HTMLInputElement;
        const files = input?.files ? Array.from(input.files) : [];

        if (files.length) {
            // Tomar el archivo seleccionado
            this.selectedFile = files[0];

            // Vincular el archivo seleccionado al formulario reactivo
            this.form.get(controlName)?.setValue(files);
            this.form.get(controlName)?.markAsDirty();
            this.form.get(controlName)?.markAsTouched();
        }
    }

    removeFile(controlName: string): void {
        // Eliminar el archivo seleccionado
        this.selectedFile = null;

        // Quitar el valor del formulario reactivo
        this.form.get(controlName)?.setValue(null);
        this.form.get(controlName)?.markAsDirty();
        this.form.get(controlName)?.markAsTouched();
    }

    triggerFileInput(inputId: string): void {
        const inputElement = document.getElementById(inputId) as HTMLInputElement;
        if (inputElement) {
            inputElement.click(); // Simula un clic en el input oculto
        }
    }

    onDragOver(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
    }

    onDragLeave(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
    }

    onDrop(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();

        if (event.dataTransfer?.files) {
            const files = Array.from(event.dataTransfer.files);
            if (files.length) {
                this.selectedFile = files[0];
                this.form.get('serviciosBasicos')?.setValue(files);
            }
        }
    }

    /**
     * Trunca el nombre del archivo si es demasiado largo.
     * @param name Nombre completo del archivo
     * @param maxLength Longitud máxima permitida para el nombre
     * @returns Nombre truncado con extensión visible
     */
    truncateFileName(name: string, maxLength: number): string {
        if (name.length <= maxLength) {
            return name; // El nombre está dentro del límite, no se recorta
        }

        const extIndex = name.lastIndexOf('.'); // Buscar el índice del último punto para obtener la extensión
        const extension = extIndex >= 0 ? name.substring(extIndex) : ''; // Extrae la extensión (si hay)

        const baseNameLength = maxLength - extension.length - 3; // Resta los caracteres "..." y la extensión
        const truncatedBaseName = name.substring(0, Math.max(baseNameLength, 0)); // Ajusta la base al tamaño permitido

        return `${truncatedBaseName}...${extension}`; // Combina el nombre truncado con la extensión
    }

}
