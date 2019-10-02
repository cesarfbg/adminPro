import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  usuario: Usuario;

  constructor(  public sidebarService: SidebarService,
                public usuarioService: UsuarioService ) {
    this.usuario = this.usuarioService.usuario;
  }

}
