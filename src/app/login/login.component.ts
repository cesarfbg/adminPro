import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';
declare function init_plugins(): any;
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correo = '';
  password = '';
  recuerdame = false;
  auth2: any;

  constructor(  public router: Router,
                public usuarioService: UsuarioService,
                private ngZone: NgZone ) {}
  ngOnInit() {
    this.googleInit();
    init_plugins();
    this.correo = localStorage.getItem('email') || '';
    if (this.correo.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '417257117066-2u1mupj1g2lpkm0pjbc207hp43hm8f77.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin( document.getElementById('btnGoogle') );
    });
  }

  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this.usuarioService.loginGoogle(token)
        .subscribe(() => {
          this.ngZone.run(() => {
            this.router.navigate(['/dashboard']);
            this.auth2.disconnect();
          });
        });
    });
  }

  ingresar() {
    const usuario = new Usuario(null, this.correo, this.password);
    this.usuarioService.login( usuario, this.recuerdame )
      .subscribe(() => this.router.navigate(['/dashboard']));
  }

}
