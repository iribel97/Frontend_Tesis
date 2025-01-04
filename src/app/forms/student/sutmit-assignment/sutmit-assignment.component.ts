import {ChangeDetectorRef, Component, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastComponent} from "../../../shared/ui/toast/toast.component";
import {FileUploaderComponent} from "../../../shared/ui/file-uploader/file-uploader.component";
import {TextareaComponent} from "../../../shared/ui/textarea/textarea.component";
import {ButtonComponent} from "../../../shared/ui/button/button.component";
import {StudentsService} from "../../../services/students/students.service";

@Component({
  selector: 'form-sutmit-assignment',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ToastComponent,
    FileUploaderComponent,
    TextareaComponent,
    ButtonComponent
  ],
  templateUrl: './sutmit-assignment.component.html',
  styleUrl: './sutmit-assignment.component.css'
})
export class SutmitAssignmentComponent implements OnInit {

  formErrors: { [key: string]: string } = {};
  sendform = false;
  form!: FormGroup;
  @Input() idAssignment: number = 0;
  @ViewChild('toast', { static: true }) toast!: ToastComponent;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private ngZone: NgZone,
              private router: Router, private studentsService: StudentsService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      contenido: [''],
      documentIn: [[]],
    });
    this.form.valueChanges.subscribe(() => {
      this.ngZone.run(() => {
        this.cdr.detectChanges();
      });
    });
  }

  onErrorsChange(event: { id: string, errorMessage: string }) {
    if (event.errorMessage) {
      this.formErrors[event.id] = event.errorMessage;
    } else {
      delete this.formErrors[event.id];
    }
    this.cdr.detectChanges(); // Trigger change detection manually
  }

  onSubmit() {
    console.log("documentIn: ", this.form.value.documentIn)
    this.sendform = true;
    if (Object.keys(this.formErrors).length > 0) {
      console.log('Form has errors:', this.formErrors);
    } else {
      console.log('Form value:', this.form.value);
      const request: any = {
        id: this.idAssignment,
        contenido: this.form.value.contenido,
        documentos: this.form.value.documentIn,
      };
      console.log('Request:', request);
      this.studentsService.updateAssignment(request).subscribe(
          data => {
            console.log('Memo created successfully:', data);
            this.toast.showToast('success', data.detalles,data.mensaje,10000); // Show toast message
            this.resetForm();
          },
          error => {
            console.error('Error creating memo:', error);
            this.toast.showToast('error', error.error.message || 'Error al conectar con el servidor','ERROR',10000); // Show toast message
          }
      );
    }
  }

  private resetForm() {
    this.form.reset({
      contenido: '',
      documentIn: []
    });
    this.formErrors = {};
    this.sendform = false;
  }
}
