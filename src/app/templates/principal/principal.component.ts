import {Component, HostListener, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {BreadcrumbService} from "../../services/breadcrumb.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ClickOutsideDirective} from "../../shared/directivas/click-outside.directive";
import {midudevComponent} from "../../media/midudev.component";
import {SpinnerComponent} from "../../shared/ui/spinner/spinner.component";
import {AuthService} from "../../services/auth/auth.service";
import {Observable} from "rxjs";
import {StudentsService} from "../../services/students/students.service";
import { UsuarioDTO, Genero, EstadoUsu } from '../../interface/response/UsuarioDTO';

@Component({
    selector: 'app-principal',
    imports: [RouterOutlet, NgClass, ClickOutsideDirective, midudevComponent, SpinnerComponent, NgIf, NgForOf, RouterLink, RouterLinkActive],
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
    protected usernameLS : string = '';
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
        estado: EstadoUsu.ACTIVO,
        docente: undefined,
        estudiante: undefined,
        representante: undefined
    };

    materias: any[] = [];

    isLargeScreen: boolean = false;   // Controla si estamos en tamaño "lg" o más
    constructor(private authService: AuthService, private studentsService: StudentsService) {
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
        if (this.infoUser.rol != 'Admin' && this.infoUser.rol != 'Institucional'){
            this.cargarMaterias();
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
        //Tomar el usuario del local storage
        //this.usernameLS = localStorage.getItem('username') ?? '??';
    
        this.studentsService.getUser().subscribe({
            next: (data: UsuarioDTO) => {
                console.log('Información del usuario:', data); // Útil para depuración
                this.initialUserLS = 
                    (data.nombres ? data.nombres.slice(0, 1).toUpperCase() : '') + 
                    (data.apellidos ? data.apellidos.slice(0, 1).toUpperCase() : '');
                
                // Verifica que data tenga todas las propiedades necesarias
                if (data && data.cedula && data.nombres && data.apellidos) {
                    this.infoUser = data; // Asigna la información del usuario al objeto local
                    console.log('Información del usuario asignada a infoUser:', this.infoUser);
                } else {
                    console.error('Datos incompletos recibidos:', data);
                }
            },
            error: (err) => {
                console.error('Error al cargar información del usuario:', err);
            }
        });
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
    }

    cargarMaterias(): void {
        this.studentsService.getMaterias().subscribe({
            next: (data) => {
                console.log('Materias cargadas:', data); // Útil para depuración
                this.materias = data; // Asigna las materias al arreglo local
            },
            error: (err) => {
                console.error('Error al cargar materias:', err);
            }
        });
    }
}
