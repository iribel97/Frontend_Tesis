import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin/admin.service';
import { ModalService } from '../../../shared/service/modal/modal.service';

@Component({
  selector: 'form-add-grade',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './form-add-grade.component.html',
  styleUrl: './form-add-grade.component.css'
})
export class FormAddGradeComponent implements OnInit {
  @Output() gradeAdded = new EventEmitter<void>();
  formAddGrade!: FormGroup;

  constructor(
    private adminService : AdminService,
    private fb: FormBuilder,
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this.formAddGrade = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.formAddGrade.valid) {
      const payload = this.formAddGrade.value;
      this.adminService.createGrado(payload).subscribe({
        next: (response: any) => {
          if (!response.error) {
            this.gradeAdded.emit();
            this.formAddGrade.reset(); // Restablecer el formulario
            this.modalService.closeModal('addGradoModal'); // Cerrar el modal
          }
        },
        error: (error) => {
          console.error('Error al agregar el grado', error);
        }
      });
    }
  }

}
