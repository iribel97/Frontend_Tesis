import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from "../../../services/admin/admin.service";
import { FormsModule } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";
import { ModalComponent } from "../../../shared/ui/modal/modal.component";
import { SutmitAssignmentComponent } from "../../../forms/student/sutmit-assignment/sutmit-assignment.component";
import { ModalService } from "../../../shared/service/modal/modal.service";
import { ToastComponent } from "../../../shared/ui/toast/toast.component";
import { FormRegisterUserComponent } from '../../../forms/admin/form-register-user/form-register-user.component';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ModalComponent,
    SutmitAssignmentComponent,
    ToastComponent,
    FormRegisterUserComponent,
  ],
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  protected readonly Math = Math;

  @ViewChild('toast', { static: true }) toast!: ToastComponent;

  users: any[] = []; // Lista de usuarios original traída del backend
  filteredUsers: any[] = []; // Lista resultante después de aplicar filtros
  paginatedUsers: any[] = []; // Lista de usuarios visibles en la tabla (paginados)

  searchTerm: string = ''; // Término de búsqueda
  currentPage: number = 1; // Página actual
  itemsPerPage: number = 10; // Número de elementos por página

  userDelete: string = '';
  showAddUserModal: boolean = false; // Estado del modal de agregar usuario

  constructor(private adminService: AdminService,
              private modalService: ModalService) {}

  ngOnInit(): void {
    this.fetchUsers(); // Llamar al servicio para cargar los usuarios
  }

  // Obtener usuarios del servicio
  fetchUsers(): void {
    this.adminService.getAllUser().subscribe({
      next: (data) => {
        this.users = data; // Lista original
        this.applyFilters(); // Aplicar filtros (sin búsqueda, por defecto)
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        this.toast.showToast('error', err.error.detalles, err.error.mensaje, 10000); // Show toast message
      }
    });
  }

  // Aplicar filtros a la lista (búsqueda por cédula, nombres, apellidos, correo)
  applyFilters(): void {
    const term = this.searchTerm.toLowerCase().trim(); // Normalizar el término buscado
    if (term === '') {
      // Si no hay filtro, mostramos todos los usuarios
      this.filteredUsers = [...this.users];
    } else {
      // Filtramos los usuarios según el término
      this.filteredUsers = this.users.filter(user =>
        user.cedula.includes(term) ||
        user.nombres.toLowerCase().includes(term) ||
        user.apellidos.toLowerCase().includes(term) ||
        user.correo.toLowerCase().includes(term)
      );
    }
    this.currentPage = 1; // Reiniciar a la primera página
    this.paginateUsers(); // Aplicar paginación
  }

  // Paginación de los datos
  paginateUsers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    // Obtener los usuarios visibles en la página actual
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  // Cambiar página
  changePage(newPage: number): void {
    this.currentPage = newPage; // Actualizar página actual
    this.paginateUsers(); // Actualizar datos de la tabla
  }

  // Detectar cambios en el término de búsqueda
  onSearchTermChange(): void {
    this.applyFilters(); // Actualizar la lista filtrada al cambiar el término
  }

  // Obtener número total de páginas basado en usuarios filtrados
  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  deleteUser(cedula: any) {
    this.modalService.openModal("DeleteUser");
    this.userDelete = cedula;
  }

  editUser(cedula: any) {
    // Lógica para editar usuario
  }

  // Abrir modal de agregar usuario
  openAddUserModal(): void {
    this.showAddUserModal = true;
  }

  // Cerrar modal de agregar usuario
  closeAddUserModal(): void {
    this.showAddUserModal = false;
  }

  closeModal(modal: string) {
    this.modalService.closeModal(modal);
  }

  confirmDeleteUser() {
    this.adminService.deleteUserByCedula(this.userDelete).subscribe({
      next: (data) => {
        this.users = this.users.filter(user => user.cedula !== this.userDelete); // Eliminar usuario de la lista
        this.applyFilters(); // Aplicar filtros para actualizar la tabla
        this.closeModal("DeleteUser");
        this.toast.showToast('success', data.detalles, data.mensaje, 10000); // Show toast message
      },
      error: (err) => {
        this.closeModal("DeleteUser");
        console.error('Error al eliminar el usuario:', err);
        this.toast.showToast('error', err.error.detalles, err.error.mensaje, 10000); // Show toast message
      }
    });
  }

  onUserAdded(user: any) {
    this.users.push(user); // Agregar el nuevo usuario a la lista
    this.applyFilters(); // Aplicar filtros para actualizar la tabla
    this.closeAddUserModal(); // Cerrar el modal
  }
}