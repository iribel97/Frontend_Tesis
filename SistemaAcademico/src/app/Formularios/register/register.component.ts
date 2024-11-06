import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UsuarioRegistro } from '../../services/Registro/registroRequest';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  step: number = 1;
  personalForm!: FormGroup;
  initials: string = '';

  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  // CONSTRUCTOR
  constructor(private fb: FormBuilder, private router: Router) { }

  // INICIALIZACIÓN DE VARIABLES Y FORMULARIOS AL INICIAR EL COMPONENTE
  ngOnInit(): void {
    this.personalForm = this.fb.group({
      cedula: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      fotoPerfil: [],
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required]
    });
  }

  // Método para mostrar la vista previa de la imagen cargada
  previewImage(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.personalForm.patchValue({ fotoPerfil: this.selectedFile });
      };
      reader.readAsDataURL(file);
    } else {
      this.updateInitialsImage();
    }
  }


  // GETTERS DE LOS CONTROLES DEL FORMULARIO
  get cedula() { return this.personalForm.controls['cedula']; }
  get nombres() { return this.personalForm.controls['nombres']; }
  get apellidos() { return this.personalForm.controls['apellidos']; }
  get correo() { return this.personalForm.controls['correo']; }
  get telefono() { return this.personalForm.controls['telefono']; }
  get direccion() { return this.personalForm.controls['direccion']; }
  get fechaNacimiento() { return this.personalForm.controls['fechaNacimiento']; }
  get genero() { return this.personalForm.controls['genero']; }
  get fotoPerfil() { return this.personalForm.controls['fotoPerfil']; }


  // Método para avanzar al siguiente paso del formulario
  nextStep() {
    if (this.step === 1 && this.personalForm.valid) {
      this.step++;
    }
  }

  // Método para ACTUALIZAR la imagen de perfil
  uploadImage(): void {
    const input = document.getElementById('profileImage') as HTMLInputElement;
    input.click();
  }

  // Método para ACTUALIZAR la imagen de las iniciales
  updateInitialsImage(): void {
    const nombres = this.personalForm.get('nombres')?.value || '';
    const apellidos = this.personalForm.get('apellidos')?.value || '';

    const firstInitial = nombres.charAt(0).toUpperCase();
    const lastInitial = apellidos.charAt(0).toUpperCase();

    const initials = `${firstInitial}${lastInitial}`;

    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const context = canvas.getContext('2d');

    if (context) {
      context.fillStyle = '#ddd';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.font = '50px Arial';
      context.fillStyle = '#333';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(initials, canvas.width / 2, canvas.height / 2);

      this.imagePreview = canvas.toDataURL();
      this.personalForm.patchValue({ fotoPerfil: this.imagePreview });
    }
  }

  // Método para actualizar la imagen de las iniciales cuando cambian los nombres o apellidos
  onInputChange(): void {
    this.updateInitialsImage();
  }

  prepareData(): UsuarioRegistro {
    const formValues = this.personalForm.value;

    // Convertir la imagen generada por las iniciales a un archivo
    let foto = this.selectedFile || null;
    if (!foto && this.imagePreview) {
      const byteString = atob((this.imagePreview as string).split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      foto = new File([ab], 'initials.png', { type: 'image/png', lastModified: Date.now() });
    }


    return {
      cedula: formValues.cedula,
      nombre: formValues.nombres,
      apellido: formValues.apellidos,
      correo: formValues.correo,
      password: 'your_password',
      telefono: formValues.telefono,
      direccion: formValues.direccion,
      rol: 'REPRESENTANTE',
      nacimiento: formValues.fechaNacimiento,
      genero: formValues.genero,
      estado: 'Activo',
      foto: foto as File, // Se envía el archivo seleccionado o la imagen generada con iniciales
    };
  }


}
