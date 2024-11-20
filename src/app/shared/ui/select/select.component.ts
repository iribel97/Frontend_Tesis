import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgForOf, NgIf } from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  imports: [NgIf, NgForOf, ReactiveFormsModule]
})
export class SelectComponent implements OnInit {
  @Input() options: string[] = [];
  @Input() placeholder: string = 'Seleccione una opción';
  @Input() required: boolean = false;
  @Input() defaultValue: string = '';
  @Output() selectionChange = new EventEmitter<string>();
  @Output() errorMessage = new EventEmitter<string>();

  selectControl: FormControl = new FormControl();

  ngOnInit() {
    this.selectControl = new FormControl(this.defaultValue, this.required ? Validators.required : null);
    this.selectControl.statusChanges.subscribe(status => {
      if (this.selectControl.invalid && this.selectControl.touched) {
        this.errorMessage.emit('Este campo es requerido.');
      } else {
        this.errorMessage.emit('');
      }
    });
  }

  onSelectionChange() {
    this.selectionChange.emit(this.selectControl.value);
  }


}
