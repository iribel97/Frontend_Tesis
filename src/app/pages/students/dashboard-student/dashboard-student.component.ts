import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../../DashBoard/calendar/calendar.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-dashboard-student',
  imports: [CalendarComponent, NgForOf],
  templateUrl: './dashboard-student.component.html',
  styleUrl: './dashboard-student.component.css'
})
export class DashboardStudentComponent implements OnInit {

  tareas = [
    { nombre: 'Tarea 1', descripcion: 'Resolver ejercicios', fecha: '15 enero', estado: 'pendiente' },
    { nombre: 'Tarea 2', descripcion: 'Escribir un ensayo', fecha: '20 enero', estado: 'en progreso' },
    { nombre: 'Tarea 3', descripcion: 'Proyecto grupal', fecha: '25 enero', estado: 'urgente' },
    { nombre: 'Tarea 4', descripcion: 'Preparar presentación', fecha: '30 enero', estado: 'pendiente' },
    { nombre: 'Tarea 5', descripcion: 'Lectura de capítulo', fecha: '5 febrero', estado: 'pendiente' },
    { nombre: 'Tarea 6', descripcion: 'Desarrollar app', fecha: '10 febrero', estado: 'en progreso' }
  ];
  

  constructor() { }

  ngOnInit(): void {

  }

  materias = [
    { nombre: 'Matemáticas', docente: 'Juan Pérez', promedio: 8.5, progreso: 75 },
    { nombre: 'Física', docente: 'María López', promedio: 9.2, progreso: 60 },
    { nombre: 'Historia', docente: 'Carlos Gómez', promedio: 7.8, progreso: 85 },
    { nombre: 'Inglés', docente: 'Ana Rodríguez', promedio: 8.0, progreso: 50 },
    { nombre: 'Ciencias Naturales', docente: 'Pedro Martínez', promedio: 9.5, progreso: 40 }
  ];

  currentIndex = 0;

  get currentTranslate() {
    return -this.currentIndex * 320; // Ancho de la tarjeta + espacio
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextSlide() {
    if (this.currentIndex < this.materias.length - 1) {
      this.currentIndex++;
    }
  }

}
