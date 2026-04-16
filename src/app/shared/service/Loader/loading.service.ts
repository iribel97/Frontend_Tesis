import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Proveerlo de manera global
})
export class LoadingService {
  // Estado inicial: no está cargando
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  // Observable para que los componentes se suscriban
  isLoading$ = this.isLoadingSubject.asObservable();

  // Método para activar el spinner (mostrar)
  show(): void {
    console.log('Mostrando spinner');
    this.isLoadingSubject.next(true);
  }

  // Método para desactivar el spinner (ocultar)
  hide(): void {
    console.log('Ocultando spinner');
    this.isLoadingSubject.next(false);
  }
}