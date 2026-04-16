import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  // Mantiene un mapa con el estado de cada modal
  private modalStates: { [key: string]: boolean } = {};

  // Registrar un modal en el servicio (cerrado por defecto)
  registerModal(modalId: string): void {
    if (!(modalId in this.modalStates)) {
      this.modalStates[modalId] = false; // Cerrado por defecto
    }
  }

  // Eliminar un modal del servicio
  unregisterModal(modalId: string): void {
    delete this.modalStates[modalId];
  }

  // Abrir un modal
  openModal(modalId: string): void {
    this.modalStates[modalId] = true; // Marcar como abierto
  }

  // Cerrar un modal
  closeModal(modalId: string): void {
    this.modalStates[modalId] = false; // Marcar como cerrado
  }

  // Verificar si un modal está abierto
  isModalOpen(modalId: string): boolean {
    return !!this.modalStates[modalId]; // Devuelve el estado del modal
  }

  getModalIndex(modalId: string): number {
    const keys = Object.keys(this.modalStates); // Obtener todos los IDs de los modales registrados
    return keys.indexOf(modalId); // Retornar el índice del ID solicitado
  }


}