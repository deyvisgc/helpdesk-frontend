import { Component, OnInit } from '@angular/core';
import { Requirement } from 'src/app/core/interface/requiriments';
import { RequirementService } from 'src/app/core/service/requerimiento.service';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.scss']
})
export class AyudaComponent implements OnInit {
  constructor(private requerimientoService: RequirementService) {
  }
  listRequerimientos: Requirement[] = []
  ngOnInit(): void {
    this.listar()
  }
  tipoSeleccionado: string = '';
  descripcion: string = '';

  changeRequeriment(event: any) {
    this.descripcion = event?.descripcion
  }
  listar() {
    this.requerimientoService.get()
    .subscribe({
      next: (res: Requirement[]) => {
        this.listRequerimientos = res
      },
      error:(error: any) => {
        console.log("Error: ", error)
      }
    })
  
  }
}
