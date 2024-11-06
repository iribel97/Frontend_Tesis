export interface UsuarioRegistro {

    cedula: string;
    nombre: string;
    apellido: string;
    correo: string;
    password: string;
    telefono: string;
    direccion: string;
    rol: string;
    nacimiento: string;
    genero: string;
    estado: string;

    titulo?: string;
    especialidad?: string;
    experiencia?: number;

    ingreso?: string;
    sangre?: string;
    cedulaRepresentante?: string;
    

    autorizado?: boolean;
    ocupacion?: string;
    empresa?: string;
    telefonoEmpresa?: string;
    direccionEmpresa?: string;


}