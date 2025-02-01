import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-form-add-grading-system',
  imports: [],
  templateUrl: './form-add-grading-system.component.html',
  styleUrl: './form-add-grading-system.component.css'
})
export class FormAddGradingSystemComponent implements OnInit{

  

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    
  }


}
