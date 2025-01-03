import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StudentsService} from "../../../services/students/students.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-home-course',
  templateUrl: './home-course.component.html',
  imports: [],
  styleUrl: './home-course.component.css'
})
export class HomeCourseComponent implements OnInit {
  materia: any = null; // Datos completos de la materia desde el backend

  constructor(
      private route: ActivatedRoute, // Escucha cambios en la ruta
      private studentsService: StudentsService // Servicio para obtener datos
  ) {}

  ngOnInit(): void {
    // Escuchar cambios en los parámetros de la URL
    this.route.params.subscribe((params) => {
      const idMateria = +params['id']; // Obtener el ID desde la ruta

      // Llamar al servicio para obtener la materia correspondiente
      this.getMateria(idMateria);
    });
  }

  // Obtener materia desde el servicio
  getMateria(id: number): void {
    this.studentsService.getMateriaById(id).subscribe(
        (data) => {
          this.materia = data;

          // Inicializar estado de los acordeones
          if (this.materia?.unidades) {
            this.materia.unidades.forEach((unidad: any) => {
              unidad.open = false;
              unidad.contenido?.forEach((tema: any) => {
                tema.open = false;
              });
            });
          }
        },
        (error) => {
          console.error('Error al obtener la materia:', error);
        }
    );
  }

  // Alternar el estado de una unidad
  toggleUnidad(unidad: any): void {
    unidad.open = !unidad.open;
  }

  // Alternar el estado de un tema
  toggleTema(tema: any): void {
    tema.open = !tema.open;
  }

  // Función para descargar el documento
  descargarDocumento(base64: string, nombre: string, mime: string): void {
    // Convertir Base64 a un objeto Blob
    const byteCharacters = atob(base64); // Decodificar Base64
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = Array.from(slice, char => char.charCodeAt(0));
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: mime });

    // Crear una URL del Blob
    const url = URL.createObjectURL(blob);

    // Crear un enlace temporal y forzar la descarga
    const a = document.createElement('a');
    a.href = url;
    a.download = nombre;
    a.click();

    // Liberar la memoria
    URL.revokeObjectURL(url);
  }
}