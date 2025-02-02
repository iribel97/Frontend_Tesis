import { ChangeDetectorRef, Component, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../../../shared/ui/select/select.component';
import { ToastComponent } from '../../../shared/ui/toast/toast.component';
import { OpAdminService } from '../../../services/opAdmin/op-admin.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'form-add-schedule',
  imports: [ReactiveFormsModule, SelectComponent, ToastComponent, NgIf],
  templateUrl: './form-add-schedule.component.html',
  styleUrl: './form-add-schedule.component.css'
})
export class FormAddScheduleComponent implements OnInit {
  @ViewChild('toast', { static: true }) toast!: ToastComponent;

  formErrors: { [key: string]: string } = {};
  sendform = false;
  formRegister!: FormGroup;

  @Output() formSubmitted = new EventEmitter<void>(); 
  
  dayOfWeekOptions: { id: number; name: string }[] = [
    { id: 1, name: 'Lunes' },
    { id: 2, name: 'Martes' },
    { id: 3, name: 'Miercoles' },
    { id: 4, name: 'Jueves' },
    { id: 5, name: 'Viernes' },
  ];

  horasConfigOptions: any[] = [];
  cursosOptions: any[] = [];
  distributivosOptions: any[] = [];

  constructor(private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private opAdminService: OpAdminService) { }

  ngOnInit(): void {
    this.cargarDatos();

    this.formRegister = this.fb.group({
      diaSemana: [''],
      idHoraConfig: [''],
      cursoId: [''],
      distributivoId: ['']
    });

    this.formRegister.get('cursoId')?.valueChanges.subscribe(curso => {
      if (curso && curso.id) {
        this.loadDistributivos(curso.id);
      } else {
        this.distributivosOptions = [];
        this.cdr.detectChanges(); // Forzar la detección de cambios
      }
    });

    this.formRegister.valueChanges.subscribe(() => {
      this.ngZone.run(() => {
        this.cdr.detectChanges();
      });
    });
  }

  loadDistributivos(cursoId: number): void {
    this.opAdminService.getDistributivos(cursoId).subscribe(
      data => {
        this.distributivosOptions = data.map((item: any) => {
          return {
            id: item.id,
            name: item.materia + " - " + item.docente
          };
        });
        this.cdr.detectChanges(); // Forzar la detección de cambios
      },
      error => {
        console.error('Error al cargar los distributivos:', error);
        this.distributivosOptions = [];
        this.cdr.detectChanges(); // Forzar la detección de cambios
      }
    );
  }

  cargarDatos(): void {
    this.opAdminService.getConfigHoras().subscribe(
      data => {
        this.horasConfigOptions = data.map((item: any) => {
          return {
            id: item.id,
            name: item.horaInicio + " - " + item.horaFin
          }
        });
      }
    );

    this.opAdminService.getCursos().subscribe(
      data => {
        this.cursosOptions = data.map((item: any) =>{
          return {
            id: item.id,
            name: item.nombreGrado + " " + item.paralelo
          }
        });
      }
    );
  }

  onSubmit(): void {
    this.sendform = true;

    if (Object.keys(this.formErrors).length > 0) {
      console.log('Form has errors:', this.formErrors);
    } else {
      const formValue = this.formRegister.value;
      const sanitizedData = this.sanitizeFormData(formValue);

      this.opAdminService.addHorario(sanitizedData).subscribe(
        response => {
          if (!response.error) {
            this.toast.showToast('success', response.detalles, response.mensaje, 10000);
            this.formSubmitted.emit();
            this.resetForm();
          } else {
            this.toast.showToast('error', response.detalles, response.mensaje, 10000);
          }
        },
        error => {
          this.toast.showToast('error', error.error.detalles, error.error.mensaje, 10000);
          console.error('Error del servidor:', error);
        }
      );
    }
  }

  sanitizeFormData(formValue: any): any {
    return {
      diaSemana: formValue.diaSemana.name,
      idHoraConfig: formValue.idHoraConfig.id,
      idDistributivo: formValue.distributivoId.id
    };
  }

  resetForm(): void {
    this.formRegister.reset();
    this.sendform = false;
    this.cdr.detectChanges();
  }
}