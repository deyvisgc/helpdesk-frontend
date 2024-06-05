import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-descripconcomponent',
  templateUrl: './descripconcomponent.component.html',
  styleUrls: ['./descripconcomponent.component.scss']
})
export class DescripconcomponentComponent {
  @Input() descripcion: string = '';
}
