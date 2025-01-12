import { ChangeDetectorRef, Component, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../shared/ui/input/input.component';
import { SelectComponent } from '../../../shared/ui/select/select.component';
import { ToastComponent } from '../../../shared/ui/toast/toast.component';
import { SelectItem } from '../../../models/selectItem.model';
import { AdminService } from '../../../services/admin/admin.service';
import { DatapikerComponent } from '../../../shared/ui/datapiker/datapiker.component';

@Component({
  selector: 'form-academic-calendar',
  imports: [ReactiveFormsModule,
    InputComponent,
    SelectComponent,
    DatapikerComponent,
    ToastComponent],
  templateUrl: './form-academic-calendar.component.html',
  styleUrl: './form-academic-calendar.component.css'
})
export class FormAcademicCalendarComponent implements OnInit {

  formErrors: { [key: string]: string } = {}; // Objeto que contiene los errores del formulario
  formRegister!: FormGroup; // Formulario de registro de calendario académico
  sendform = false; // Variable que indica si se ha enviado el formulario
  @Output() formSubmitted = new EventEmitter<void>(); // Variable que indica si la operación fue exitosa

  cyclesOption: SelectItem[] = []; // Opciones de ciclos académicos

  ciclos: any[] = []; // Ciclos académicos

  @ViewChild('toast', { static: true }) toast!: ToastComponent;

  constructor(private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private adminService: AdminService) {

  }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      cicloId: [''],
      descripcion: [''],
      fechaInicio: [''],
      fechaFin: [''],
    });
    this.getCycles();
    this.formRegister.valueChanges.subscribe(() => {
      this.ngZone.run(() => {
        this.cdr.detectChanges();
      });
    });
  }

  // Método que obtiene los ciclos académicos
  getCycles() {
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

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    
    this.sendform = true;
    if (Object.keys(this.formErrors).length > 0) {
      console.log('Form has errors:', this.formErrors);
    } else {
      console.log('Form submitted successfully');
      const request: any = {
        cicloId: this.formRegister.value.cicloId.id,
        descripcion: this.formRegister.value.descripcion,
        fechaInicio: this.formRegister.value.fechaInicio,
        fechaFin: this.formRegister.value.fechaFin
      };
      console.log('Request:', request);
      this.adminService.addEvent(request).subscribe(
        (data) => {
          console.log('Calendario creado:', data);
          this.toast.showToast('success', data.detalles, data.mensaje, 5000);
          this.formSubmitted.emit();
          this.resetForm();
        },
        (error) => {
          console.error('Error al crear el calendario:', error);
          this.toast.showToast('error', error.error.detalles, error.error.mensaje, 10000);
        }
      );
    }
  }

  // Método que reinicia el formulario
  resetForm() {
    this.formRegister.reset();
    this.sendform = false;
  }

  onErrorsChange(event: { id: string, errorMessage: string }) {
    if (event.errorMessage) {
      this.formErrors[event.id] = event.errorMessage;
    } else {
      delete this.formErrors[event.id];
    }
    this.cdr.detectChanges(); // Trigger change detection manually
  }

}
