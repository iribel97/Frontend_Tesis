import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/ui/header/header.component';
import { SlidebarComponent } from '../../shared/ui/slidebar/slidebar.component';
import { FooterComponent } from '../../shared/ui/footer/footer.component';


@Component({
  selector: 'app-dash-admin',
  standalone: true,
  imports: [ HeaderComponent, SlidebarComponent, FooterComponent ],
  templateUrl: './dash-admin.component.html',
  styles: ``
})
export class DashAdminComponent {

}
