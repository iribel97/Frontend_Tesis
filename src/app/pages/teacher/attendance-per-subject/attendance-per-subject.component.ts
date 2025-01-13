import { Component, OnInit } from '@angular/core';
import { TeachersService } from '../../../services/teacher/teachers.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-attendance-per-subject',
  imports: [ReactiveFormsModule, NgIf, NgForOf],
  templateUrl: './attendance-per-subject.component.html',
  styleUrls: ['./attendance-per-subject.component.css']
})
export class AttendancePerSubjectComponent implements OnInit {

  asistencias: any[] = [];
  idDistributivo: number | null = null;
  attendanceForm: FormGroup;

  constructor(
    private teachersService: TeachersService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.attendanceForm = this.fb.group({
      fecha: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idDistributivo = +params['id'];
    });
  }

  loadAsistencias(): void {
    const fecha = this.attendanceForm.get('fecha')?.value;
    if (this.idDistributivo && fecha) {
      this.teachersService.getAsistencias(this.idDistributivo, fecha).subscribe(
        (data) => {
          this.asistencias = data.asistencias;
          console.log('Asistencias:', this.asistencias);
        },
        (error) => {
          console.error('Error al cargar las asistencias:', error);
        });
    }
  }

  onSubmit(): void {
    this.loadAsistencias();
  }
}