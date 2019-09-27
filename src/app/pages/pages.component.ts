import { Component } from '@angular/core';
declare function init_plugins(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent {

  constructor() {
    init_plugins();
  }

}
