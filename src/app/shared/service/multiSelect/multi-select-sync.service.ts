import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MultiSelectSyncService {
    private subjects: { [key: string]: BehaviorSubject<Map<string, number[]>> } =
        {}; // Cambiamos a number[]

    updateSelectedItems(
        groupId: string,
        selectId: string,
        selectedItems: number[]
    ): void {
        if (!this.subjects[groupId]) {
            // Creamos un BehaviorSubject para el groupId
            this.subjects[groupId] = new BehaviorSubject<Map<string, number[]>>(
                new Map()
            );
        }

        // Obtener las selecciones actuales del grupo
        const currentSelections = this.subjects[groupId].getValue();

        // Actualizar la selección del select actual
        currentSelections.set(selectId, selectedItems); // Almacenar array de números

        // Emitir el nuevo estado actualizado
        this.subjects[groupId].next(currentSelections);

        console.log(
            `Updated selections for groupId[${groupId}]:`,
            Array.from(currentSelections.entries())
        );
    }

    /*

    getSelectedItems(groupId: string): Observable<Set<number>> {
        if (!this.subjects[groupId]) {
            this.subjects[groupId] = new BehaviorSubject<Set<number>>(new Set());
        }
        return this.subjects[groupId].asObservable();
    }

    getCurrentSelections(groupId: string): Set<number> {
        if (!this.subjects[groupId]) {
            return new Set();
        }
        // Salida para depuración
        console.log(`Current selections for groupId[${groupId}]:`, this.subjects[groupId].getValue());
        return this.subjects[groupId].getValue();
    }*/

    getExcludedItems(groupId: string): Observable<number[]> {
        if (!this.subjects[groupId]) {
            // Si el grupo no existe, crear un BehaviorSubject vacío
            this.subjects[groupId] = new BehaviorSubject<Map<string, number[]>>(
                new Map()
            );
        }

        // Transformar el estado actual del mapa en una lista de valores seleccionados únicos
        return this.subjects[groupId].asObservable().pipe(
            map((currentSelections: Map<string, number[]>) =>
                Array.from(currentSelections.values()).flat() // Juntar todos los arrays en un solo array
            )
        );
    }
}