import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin/admin.service';
import { InputComponent } from '../../../shared/ui/input/input.component';
import { SelectComponent } from '../../../shared/ui/select/select.component';
import { SelectItem } from '../../../models/selectItem.model';
import { ToastComponent } from '../../../shared/ui/toast/toast.component';

@Component({
  selector: 'form-subject',
  imports: [ReactiveFormsModule, InputComponent, SelectComponent, ToastComponent],
  templateUrl: './form-subject.component.html',
  styleUrl: './form-subject.component.css'
})
export class FormSubjectComponent implements OnInit{

  formErrors: { [key: string]: string } = {};
  formRegister!: FormGroup;
  sendform = false;
  gradesOption: SelectItem[] = [];

  @ViewChild('toast', { static: true }) toast!: ToastComponent;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private ngZone: NgZone, private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      nombre: [''],
      area: [''],
      horas: [''],
      grado: [''],
      registroCalificacion: [''],
    });
    this.getGrades();
    this.formRegister.valueChanges.subscribe(() => {
      this.ngZone.run(() => {
        this.cdr.detectChanges();
      });
    });
  }

  onErrorsChange(event: { id: string, errorMessage: string }) {
    if (event.errorMessage) {
      this.formErrors[event.id] = event.errorMessage;
    } else {
      delete this.formErrors[event.id];
    }
    this.cdr.detectChanges(); // Trigger change detection manually
  }

  resetForm() {
    this.formRegister.reset();
    this.sendform = false;
  }

  onSubmit() {
    this.sendform = true;
    if (Object.keys(this.formErrors).length > 0) {
      console.log('Form has errors:', this.formErrors);
    } else {
      console.log('Form submitted successfully');
      const request: any = {
        nombre: this.formRegister.value.nombre,
        area: this.formRegister.value.area,
        horas: this.formRegister.value.horas,
        grado: this.formRegister.value.grado.name,
        registroCalificacion: this.formRegister.value.registroCalificacion,
      };

      this.adminService.createMateria(request).subscribe(
        data => {
          console.log('Memo created successfully:', data);
          this.toast.showToast('success', data.detalles,data.mensaje,10000); // Show toast message
          this.resetForm();
        },
        error => {
          console.error('Error creating memo:', error);
          this.toast.showToast('error', error.error.detalles,error.error.mensaje,10000); // Show toast message
        }
      );
    }
  }

  // obtener los grados del servicio
  getGrades() {
    this.adminService.getGrados().subscribe(
      data => {
        this.gradesOption = data;
      }
    );
  }

}
