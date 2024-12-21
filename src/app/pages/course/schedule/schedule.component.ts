import {Component, OnInit} from '@angular/core';
import {TableComponent} from "../../../shared/ui/table/table.component";

@Component({
  selector: 'app-schedule',
    imports: [
        TableComponent
    ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit {
  objectsinbox: any[] = []; // Datos quemados (completos)

  ngOnInit(): void {
    this.generateDummyData(10); // Generar datos de prueba
    console.log(this.objectsinbox);
  }

  /**
   * Generación de datos ficticios para la tabla
   */
  generateDummyData(count: number): void {
    // Limpiamos el array previo
    this.objectsinbox = [];

    // Materias de ejemplo
    const subjects = ['Matemáticas', 'Historia', 'Química', 'Inglés', 'Arte', 'Deporte'];

    // Horario base (inicia a las 7:00 AM y avanza cada 1 hora)
    const baseHour = 7; // 7:00 AM
    const hoursPerDay = 8; // Generaremos 8 horas únicas para cada día (7 AM - 3 PM)

    for (let i = 0; i < count; i++) {
      const schedule = Array.from({ length: hoursPerDay }, (_, index) => {
        const hour = baseHour + index; // Incrementa la hora
        const formattedHour = `${hour <= 12 ? hour : hour - 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
        return formattedHour;
      });

      this.objectsinbox.push({
        lunes: { materia: subjects[i % subjects.length], hora: schedule[0] },
        martes: { materia: subjects[(i + 1) % subjects.length], hora: schedule[1] },
        miercoles: { materia: subjects[(i + 2) % subjects.length], hora: schedule[2] },
        jueves: { materia: subjects[(i + 3) % subjects.length], hora: schedule[3] },
        viernes: { materia: subjects[(i + 4) % subjects.length], hora: schedule[4] },
        sabado: { materia: subjects[(i + 5) % subjects.length], hora: schedule[5] }
      });
    }
  }

}
