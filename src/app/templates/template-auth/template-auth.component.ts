import { Component } from '@angular/core';
import {BackgraundComponent} from "../../shared/ui/backgraund/backgraund.component";

@Component({
  selector: 'app-template-auth',
  standalone: true,
    imports: [
        BackgraundComponent
    ],
  templateUrl: './template-auth.component.html',
  styleUrl: './template-auth.component.css'
})
export class TemplateAuthComponent {

}
