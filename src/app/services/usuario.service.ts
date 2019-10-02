import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { SubirArchivoService } from './subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  URL = environment.url_servicios;

  constructor(  public http: HttpClient,
                public router: Router,
                public subirArchivoService: SubirArchivoService ) {
    this.cargarStorage();
  }

  cambiarImagen( archivo: File, id: string ) {
    this.subirArchivoService.subirArchivo( archivo, 'usuarios', id)
      .subscribe((resp: any) => {
        this.usuario.img = resp.usuario.img;
        Swal.fire({
          title: 'Imagen Actualizada',
          type: 'success'
        });
        this.guardarStorage( id, this.token, this.usuario );
      });
  }

  actualizarUsuario( usuario: Usuario ) {
    usuario.token = this.token;
    return this.http.put(`${this.URL}/usuario/${usuario._id}`, usuario)
      .pipe(map((resp: any) => {
        // this.usuario = resp.usuario;
        this.guardarStorage( resp.usuario._id, this.token, resp.usuario );
        Swal.fire({
          title: 'Usuario Actualizado',
          type: 'success'
        });
        return true;
      }));
  }

  logout() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  cargarStorage() {
    this.token = localStorage.getItem('token') || '';
    this.usuario = JSON.parse(localStorage.getItem('usuario') || null);
  }

  estaLogeado() {
    if ( this.token.length > 5 ) {
      return true;
    } else {
      return false;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  crearUsuario( usuario: Usuario ) {
    return this.http.post(`${this.URL}/usuario`, usuario)
      .pipe(map((resp: any) => {
        Swal.fire({
          title: 'Usuario Creado',
          text: usuario.email,
          type: 'success'
        });
        return resp.usuario;
      }));
  }

  login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar === true ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(`${this.URL}/login`, usuario)
      .pipe(map((resp: any) => {
        this.guardarStorage( resp.id, resp.token, resp.usuario );
        return true;
      }));
  }

  loginGoogle( token: string ) {
    return this.http.post(`${this.URL}/login/google`, {token})
      .pipe(map((resp: any) => {
        this.guardarStorage( resp.id, resp.token, resp.usuario );
        return true;
      }));
  }

}
