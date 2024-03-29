import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ng2-charts
import { ChartsModule } from 'ng2-charts';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// Modules
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficoDonaComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    FormsModule,
    ChartsModule,
    PipesModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component
  ]
})
export class PagesModule {}
