import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {DatapikerComponent} from "../../../shared/ui/datapiker/datapiker.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputComponent} from "../../../shared/ui/input/input.component";
import {SelectComponent} from "../../../shared/ui/select/select.component";
import {FileUploaderComponent} from "../../../shared/ui/file-uploader/file-uploader.component";

@Component({
    selector: 'form-inscription',
    imports: [
        DatapikerComponent,
        FormsModule,
        InputComponent,
        ReactiveFormsModule,
        SelectComponent,
        FileUploaderComponent
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
            certificadoNotas: [[]],
            serviciosBasicos: [[]],
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
}
