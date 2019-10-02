import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  usuario: Usuario;

  constructor( public usuarioService: UsuarioService ) {
    this.usuario = this.usuarioService.usuario;
  }

}
