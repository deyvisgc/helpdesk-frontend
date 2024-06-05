import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'; 
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentModule } from '../component/component.module';
import { RequerimientComponent } from './requerimient/requerimient.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { PropuestaComponent } from './propuesta/propuesta.component';
const routes: Routes = [
  {
    path: 'requerimients',
    component: RequerimientComponent,
  },
  {
    path: 'help',
    component: AyudaComponent,
  },
  {
    path: 'proposal',
    component: PropuestaComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbTooltipModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ComponentModule,
    NgbAlertModule,
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbAccordionModule,

  ],
  declarations: [
    RequerimientComponent,
    AyudaComponent,
    PropuestaComponent,
  ],
  exports: [
    RequerimientComponent,
    AyudaComponent,
    PropuestaComponent,
  ]
})
export class PageModule {}
