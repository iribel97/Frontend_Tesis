import { Component, Input } from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";

interface Toast {
  id: number;
  severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast';
  title?: string; // Título opcional
  message: string; // Mensaje obligatorio
  icon?: string; // Ícono opcional
  duration?: number; // Tiempo que debe aparecer el toast
}

@Component({
  selector: 'ui-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  imports: [
    NgClass,
    NgForOf,
    NgIf
  ]
})
export class ToastComponent {
  @Input() duration: number = 5000; // Duración predeterminada de los toasts en milisegundos
  toasts: Toast[] = []; // Lista de toasts activos
  private toastId: number = 0; // Identificador único para cada toast

  // Método para agregar un nuevo toast
  showToast(
      severity: Toast['severity'],
      message: string,
      title?: string,
      duration?: number,
      icon?: string
  ): void {
    const id = ++this.toastId;
    const newToast: Toast = { id, severity, message, title, duration, icon };
    this.toasts.push(newToast);

    // Remover automáticamente el toast después del tiempo especificado
    setTimeout(() => this.removeToastById(id), duration || this.duration);
  }

  // Método para eliminar un toast
  removeToast(toast: Toast): void {
    this.toasts = this.toasts.filter((t) => t.id !== toast.id);
  }

  // Método privado para eliminar un toast por su ID
  private removeToastById(id: number): void {
    this.toasts = this.toasts.filter((t) => t.id !== id);
  }

  // Método para asignar clases según la severidad
  getSeverityClass(severity: Toast['severity']): string {
    return `toast-${severity}`;
  }
}