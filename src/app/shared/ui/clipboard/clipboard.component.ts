import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
    selector: 'app-clipboard',
    templateUrl: './clipboard.component.html',
    imports: [
        NgIf,
        NgClass
    ],
    styleUrls: ['./clipboard.component.css']
})
export class ClipboardComponent {
    @Input() textToCopy: string = ''; // Texto que será copiado al portapapeles
    isCopied: boolean = false; // Estado para mostrar feedback al usuario

    // Método para copiar el texto al portapapeles
    copyToClipboard() {
        if (this.textToCopy.trim() !== '') { // Verificar que haya texto para copiar
            const tempInput = document.createElement('textarea');
            tempInput.value = this.textToCopy;
            tempInput.style.position = 'fixed'; // Para evitar que sea visible
            document.body.appendChild(tempInput);
            tempInput.focus();
            tempInput.select();

            try {
                document.execCommand('copy'); // Ejecutar comando de copiar
                this.isCopied = true;
                console.log('Texto copiado:', this.textToCopy); // Confirmación
                setTimeout(() => {
                    this.isCopied = false;
                }, 2000);
            } catch (err) {
                console.error('Error al copiar:', err);
            }
            document.body.removeChild(tempInput); // Eliminar el textarea temporal
        } else {
            console.warn('No hay texto para copiar');
        }
    }
}