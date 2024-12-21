import {Component, OnInit} from '@angular/core';
import {LoadingService} from "../../service/Loader/loading.service";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'ui-spinner',
  imports: [
    NgIf,
    AsyncPipe
  ],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent implements OnInit{
  isLoading: any; // Declaración de la propiedad sin inicializarla directamente

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    // Inicializa la propiedad aquí, cuando Angular ya ha configurado loadingService
    this.isLoading = this.loadingService.isLoading$;
  }
}
