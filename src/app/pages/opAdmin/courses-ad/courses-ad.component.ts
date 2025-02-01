import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  showModal: boolean = false;
  newCourse: any = {
    paralelo: '',
    cantEstudiantes: 0,
    grado: '',
    cedulaTutor: ''
  };

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
    this.modalService.openModal(modalId);
  }

  // Método para manejar el evento formSubmitted
  onFormSubmitted(): void {
    this.loadCourses();
  }

}
