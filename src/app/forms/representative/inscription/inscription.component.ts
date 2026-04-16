import { ChangeDetectorRef, Component, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgForOf, NgIf } from '@angular/common';
import { ToastComponent } from '../../../shared/ui/toast/toast.component';
import { RepresentService } from '../../../services/representative/represent.service';

@Component({
    selector: 'form-inscription',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgForOf,
        ToastComponent,
    ],
    templateUrl: './inscription.component.html',
    styleUrl: './inscription.component.css'
})
export class InscriptionComponent implements OnInit {
    formErrors: { [key: string]: string } = {};
    form!: FormGroup;
    sendform = false;
    currentStep = 1;

    @Output() formSubmitted = new EventEmitter<void>(); // Variable que indica si la operación fue exitosa

    @ViewChild('toast', { static: true }) toast!: ToastComponent;

    genderOptions: { id: number; name: string }[] = [
        { id: 1, name: 'Masculino' },
        { id: 2, name: 'Femenino' },
        { id: 3, name: 'Otros' },
    ];

    gradeOptions: { id: number; name: string }[] = [
        { id: 1, name: 'Octavo' },
        { id: 2, name: 'Noveno' },
        { id: 3, name: 'Décimo' },
    ];

    constructor(private fb: FormBuilder,
        private cdr: ChangeDetectorRef,
        private ngZone: NgZone,
        private representService: RepresentService) { }

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

    nextStep() {
        this.currentStep++;
    }

    previousStep() {
        this.currentStep--;
    }

    async onSubmit() {
        this.sendform = true;
        if (Object.keys(this.formErrors).length > 0) {
            console.log('Form has errors:', this.formErrors);
        } else {
            const formValue = this.form.value;
            const formattedData = {
                cedula: formValue.cedula,
                nombres: formValue.nombres,
                apellidos: formValue.apellidos,
                email: formValue.email,
                telefono: formValue.telefono,
                direccion: formValue.direccion,
                fechaNacimiento: formValue.fechaNacimiento,
                genero: formValue.genero,
                grado: formValue.grado,
                nombresPadre: formValue.nombresPadre,
                apellidosPadre: formValue.apellidosPadre,
                correoPadre: formValue.correoPadre,
                telefonoPadre: formValue.telefonoPadre,
                ocupacionPadre: formValue.ocupacionPadre,
                cedulaPadre: await this.convertFileToBase64(formValue.cedulaPadre[0]),
                nombresMadre: formValue.nombresMadre,
                apellidosMadre: formValue.apellidosMadre,
                correoMadre: formValue.correoMadre,
                telefonoMadre: formValue.telefonoMadre,
                ocupacionMadre: formValue.ocupacionMadre,
                cedulaMadre: await this.convertFileToBase64(formValue.cedulaMadre[0]),
                cedulaEstudiante: await this.convertFileToBase64(formValue.cedulaEstudiante[0]),
                certificadoNotas: await this.convertFileToBase64(formValue.certificadoNotas[0]),
                serviciosBasicos: await this.convertFileToBase64(formValue.serviciosBasicos[0]),
                representanteId: formValue.representanteId,
            };
            console.log('Form submitted successfully');
            this.representService.inscribirEstudiante(formattedData).subscribe(
                (data) => {
                    console.log('Estudiante inscrito:', data);
                    this.toast.showToast('success', "Estudiante inscrito", "El estudiante ha sido agregado correctamente", 5000);
                    this.formSubmitted.emit();
                    this.resetForm();
                },
                (error) => {
                    console.error('Error al inscribir estudiante:', error);
                    this.toast.showToast('error', "Error al inscribir estudiante", "Ha ocurrido un error al intentar inscribir al estudiante", 5000);
                }
            );
        }
    }

    onGenderChange(event: any): void {
        const selectedGender = event.target.value;
        console.log('Género seleccionado:', selectedGender);
    }
    
    resetForm(): void {
        this.form.reset();
        this.sendform = false;
        this.currentStep = 1;
    }

    async convertFileToBase64(file: File): Promise<{ base64: string, mime: string }> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64 = (reader.result as string).split(',')[1];
                resolve({ base64, mime: file.type });
            };
            reader.onerror = error => reject(error);
        });
    }

    handleFileInput(controlName: string, event: Event): void {
        const input = event.target as HTMLInputElement;
        const files = input?.files ? Array.from(input.files) : [];

        if (files.length) {
            this.form.get(controlName)?.setValue(files);
            this.form.get(controlName)?.markAsDirty();
            this.form.get(controlName)?.markAsTouched();
        }
    }

    removeFile(controlName: string): void {
        this.form.get(controlName)?.setValue(null);
        this.form.get(controlName)?.markAsDirty();
        this.form.get(controlName)?.markAsTouched();
    }

    triggerFileInput(inputId: string): void {
        const inputElement = document.getElementById(inputId) as HTMLInputElement;
        if (inputElement) {
            inputElement.click();
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
                this.form.get('serviciosBasicos')?.setValue(files);
            }
        }
    }

    onErrorsChange(event: { id: string, errorMessage: string }) {
        if (event.errorMessage) {
            this.formErrors[event.id] = event.errorMessage;
        } else {
            delete this.formErrors[event.id];
        }
        this.cdr.detectChanges();
    }

    getFormErrorsKeys(): string[] {
        return Object.keys(this.formErrors);
    }
}