import { Component } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent {

  titulo: string;

  constructor(  private router: Router,
                private title: Title,
                private meta: Meta ) {
      this.getDataRoute()
        .subscribe( (data) => {
          this.titulo = data.titulo;
          this.title.setTitle(this.titulo);
          const metaTag: MetaDefinition = {
            name: 'description',
            content: this.titulo
          };
          this.meta.updateTag(metaTag);
        });
  }

  getDataRoute() {
    return this.router.events
    .pipe(
      filter( ( event ) => {
        if ( event instanceof ActivationEnd ) {
          return true;
        }
      }),
      filter( (event: ActivationEnd) => {
        if ( event.snapshot.firstChild === null ) {
          return true;
        }
      }),
      map( (event) => {
        return event.snapshot.data;
      })
    );
  }

}
