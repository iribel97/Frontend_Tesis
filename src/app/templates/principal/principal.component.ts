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
    async ngOnInit() {
        this.cargarMaterias(); // Llamar al método para inicializar las materias
        this.getInfoUser();
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
        this.usernameLS = localStorage.getItem('username') ?? '??';
        this.initialUserLS = this.usernameLS.slice(0, 2).toUpperCase();
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
