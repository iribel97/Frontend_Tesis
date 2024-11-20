import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {BreadcrumbService} from "../../services/breadcrumb.service";

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit{
  constructor(
                private breadcrumbService: BreadcrumbService){

    }

      breadcrumb: string[] = [];

  ngOnInit() {
    this.breadcrumbService.breadcrumb$.subscribe(breadcrumb => {
            this.breadcrumb = breadcrumb;
        });
  }
}
