import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

export const Approutes: Routes = [
  {
    path: 'pages',
    component: FullComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./page/page.module').then(m => m.PageModule)
      }
    ]
  },
  { path: '', redirectTo: 'pages/inicio', pathMatch: 'full' },
];
