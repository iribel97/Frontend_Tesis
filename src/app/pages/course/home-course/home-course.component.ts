import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AcordeonComponent} from "../../../shared/ui/acordeon/acordeon.component";
import {TabsComponent} from "../../../shared/ui/tabs/tabs.component";
import {HttpClient} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-home-course',
  imports: [
    AcordeonComponent,
    TabsComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './home-course.component.html',
  styleUrl: './home-course.component.css'
})
export class HomeCourseComponent implements  OnInit {
  @ViewChild('tabContentTemplate', { static: true }) tabContentTemplate!: TemplateRef<any>;
  tabs: { id: string; title: string; content: TemplateRef<any>; data: any }[] = []; // Tabs dinámicas
  materia: any = null; // Datos completos de la materia desde el backend
  accordionItems: any[] = []; // Contenido del acordeón dinámico


  constructor(private cdr: ChangeDetectorRef, private http: HttpClient) {
  }

  ngOnInit(): void {
    // Datos quemados de la materia
    const data = {
      idMateria: 4,
      materia: "Matemáticas",
      docente: "Juan Perez",
      horarios: [
        {
          dia: "Lunes",
          horaInicio: "07:00",
          horaFin: "09:00"
        },
        {
          dia: "Miércoles",
          horaInicio: "07:00",
          horaFin: "09:00"
        },
        {
          dia: "Viernes",
          horaInicio: "08:00",
          horaFin: "10:00"
        }
      ],
      unidades: [
        {
          idUnidad: 1,
          nombre: "Cambios físicos",
          contenido: [
            {
              idTema: 1,
              nombreTema: "Tema 1 - Introducción a los cambios físicos",
              descripcion: "Exploración de los conceptos básicos de los cambios físicos en materia.",
              materiales: [
                {
                  idMaterial: 1,
                  nombreLink: "Material 1",
                  link: "http://example.com/material-1",
                  documento: [
                    {
                      idDocumento: 1,
                      nombre: "Documento 1",
                      tipo: "PDF",
                      contenido: "Base64"
                    }
                  ]
                },
                {
                  idMaterial: 2,
                  nombreLink: "Presentación: Cambios físicos",
                  link: "http://example.com/presentacion-cambios",
                  documento: [
                    {
                      idDocumento: 2,
                      nombre: "Presentación Cambios Físicos",
                      tipo: "PPT",
                      contenido: "Base64"
                    }
                  ]
                }
              ],
              asignacion: [
                {
                  idAsignacion: 1,
                  nombre: "Asignación 1",
                  descripcion: "Resolución de ejercicios sobre cambios físicos.",
                  fechaFin: "2021-09-20",
                  horaFin: "23:59"
                }
              ]
            }
          ]
        },
        {
          idUnidad: 2,
          nombre: "Cambios químicos",
          contenido: [
            {
              idTema: 2,
              nombreTema: "Tema 2 - Introducción a los cambios químicos",
              descripcion: "Se presenta el concepto de los cambios químicos y su impacto en la materia.",
              materiales: [
                {
                  idMaterial: 3,
                  nombreLink: "Guía de estudio",
                  link: "http://example.com/guia-estudio",
                  documento: [
                    {
                      idDocumento: 3,
                      nombre: "Guía de Cambios Químicos",
                      tipo: "PDF",
                      contenido: "Base64"
                    }
                  ]
                },
                {
                  idMaterial: 4,
                  nombreLink: "Experimentos sobre reacciones químicas",
                  link: "http://example.com/experimentos-quimicos",
                  documento: []
                }
              ],
              asignacion: [
                {
                  idAsignacion: 2,
                  nombre: "Asignación 2",
                  descripcion: "Redactar un informe sobre ejemplos de cambios químicos observados.",
                  fechaFin: "2021-09-25",
                  horaFin: "23:59"
                }
              ]
            },
            {
              idTema: 3,
              nombreTema: "Tema 3 - Ejemplo práctico de cambios químicos",
              descripcion: "Estudio de la combustión como ejemplo de un cambio químico.",
              materiales: [
                {
                  idMaterial: 5,
                  nombreLink: "Video de la combustión",
                  link: "http://example.com/video-combustion",
                  documento: []
                }
              ],
              asignacion: [
                {
                  idAsignacion: 3,
                  nombre: "Asignación 3",
                  descripcion: "Determinar los productos de la combustión.",
                  fechaFin: "2021-09-28",
                  horaFin: "22:00"
                }
              ]
            }
          ]
        },
        {
          idUnidad: 3,
          nombre: "Energía y calor",
          contenido: [
            {
              idTema: 4,
              nombreTema: "Tema 4 - Introducción al calor y la energía térmica",
              descripcion: "Estudio de cómo se transfiere la energía térmica.",
              materiales: [
                {
                  idMaterial: 6,
                  nombreLink: "Diagramas de transferencia de calor",
                  link: "http://example.com/diagramas-calor",
                  documento: [
                    {
                      idDocumento: 4,
                      nombre: "Diagrama Calor",
                      tipo: "IMAGEN",
                      contenido: "Base64"
                    }
                  ]
                }
              ],
              asignacion: [
                {
                  idAsignacion: 4,
                  nombre: "Asignación 4",
                  descripcion: "Investigar los tipos de transferencia de calor.",
                  fechaFin: "2021-10-01",
                  horaFin: "23:59"
                }
              ]
            },
            {
              idTema: 5,
              nombreTema: "Tema 5 - Práctica: Conductores y aislantes de calor",
              descripcion: "Análisis de ejemplos prácticos de materiales que conducen o aíslan calor.",
              materiales: [],
              asignacion: [
                {
                  idAsignacion: 5,
                  nombre: "Asignación 5",
                  descripcion: "Preparar una lista de materiales conductores y aislantes comunes.",
                  fechaFin: "2021-10-05",
                  horaFin: "23:59"
                }
              ]
            }
          ]
        }
      ]
    };

    // Guardar los datos de la materia
    this.materia = data; // Guardar los datos completos de la materia
    this.generarTabs(data.unidades); // Transformar las unidades en tabs para enviarlas al componente
  }

  generarTabs(unidades: any[]): void {
    // Transformar cada unidad en un tab con un título y contenido dinámico
    this.tabs = unidades.map((unidad, index) => ({
      id: `unidad-${unidad.idUnidad}`, // Identificador único
      title: unidad.nombre, // Título del tab (nombre de la unidad)
      content: this.tabContentTemplate, // Usamos un TemplateRef para el contenido
      data: unidad.contenido // Contenido completo dinámico enviado al template
    }));

    if (unidades.length > 0) {
      this.accordionItems = this.extraerAccordionItems(unidades[0].contenido);
      console.log('Accordion items:', this.accordionItems);
    }
  }

  // Extraer los elementos de un acordeón desde los datos
  extraerAccordionItems(contenido: any[]): any[] {
    return contenido.map((tema: any) => ({
      title: tema.nombreTema, // Título del acordeón
      content: tema.descripcion // Contenido del acordeón
    }));
  }

  onTabChange(unidadData: any): void {
    console.log('Unidad seleccionada (onTabChange):', unidadData);

    // Extraer los temas y adaptar los datos
    this.accordionItems = unidadData.map((tema: any) => ({
      title: tema.nombreTema, // Título del acordeón
      content: tema.descripcion, // Descripción del tema
      materiales: tema.materiales || [], // Materiales asociados al tema
      asignacion: tema.asignacion || [] // Asignaciones asociadas al tema
    }));
  }
}
