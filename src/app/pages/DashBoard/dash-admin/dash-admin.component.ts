import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/ui/header/header.component';
import { SlidebarComponent } from '../../../shared/ui/slidebar/slidebar.component';
import { FooterComponent } from '../../../shared/ui/footer/footer.component';
import { LoginService } from '../../../services/login/login.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
    selector: 'app-dash-admin',
    imports: [HeaderComponent, SlidebarComponent, FooterComponent, CommonModule, ReactiveFormsModule],
    templateUrl: './dash-admin.component.html',
    styles: ``
})
export class DashAdminComponent implements OnInit, OnDestroy {

  userLoginOn: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.pipe(takeUntil(this.destroy$)).subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
