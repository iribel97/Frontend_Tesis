import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {StudentsService} from "../../../services/students/students.service";

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    imports: [
        NgForOf
    ],
    styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
    data: any;

    constructor(private studentsService: StudentsService) {
    }

    ngOnInit(): void {
        this.getdata();
    }

    getdata() {
        this.studentsService.getAttendance().subscribe(data => {
            console.log(data);
            this.data = data;
        });
    }
}