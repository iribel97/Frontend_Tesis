import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {NgIf, NgStyle} from "@angular/common";
import {ModalService} from "../../service/modal/modal.service"; // Servicio que gestiona los modales

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  imports: [
    NgIf,
    NgStyle
  ],
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() modalId!: string; // Identificador único para el modal
  @Input() zIndexOffset: number = 1000; // Desplazamiento del z-index
  @Input() isOpen: boolean = false; // Estado inicial del modal (cerrado por defecto)

  constructor(protected modalService: ModalService) {}

  ngOnInit(): void {
    // Registrar el modal en el servicio
    this.modalService.registerModal(this.modalId);

    // Abre el modal automáticamente si `isOpen` es `true`
    if (this.isOpen) {
      this.modalService.openModal(this.modalId);
    }
  }

  ngOnDestroy(): void {
    // Eliminar el modal cuando se destruye el componente
    this.modalService.unregisterModal(this.modalId);
  }

  close(): void {
    // Cerrar el modal (manual)
    this.modalService.closeModal(this.modalId);
  }

  get zIndex(): number {
    // Calcular el z-index automáticamente por la pila del servicio
    return this.zIndexOffset + this.modalService.getModalIndex(this.modalId);
  }
}