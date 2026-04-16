import {Component, HostListener, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {BreadcrumbService} from "../../services/breadcrumb.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ClickOutsideDirective} from "../../shared/directivas/click-outside.directive";
import {midudevComponent} from "../../media/midudev.component";
import {SpinnerComponent} from "../../shared/ui/spinner/spinner.component";
import {AuthService} from "../../services/auth/auth.service";
import {Observable} from "rxjs";
import {StudentsService} from "../../services/students/students.service";
import {UsuarioDTO, Genero, EstadoUsu} from '../../interface/response/UsuarioDTO';
import {TeachersService} from '../../services/teacher/teachers.service';
import { FormChangPassComponent } from '../../forms/form-chang-pass/form-chang-pass.component';

@Component({
    selector: 'app-principal',
    imports: [RouterOutlet, 
        NgClass, 
        ClickOutsideDirective, 
        midudevComponent, 
        SpinnerComponent, 
        NgIf, 
        NgForOf, 
        RouterLink, 
        RouterLinkActive,
        FormChangPassComponent,
    ],
    templateUrl: './principal.component.html',
    styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit {
    /**
     * Estado del modo oscuro.
     */
    isDarkMode = false;
    isDropdownOpen = false;
    isSidebarVisible: boolean = false; // Controla la visibilidad del sidebar
    isOpen = false;
    protected initialUserLS: string = '';
    protected usernameLS: string = '';
    infoUser: UsuarioDTO = {
        cedula: '',
        nombres: '',
        apellidos: '',
        correo: '',
        telefono: '',
        direccion: '',
        nacimiento: '',
        genero: Genero.OTRO,
        rol: '',
        estado: EstadoUsu.Activo,
        docente: undefined,
        estudiante: undefined,
        representante: undefined
    };

    materias: any[] = [];

    isLargeScreen: boolean = false;   // Controla si estamos en tamaño "lg" o más
    constructor(private authService: AuthService, private studentsService: StudentsService, private teachersService: TeachersService) {
        this.checkScreenSize(); // Evaluar el tamaño de pantalla al cargar el componente
    }

    /**
     * Alterna entre modo oscuro y claro.
     */
    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        if (this.isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode));
    }

    /**
     * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
     * Obtiene el perfil del usuario y la información del usuario desde el almacenamiento local.
     * Obtiene el estado del modo oscuro desde el almacenamiento local.
     * Escucha los cambios en el Breadcrumb.
     */
    ngOnInit() {
        this.getInfoUser();
        if (this.infoUser.rol != 'Admin' && this.infoUser.rol != 'Institucional') {

        } // Llamar al método para inicializar las materias
        const storedDarkMode = localStorage.getItem('isDarkMode');
        if (storedDarkMode) {
            this.isDarkMode = JSON.parse(storedDarkMode);
            if (this.isDarkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }

    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    closeDropdown(event: Event) {
        if (!(event.target as HTMLElement).closest('#dropdown-account')) {
            this.isDropdownOpen = false;
        }
    }

    // Alternar visibilidad del Sidebar
    toggleSidebar(): void {
        if (!this.isLargeScreen) {  // Solo permite alternar si estamos en pantallas pequeñas
            this.isSidebarVisible = !this.isSidebarVisible;
        }
    }

    // Detectar cambios de tamaño de pantalla y ajusta la visibilidad
    @HostListener('window:resize', [])
    onResize(): void {
        this.checkScreenSize();
    }

    private checkScreenSize(): void {
        this.isLargeScreen = window.innerWidth >= 1024; // lg en Tailwind es 1024px
        if (this.isLargeScreen) {
            this.isSidebarVisible = false; // Reseteamos `isSidebarVisible` para evitar conflictos
        }
    }

    logout() {
        this.authService.logout();
        window.location.href = '/';
    }

    getInfoUser() {
        this.studentsService.getUser().subscribe(data => {
            this.initialUserLS =
                (data.nombres ? data.nombres.slice(0, 1).toUpperCase() : '') +
                (data.apellidos ? data.apellidos.slice(0, 1).toUpperCase() : '');

            // Verifica que data tenga todas las propiedades necesarias
            if (data && data.cedula && data.nombres && data.apellidos) {
                this.infoUser = data; // Asigna la información del usuario al objeto local
                // Ahora que infoUser está correctamente asignado, podemos cargar las materias
                this.cargarMaterias();
            } else {
                console.error('Datos incompletos recibidos:', data);
            }
        });
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
    }

    cargarMaterias(): void {
        if (this.infoUser.rol == 'Docente') {
            this.teachersService.getMaterias().subscribe({
                next: (data) => {
                    console.log('Materias cargadas docente:', data); // Útil para depuración
                    this.materias = data; // Asigna las materias al arreglo local
                },
                error: (err) => {
                    console.error('Error al cargar materias:', err);
                }
            });
        } else if (this.infoUser.rol == 'Estudiante') {
            this.studentsService.getMaterias().subscribe({
                next: (data) => {
                    console.log('Materias cargadas estudiante:', data); // Útil para depuración
                    this.materias = data; // Asigna las materias al arreglo local
                },
                error: (err) => {
                    console.error('Error al cargar materias:', err);
                }
            });
        }
    }

    transformarGrado(grado: string): string {
        switch (grado.toLowerCase()) {
            case 'noveno':
                return '9º';
            case 'octavo':
                return '8º';
            case 'décimo': // "décimo" con tilde, caso correcto
            case 'decimo': // Para casos sin tilde
                return '10º';
            case 'séptimo': // Adicional caso para séptimo, si es necesario
            case 'septimo':
                return '7º';
            // Agrega los demás casos necesarios
            default:
                return grado; // Por si no coincide ningún caso
        }
    }

}
