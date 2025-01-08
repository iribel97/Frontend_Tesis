import {AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ModalService} from "../../shared/service/modal/modal.service";
import {TabsComponent} from "../../shared/ui/tabs/tabs.component";
import {DatapikerComponent} from "../../shared/ui/datapiker/datapiker.component";
import {MultiSelectComponent} from "../../shared/ui/multi-select/multi-select.component";
import {SelectComponent} from "../../shared/ui/select/select.component";
import {FileUploaderComponent} from "../../shared/ui/file-uploader/file-uploader.component";
import {JsonPipe} from "@angular/common";
import {ModalComponent} from "../../shared/ui/modal/modal.component";
import {ClipboardComponent} from "../../shared/ui/clipboard/clipboard.component";
import {ToastComponent} from "../../shared/ui/toast/toast.component";
import {SelectItem} from "../../models/selectItem.model";
import { SutmitAssignmentComponent } from "../../forms/student/sutmit-assignment/sutmit-assignment.component";
import { FormSubjectComponent } from "../../forms/admin/form-subject/form-subject.component";


@Component({
    selector: 'app-viewtimeline',
    imports: [
    TabsComponent,
    DatapikerComponent,
    MultiSelectComponent,
    ReactiveFormsModule,
    SelectComponent,
    FileUploaderComponent,
    JsonPipe,
    ModalComponent,
    ClipboardComponent,
    ToastComponent,
    SutmitAssignmentComponent,
    FormSubjectComponent
],
    templateUrl: './viewtimeline.component.html',
    styleUrl: './viewtimeline.component.css'
})
export class ViewtimelineComponent implements AfterViewInit, OnInit {
    @ViewChild('tab1Content', {static: true}) tab1Content!: TemplateRef<any>;
    @ViewChild('tab2Content', {static: true}) tab2Content!: TemplateRef<any>;

    tabs: { id: string; title: string; content: TemplateRef<any> }[] = [];

    formErrors: { [key: string]: string } = {};

    form: FormGroup;
    options: SelectItem[] = [
        {id: 1, name: 'Opción 1'},
        {id: 2, name: 'Opción 2'},
        {id: 3, name: 'Opción 3'}
    ];
    selectOptions = [...this.options];
    sendform: boolean = false;

    constructor(private cdr: ChangeDetectorRef, private fb: FormBuilder, private ngZone: NgZone,
                private modalService: ModalService) {
        this.form = this.fb.group({
            multiselect: [[]],  // Inicializado como array para el multi-select
            singleselect: [''],  // Inicializado como string para select único
            file: [[]],  // Inicializado como array para el file-uploader
        });
    }

    ngAfterViewInit(): void {
        this.tabs = [
            {id: 'tab1', title: 'Pestaña 1', content: this.tab1Content},
            {id: 'tab2', title: 'Pestaña 2', content: this.tab2Content},
        ];

        // Forzar la detección de cambios
        this.cdr.detectChanges();
    }

    ngOnInit(): void {
        this.form.valueChanges.subscribe(() => {
            this.ngZone.run(() => {
                this.cdr.detectChanges();
            });
        });
    }

    submitForm() {
        this.sendform = true;

        if (Object.keys(this.formErrors).length > 0) {
            console.log('El formulario tiene errores:', this.formErrors);
        } else {
            console.log('Formulario enviado con éxito');
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

    //Modal
    // Método para abrir un modal
    openModal(modalId: string): void {
        this.modalService.openModal(modalId);
    }

    // Método para cerrar un modal (opcional, si quisieras desde la lógica del componente)
    closeModal(modalId: string): void {
        this.modalService.closeModal(modalId);
    }


}
