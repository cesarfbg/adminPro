import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(  public usuarioService: UsuarioService,
                public router: Router ) {}

  canActivate(): boolean {
    if ( this.usuarioService.estaLogeado() ) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
