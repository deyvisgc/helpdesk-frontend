import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './pipe/search.pipe';
import { NumberOnlyDirective } from './directive/number-only.directive';


@NgModule({
  declarations: [SearchPipe, NumberOnlyDirective],
  imports: [
    CommonModule,
  ],
  exports: [SearchPipe, NumberOnlyDirective]
})
export class CoreModule { }
