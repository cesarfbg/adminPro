import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: string = 'usuario' ): string {
    let URL = environment.url_servicios + '/img';
    if ( !img ) {
      return URL + '/usuarios/no-image';
    }
    if ( img.indexOf('https') >= 0 ) {
      return img;
    }
    switch ( tipo ) {
      case 'usuario':
        URL += '/usuarios/' + img;
        break;
      case 'medico':
        URL += '/medicos/' + img;
        break;
      case 'hospital':
        URL += '/hospitales/' + img;
        break;
      default:
        console.log('Tipo de imagen no existe, [usuarios, medicos, hospitales]');
        URL += '/usuarios/no-image';
    }
    return URL;
  }
}
