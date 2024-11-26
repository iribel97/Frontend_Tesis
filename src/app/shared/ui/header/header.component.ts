import { Component } from '@angular/core';
import { Usuario } from '../../../services/login/usuario';
import { UsuarioService } from '../../../services/usurio/usuario.service';
import { enviroment } from '../../../../enviroment/enviroment';

@Component({
    selector: 'app-header',
    imports: [],
    templateUrl: './header.component.html',
    styles: ``
})
export class HeaderComponent {

  errorMessage: string = '';

  usuario?: Usuario;

  constructor(private userService:UsuarioService){
    this.userService.getUser(enviroment.userId).subscribe(
      {
        next: (usuario) => this.usuario = usuario,
        error: (error) => this.errorMessage = error,
        complete: () => console.log('Petición completada')  
      }
    )
  }

}
