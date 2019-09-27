import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public settingsService: SettingsService ) {}

  ngOnInit() {
    this.aplicarCheck();
  }

  cambiarColor( tema: string ) {
    this.settingsService.aplicarTema( tema );
    this.aplicarCheck();
  }

  aplicarCheck() {
    const selectores: any = document.getElementsByClassName('selector');
    for ( const ref of selectores ) {
      if ( ref.getAttribute('data-theme') === this.settingsService.ajustes.tema ) {
        ref.classList.add('working');
      } else {
        ref.classList.remove('working');
      }
    }
  }

}
