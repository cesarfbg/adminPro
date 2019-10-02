import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  fileInput: any;
  imagenTemp: string | ArrayBuffer;

  constructor( public usuarioService: UsuarioService ) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit() {
    this.fileInput = document.getElementById('fileInput');
  }

  subirImagen() {
    this.usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );
  }

  cambiarImagen() {
    this.fileInput.click();
  }

  seleccionImagen( archivo: File ) {
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }
    if ( archivo.type.indexOf('image') < 0 ) {
      Swal.fire({
        title: 'Solo imágenes',
        text: 'El archivo seleccionado no es una imagen',
        type: 'error'
      });
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    };
  }

  guardar( usuario: Usuario ) {
    this.usuario.nombre = usuario.nombre;
    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }
    this.usuarioService.actualizarUsuario( this.usuario )
      .subscribe();
  }

}
