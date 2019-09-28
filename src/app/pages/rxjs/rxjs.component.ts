import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnDestroy {

  subscription: Subscription;

  constructor() {
    this.subscription = this.regresaObservable()
      .subscribe( (numero) => console.log('Subs', numero),
                  (error) => console.error('Error', error),
                  () => console.log('El observador terminó'));
  }

  ngOnDestroy() {
    console.log('La página se va a cerrar');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable<any>( (observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo = setInterval( () => {
        contador++;
        const salida = {
          valor: contador
        };
        observer.next( salida );
        if ( contador === 3 ) {
          // clearInterval(intervalo);
          // observer.complete();
        } else if ( contador === 2 ) {
          // clearInterval(intervalo);
          // observer.error('Auxilio!');
        }
      }, 1000);
    })
    .pipe(
      map( resp => resp.valor ),
      filter( ( valor, index ) => {
        if ( (valor % 2) === 1 ) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

}
