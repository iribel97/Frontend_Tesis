import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OpAdminService } from '../../../services/opAdmin/op-admin.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses-ad',
  imports: [
    NgForOf,
    FormsModule,
    NgIf,
  ],
  templateUrl: './courses-ad.component.html',
  styleUrl: './courses-ad.component.css'
})
export class CoursesAdComponent implements OnInit{
  
  courses: any[] = [];
  showModal: boolean = false;
  newCourse: any = {
    paralelo: '',
    cantEstudiantes: 0,
    grado: '',
    cedulaTutor: ''
  };

  constructor(private opAdminService: OpAdminService) { }

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


}
