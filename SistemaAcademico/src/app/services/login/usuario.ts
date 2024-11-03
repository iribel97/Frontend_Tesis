export interface Usuario {
    cedula: string;
    nombres: string;
    apellidos: string;
    correo: string;
    telefono: string;
    direccion: string;
    nacimiento: string;
    genero: string;
    rol: string;
    estado: string;
    docente?: {
        id: number;
        titulo: string;
        especialidad: string;
        experiencia:number;
    };
    estudiante?: {
        id: number;
        ingreso: string;
        sangre: string;
        representante: {
            cedula: string;
            nombres: string;
            apellidos: string;
            correo: string;
            telefono: string;
            direccion: string;
            nacimiento: string;
            genero: string;
            rol: string;
            estado: string;
            docente: any;
            estudiante: any;
        };
    };
    
}
