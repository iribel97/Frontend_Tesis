import { Component, OnInit, ChangeDetectorRef, NgZone, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../../../shared/ui/select/select.component';
import { ToastComponent } from '../../../shared/ui/toast/toast.component';
import { OpAdminService } from '../../../services/opAdmin/op-admin.service';
import { AdminService } from '../../../services/admin/admin.service';
import { InputComponent } from '../../../shared/ui/input/input.component';

@Component({
  selector: 'form-courses-add',
  imports: [ReactiveFormsModule, SelectComponent, ToastComponent, InputComponent,],
  templateUrl: './form-courses-add.component.html',
  styleUrls: ['./form-courses-add.component.css']
})
export class FormCoursesAddComponent implements OnInit {
  @ViewChild('toast', { static: true }) toast!: ToastComponent;

  formErrors: { [key: string]: string } = {};
  sendform = false;
  formRegister!: FormGroup;

  @Output() formSubmitted = new EventEmitter<void>();

  docentesOptions: any[] = [];
  gradosOptions: any[] = [];
  docentes: any[] = [];

  constructor(private fb: FormBuilder,
              private cdr: ChangeDetectorRef,
              private ngZone: NgZone,
              private opAdminService: OpAdminService,
              private adminService: AdminService) { }

  ngOnInit(): void {
    this.cargarDatos();

    this.formRegister = this.fb.group({
      paralelo: [''],
      cantidadEstudiantes: [''],
      gradoId: [''],
      tutorId: ['']
    });

    this.formRegister.valueChanges.subscribe(() => {
      this.ngZone.run(() => {
        this.cdr.detectChanges();
      });
    });
  }

  cargarDatos(): void {
    this.adminService.getGrados().subscribe(
      data => {
        this.gradosOptions = data.map((item: any) => {
          return {
            id: item.id,
            name: item.name
          };
        });
      },
      error => {
        console.error('Error al cargar los grados:', error);
      }
    );

    this.opAdminService.getDocentes().subscribe(
      data => {
        this.docentesOptions = data.map((item: any) => {
          console.log('Docente:', item);
          return {
            id: item.docente.id,
            name: item.apellidos + ' ' + item.nombres
          };
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

      this.opAdminService.addCurso(sanitizedData).subscribe(
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
      paralelo: formValue.paralelo,
      cantEstudiantes: formValue.cantidadEstudiantes,
      grado: formValue.gradoId.name,
      tutorId: formValue.tutorId.id
    };
  }

  resetForm(): void {
    this.formRegister.reset();
    this.sendform = false;
    this.cdr.detectChanges();
  }
}