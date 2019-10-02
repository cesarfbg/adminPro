import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  URL = environment.url_servicios;

  constructor( public http: HttpClient ) {}

  subirArchivo( archivo: File, tipo: string, id: string ) {
    const formData: FormData = new FormData();
    formData.append('imagen', archivo, archivo.name);
    return this.http.put(`${this.URL}/upload/${tipo}/${id}`, formData);
  }

}
