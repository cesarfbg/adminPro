import { Component } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html'
})
export class PromesasComponent {

  constructor() {

    this.contarTres().then( (resolve) => {
      console.log('Terminó', resolve);
    }).catch( (error) => {
      console.error('Error en la promesa', error);
    });

  }

  contarTres(): Promise<boolean> {
    return new Promise( (resolve) => {
      let contador = 0;
      const intervalo = setInterval( () => {
        contador++;
        console.log(contador);
        if ( contador === 3 ) {
          resolve(true);
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }

}
