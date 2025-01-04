import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    constructor() {
    }

    // Función para descargar el documento
    descargarDocumento(base64: string, nombre: string, mime: string): void {
        // Convertir Base64 a un objeto Blob
        const byteCharacters = atob(base64); // Decodificar Base64
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = Array.from(slice, char => char.charCodeAt(0));
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, {type: mime});

        // Crear una URL del Blob
        const url = URL.createObjectURL(blob);

        // Crear un enlace temporal y forzar la descarga
        const a = document.createElement('a');
        a.href = url;
        a.download = nombre;
        a.click();

        // Liberar la memoria
        URL.revokeObjectURL(url);
    }

}
