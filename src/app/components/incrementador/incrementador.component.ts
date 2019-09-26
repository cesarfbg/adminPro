import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent {

  @ViewChild('txtProgress', null) txtProgress: ElementRef;
  @Input() leyenda = 'Leyenda';
  @Input() progreso = 50;
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  onChange( newValue: number ) {
    if ( newValue > 100 ) {
      this.progreso = 100;
    } else if ( newValue < 0 || newValue === null ) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit( this.progreso );
  }

  cambiarValor( valor: number ) {
    this.progreso += valor;
    if ( this.progreso >= 100 ) {
      this.progreso = 100;
    }
    if ( this.progreso <= 0 ) {
      this.progreso = 0;
    }
    this.cambioValor.emit( this.progreso );
    this.txtProgress.nativeElement.focus();
  }

}
