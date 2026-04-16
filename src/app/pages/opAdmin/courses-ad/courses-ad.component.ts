import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OpAdminService } from '../../../services/opAdmin/op-admin.service';
import { FormsModule } from '@angular/forms';
import { FormCoursesAddComponent } from '../../../forms/adminOp/form-courses-add/form-courses-add.component';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';
import { ModalService } from '../../../shared/service/modal/modal.service';

@Component({
  selector: 'app-courses-ad',
  imports: [
    NgForOf,
    FormsModule,
    FormCoursesAddComponent,
    ModalComponent,
  ],
  templateUrl: './courses-ad.component.html',
  styleUrl: './courses-ad.component.css'
})
export class CoursesAdComponent implements OnInit {

  courses: any[] = [];
  selectedCourseId: number | null = null;
  selectedCourse: any = null;
  showModal: boolean = false;
  modalTitle: string = 'Agregar Curso'; // Propiedad para manejar el título del modal
  newCourse: any = {
    paralelo: '',
    cantEstudiantes: 0,
    grado: '',
    cedulaTutor: ''
  };

  @ViewChild(FormCoursesAddComponent) formCoursesAddComponent!: FormCoursesAddComponent;

  constructor(private opAdminService: OpAdminService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.opAdminService.getCursos().subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        console.error('Error al cargar los cursos:', error);
      }
    );
  }

  openModal(modalId: string): void {
    this.modalTitle = 'Agregar Curso'; // Establecer el título del modal a "Agregar Curso"
    this.modalService.openModal(modalId);
  }

  // Método para manejar el evento formSubmitted
  onFormSubmitted(): void {
    this.loadCourses();
    this.modalService.closeModal('addCourse');
  }

  openDeleteModal(modalId: string, courseId: number): void {
    this.selectedCourseId = courseId;
    this.modalService.openModal(modalId);
  }

  openEditModal(modalId: string, course: any): void {
    this.selectedCourse = course;
    this.modalTitle = 'Editar Curso'; // Establecer el título del modal a "Editar Curso"
    this.populateFormForEdit();
    this.modalService.openModal(modalId);
  }

  deleteCourse(): void {
    if (this.selectedCourseId !== null) {
      this.opAdminService.deleteCurso(this.selectedCourseId).subscribe(
        data => {
          console.log('Curso eliminado:', data);
          this.loadCourses();
          this.modalService.closeModal('deleteCourse');
        },
        error => {
          console.error('Error al eliminar el curso:', error);
        }
      );
    }
  }

  populateFormForEdit(): void {
    if (this.selectedCourse) {
      this.formCoursesAddComponent.populateFormForEdit();
    }
  }

}
