import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { NgbAccordionModule, NgbAlertModule, NgbCollapseModule, NgbDatepickerModule, NgbDropdownModule, NgbModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoreModule } from '../core/core.module';
import { FilePickerModule } from 'ngx-awesome-uploader';
import { ListRequerimientComponent } from './requeriment/list-requerimient/list-requerimient.component';
import { FormRequerimientComponent } from './requeriment/form-requerimient/form-requerimient.component';
import { FormProposalComponent } from './proposal/form-proposal/form-proposal.component';
import { ListProposalComponent } from './proposal/list-proposal/list-proposal.component';
import { DescripconcomponentComponent } from './ayuda/descripconcomponent/descripconcomponent.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { FormUsersComponent } from './users/form-users/form-users.component';
@NgModule({
  declarations: [
    PaginationComponent,
    ListRequerimientComponent,
    FormRequerimientComponent,
    FormProposalComponent,
    ListProposalComponent,
    DescripconcomponentComponent,
    ListUsersComponent,
    FormUsersComponent
  ],
  imports: [
    CommonModule,
    NgbTooltipModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbAlertModule,
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbAccordionModule,
    CoreModule,
    FilePickerModule
  ],

  exports: [
    PaginationComponent,
    ListRequerimientComponent,
    FormRequerimientComponent,
    FormProposalComponent,
    ListProposalComponent,
    DescripconcomponentComponent,
    ListUsersComponent,
    FormUsersComponent
  ],
})
export class ComponentModule { }
