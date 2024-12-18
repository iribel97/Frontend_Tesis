import { Component } from '@angular/core';
import {AcordeonComponent} from "../../../shared/ui/acordeon/acordeon.component";

@Component({
  selector: 'app-home-course',
    imports: [
        AcordeonComponent
    ],
  templateUrl: './home-course.component.html',
  styleUrl: './home-course.component.css'
})
export class HomeCourseComponent {
  accordionItems = [
    { title: 'Titulo 1', content: 'Contenido de la sección 1' },
    { title: 'Titulo 2', content: 'Contenido de la sección 2' },
    { title: 'Titulo 3', content: 'Contenido de la sección 3' }
  ];
}
