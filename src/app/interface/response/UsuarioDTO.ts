export interface UsuarioDTO {
    cedula: string;
    nombres: string;
    apellidos: string;
    correo: string;
    telefono: string;
    direccion: string;
    nacimiento: string; // Assuming LocalDate is represented as a string in ISO format
    genero: Genero;
    rol: string;
    estado: EstadoUsu;
    docente?: DocenteDTO;
    estudiante?: EstudianteDTO;
    representante?: RepresentanteDTO;
  }
  
  export interface DocenteDTO {
    titulo: string;
    especialidad: string;
    experiencia: string;
  }
  
  export interface EstudianteDTO {
    ingreso: string;
    representante: RepresentanteDTO;
  }
  
  export interface RepresentanteDTO {
    autorizado: boolean;
    ocupacion: string;
    empresa: string;
    direccion: string;
    telefono: string;
  }
  
  export enum Genero {
    MASCULINO = 'MASCULINO',
    FEMENINO = 'FEMENINO',
    OTRO = 'OTRO'
  }
  
  export enum EstadoUsu {
    Activo = 'Activo',
    Inactivo = 'Inactivo',
    Suspendido = 'Suspendido'
  }