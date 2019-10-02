import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare function init_plugins(): any;
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent {

  forma: FormGroup;

  constructor(  public usuarioService: UsuarioService,
                public router: Router ) {
    init_plugins();
    this.forma = new FormGroup({
      // Nombre de la propiedad, el primer parámetro del FormControl es el valor por defecto del campo
      // El segundo parámetro es un arreglo con las validaciones de ese campo, si es requerido, si es de tipo number
      // Si es de tipo string, si tiene valor minimo, valor máximo, etc, todo esto en la importación Validators
      nombre: new FormControl( null, [Validators.required] ),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      password2: new FormControl(null, [Validators.required]),
      condiciones: new FormControl(false),
    }, { validators: this.sonIguales('password', 'password2')});
    this.forma.setValue({
      nombre: 'Test ',
      correo: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

  sonIguales( campo1: string, campo2: string ) {
    return ( group: FormGroup ) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;
      if ( pass1 === pass2 ) {
        return null;
      } else {
        return {
          sonIguales: true
        };
      }
    };
  }

  registrarUsuario() {
    if ( this.forma.invalid ) {
      return;
    }
    if ( this.forma.value.condiciones === false ) {
      Swal.fire({
        title: 'Importante',
        text: 'Debe aceptar los términos y condiciones',
        type: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }
    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );
    this.usuarioService.crearUsuario( usuario )
      .subscribe((resp) => {
        console.log(resp);
        this.router.navigate(['/login']);
      });
  }
}
