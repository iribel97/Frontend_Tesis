import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploaderComponent),
      multi: true,
    },
  ],
  imports: [
    DecimalPipe,
    NgIf,
    NgForOf
  ]
})
export class FileUploaderComponent implements ControlValueAccessor {
  @Input() required = false; // Define si el campo es requerido
  @Input() multiple = false; // Define si permite múltiples archivos
  @Input() view: 'single' | 'multiple' = 'single'; // Define la vista (por defecto: single)

  files: File[] = []; // Lista de archivos seleccionados
  progress: { [key: string]: number } = {}; // Mapa para el progreso de cada archivo
  uploadInProgress = false; // Estado de subida

  // Implementación de ControlValueAccessor
  onChange = (files: File[]) => {};
  onTouched = () => {};

  /** Manejar input de archivo */
  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const fileList = input.files;

    // Convertir lista de archivos a un array
    const fileArray = fileList ? Array.from(fileList) : [];
    this.files = this.multiple ? fileArray : fileArray.slice(0, 1); // Un archivo si no acepta múltiples
    this.progress = {}; // Restablecer el progreso para los nuevos archivos
    this.startUploadSimulation(); // Iniciar la simulación de subida
    this.onChange(this.files);
  }

  /** Eliminar archivo */
  removeFile(index: number): void {
    const file = this.files[index];
    delete this.progress[file.name]; // Eliminar progreso del archivo
    this.files.splice(index, 1);
    this.onChange(this.files);
  }

  /** Simular subida de archivos */
  startUploadSimulation(): void {
    this.uploadInProgress = true;

    this.files.forEach((file, index) => {
      const fileName = file.name || `Archivo_${index}`; // Garantiza un índice válido
      this.progress[fileName] = 0; // Inicia el progreso en 0

      const interval = setInterval(() => {
        if (this.progress[fileName] >= 100) {
          clearInterval(interval);
          if (index === this.files.length - 1) {
            // Finaliza cuando el último archivo termine
            this.uploadInProgress = false;
          }
        } else {
          this.progress[fileName] += Math.floor(Math.random() * 10) + 5; // Incremento de progreso aleatorio
        }
      }, 300); // Incrementa cada 300ms
    });
  }

  writeValue(files: File[]): void {
    this.files = files || [];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  getProgressForFirstFile(): number {
    if (this.files.length > 0 && this.files[0]?.name) {
      return this.progress[this.files[0].name] || 0; // Retorna el progreso del primer archivo o 0
    }
    return 0; // Si no hay archivo, el progreso es 0
  }

  isValidProgressForFirstFile(): boolean {
    // Verifica que haya al menos un archivo y que su nombre sea válido
    if (this.files.length > 0 && this.files[0]?.name) {
      return this.progress[this.files[0].name] !== undefined;
    }
    return false;
  }
}