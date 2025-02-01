import { Component, OnInit } from '@angular/core';
import { DecimalPipe, NgForOf } from "@angular/common";
import { StudentsService } from '../../../services/students/students.service';

@Component({
  selector: 'app-grades',
  imports: [
    NgForOf,
    DecimalPipe
  ],
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.css'
})
export class GradesComponent implements OnInit{

  materias: any[] = [];
  
  constructor(private studentsService: StudentsService) { }

  ngOnInit(): void {
    this.getGrades();
  }

  // traer todas las notas
  getGrades(): void {
    this.studentsService.getGrades().subscribe(
      response => {
        this.materias = response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
  

}
